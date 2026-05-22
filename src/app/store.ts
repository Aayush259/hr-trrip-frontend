/**
 * @module store
 * @description Configures the Redux store and persists authentication state.
 */

import { configureStore } from "@reduxjs/toolkit";
import {
    FLUSH,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
    REHYDRATE,
    persistReducer,
    persistStore,
} from "redux-persist";
import storage from "redux-persist/es/storage";
import authReducer from "./features/authSlice";
import currentTravelBookingReducer from "./features/currentTravelBookingSlice";

const persistedAuthReducer = persistReducer(
    {
        key: "auth",
        storage,
    },
    authReducer
);

export const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        currentTravelBooking: currentTravelBookingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
                ignoredActionPaths: ["payload.fileBuffer"],
                ignoredPaths: ["currentTravelBooking.file.fileBuffer"],
            },
        }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
