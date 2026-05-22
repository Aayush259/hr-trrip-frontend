/**
 * @module store
 * @description Configures the global Redux store for the application.
 * Combines reducers for projects and settings to manage centralized state.
 */

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./features/authSlice";

/**
 * Central Redux store instance.
 * @constant store
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
    },
});

/**
 * Infers the `RootState` type from the store itself.
 * @type {RootState}
 */
export type RootState = ReturnType<typeof store.getState>;

/**
 * Infers the `AppDispatch` type from the store itself.
 * @type {AppDispatch}
 */
export type AppDispatch = typeof store.dispatch;
