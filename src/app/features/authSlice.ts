/**
 * @module authSlice
 * @description Stores the authenticated user and access token for API requests.
 */

import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type AuthUser = {
    _id: string;
    name: string;
    email: string;
};

type AuthState = {
    accessToken: string | null;
    user: AuthUser | null;
    isLoggedIn: boolean;
};

type AuthCredentials = {
    accessToken: string;
    user: AuthUser;
};

const initialState: AuthState = {
    accessToken: null,
    user: null,
    isLoggedIn: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAuthCredentials: (state, action: PayloadAction<AuthCredentials>) => {
            state.accessToken = action.payload.accessToken;
            state.user = action.payload.user;
            state.isLoggedIn = true;
        },
        setAuthUser: (state, action: PayloadAction<AuthUser>) => {
            state.user = action.payload;
            state.isLoggedIn = Boolean(state.accessToken);
        },
        updateAccessToken: (state, action: PayloadAction<string>) => {
            state.accessToken = action.payload;
            state.isLoggedIn = true;
        },
        clearAuth: () => {
            return initialState;
        },
    },
});

export const { clearAuth, setAuthCredentials, setAuthUser, updateAccessToken } = authSlice.actions;
export default authSlice.reducer;
