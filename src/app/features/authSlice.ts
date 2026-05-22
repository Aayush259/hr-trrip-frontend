/**
 * @module authSlice
 * @description Redux slice for managing authentication-related state, including fetching authentication data,
 * handling authentication updates.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

/**
 * State interface for the projects slice.
 * @interface AuthState
 * @property {boolean} isLoading - Loading state for authentication.
 * @property {string | null} error - Error message during authentication operations.
 */
interface AuthState {
    isLoading: boolean;
    error: string | null;
}

const initialState: AuthState = {
    isLoading: false,
    error: null,
};

/**
 * Redux slice configuration for authentication.
 * @constant authSlice
 */
const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        /** Updates the loading state for authentication. */
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        /** Sets the error message for authentication operations. */
        setError: (state, action: PayloadAction<string | null>) => {
            state.error = action.payload;
        },
    },
});

export const { setIsLoading, setError } = authSlice.actions;
export default authSlice.reducer;
