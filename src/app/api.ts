/**
 * @module api
 * @description Configures and exports a global Axios instance for API communication.
 * Includes interceptors for access-token handling and global response errors.
 */

import axios from "axios";
import type { AxiosError, InternalAxiosRequestConfig } from "axios";
import { clearAuth, setAuthCredentials, updateAccessToken, type AuthUser } from "./features/authSlice";
import { store } from "./store";

const REFRESH_TOKEN_PATH = "/api/users/refresh-token";

type RetryableRequestConfig = InternalAxiosRequestConfig & {
    _retry?: boolean;
};

type AuthResponsePayload = {
    data?: {
        accessToken?: unknown;
        user?: unknown;
    };
};

const createApiClient = () => {
    return axios.create({
        baseURL: import.meta.env.VITE_API_URL,
        withCredentials: true,
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json",
        },
    });
};

const api = createApiClient();
const refreshApi = createApiClient();

const isAuthUser = (value: unknown): value is AuthUser => {
    if (!value || typeof value !== "object") {
        return false;
    }

    const user = value as Record<string, unknown>;

    return (
        typeof user._id === "string" &&
        typeof user.name === "string" &&
        typeof user.email === "string"
    );
};

const getAuthResponseData = (payload: unknown) => {
    return (payload as AuthResponsePayload).data;
};

const syncAuthResponse = (payload: unknown) => {
    const authData = getAuthResponseData(payload);
    const accessToken = authData?.accessToken;

    if (typeof accessToken !== "string") {
        return null;
    }

    if (isAuthUser(authData?.user)) {
        store.dispatch(
            setAuthCredentials({
                accessToken,
                user: authData.user,
            })
        );
    } else {
        store.dispatch(updateAccessToken(accessToken));
    }

    return accessToken;
};

const isRefreshTokenRequest = (config?: InternalAxiosRequestConfig) => {
    return Boolean(config?.url?.includes(REFRESH_TOKEN_PATH));
};

const getAccessToken = () => {
    return store.getState().auth.accessToken;
};

let refreshAccessTokenRequest: Promise<string> | null = null;

const refreshAccessToken = () => {
    if (!refreshAccessTokenRequest) {
        refreshAccessTokenRequest = refreshApi
            .post<AuthResponsePayload>(REFRESH_TOKEN_PATH)
            .then((response) => {
                const nextAccessToken = syncAuthResponse(response.data);

                if (!nextAccessToken) {
                    throw new Error("Refresh response did not include an access token.");
                }

                return nextAccessToken;
            })
            .finally(() => {
                refreshAccessTokenRequest = null;
            });
    }

    return refreshAccessTokenRequest;
};

api.interceptors.request.use(
    (config) => {
        const accessToken = getAccessToken();

        if (accessToken) {
            config.headers.Authorization = `Bearer ${accessToken}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

api.interceptors.response.use(
    (response) => {
        syncAuthResponse(response.data);
        return response;
    },
    async (error: AxiosError) => {
        const status = error.response?.status;
        const originalRequest = error.config as RetryableRequestConfig | undefined;

        if (
            status === 401 &&
            originalRequest &&
            !originalRequest._retry &&
            !isRefreshTokenRequest(originalRequest)
        ) {
            originalRequest._retry = true;

            try {
                await refreshAccessToken();
                return api(originalRequest);
            } catch (refreshError) {
                store.dispatch(clearAuth());
                return Promise.reject(refreshError);
            }
        }

        if (error.response) {
            const data = error.response.data as { message?: string } | undefined;

            if (status === 401) {
                console.warn("Unauthorized access. Session may have expired.");
            } else if (status === 403) {
                console.warn("Forbidden. You do not have permission to perform this action.");
            } else if (status && status >= 500) {
                console.error("Server error occurred:", data?.message || error.message);
            } else {
                console.error(`API Error [${status}]:`, data?.message || error.message);
            }
        } else if (error.request) {
            console.error("Network error or no response received from server:", error.message);
        } else {
            console.error("Error in request setup:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
