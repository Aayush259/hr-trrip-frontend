/**
 * @module api
 * @description Configures and exports a global Axios instance for API communication.
 * Includes interceptors for request customization and global response error handling.
 */

import axios from "axios";

/**
 * Axios instance configured with base URL and essential credentials.
 * @constant api
 */
const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true, // Essential for better-auth to send/receive session cookies
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

/**
 * Request Interceptor
 * @description Intercepts outgoing requests to modify configuration if needed
 * (e.g., adding dynamic headers or logging).
 */
api.interceptors.request.use(
    (config) => {
        // Modify config before request is sent if needed
        // e.g., attach dynamic headers
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

/**
 * Response Interceptor
 * @description Intercepts incoming responses for global error handling and data extraction.
 * Handles common HTTP status codes like 401 (Unauthorized), 403 (Forbidden), and 500+ (Server Errors).
 */
api.interceptors.response.use(
    (response) => {
        // Any status code that lie within the range of 2xx cause this function to trigger
        return response;
    },
    (error) => {
        // Any status codes that falls outside the range of 2xx cause this function to trigger
        if (error.response) {
            // Server responded with a status other than 200 range
            const status = error.response.status;
            const data = error.response.data;

            // Handle specific status codes
            if (status === 401) {
                console.warn("Unauthorized access. Session may have expired.");
                // Optionally redirect to login or trigger a global log-out event
                window.location.reload();
            } else if (status === 403) {
                console.warn("Forbidden. You do not have permission to perform this action.");
            } else if (status >= 500) {
                console.error("Server error occurred:", data?.message || error.message);
            } else {
                console.error(`API Error [${status}]:`, data?.message || error.message);
            }
        } else if (error.request) {
            // Request was made but no response was received (e.g., network error or CORS)
            console.error("Network error or no response received from server:", error.message);
        } else {
            // Something else happened while setting up the request
            console.error("Error in request setup:", error.message);
        }

        return Promise.reject(error);
    }
);

export default api;
