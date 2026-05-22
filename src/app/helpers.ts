/**
 * @module helpers
 * @description Provides utility functions.
 */

import axios from "axios";

type ApiErrorData = {
    message?: unknown;
};

export const isEmailAddress = (value: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
};

export const getApiErrorMessage = (error: unknown, fallbackMessage: string) => {
    if (axios.isAxiosError<ApiErrorData>(error)) {
        const apiMessage = error.response?.data?.message;

        if (typeof apiMessage === "string" && apiMessage.trim()) {
            return apiMessage;
        }

        if (!error.response) {
            return "Unable to reach the server. Please try again.";
        }
    }

    return fallbackMessage;
};
