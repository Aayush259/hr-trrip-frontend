import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TravelBookingExtractionStatus } from "./currentTravelBookingSlice";

export type BookingHistoryItem = {
    _id: string;
    userId: string;
    documentUrl: string;
    extractionStatus: TravelBookingExtractionStatus;
    createdAt: string;
    updatedAt: string;
};

type BookingHistoryState = {
    bookings: BookingHistoryItem[];
    isLoading: boolean;
    error: string | null;
};

const initialState: BookingHistoryState = {
    bookings: [],
    isLoading: false,
    error: null,
};

const bookingHistorySlice = createSlice({
    name: "bookingHistory",
    initialState,
    reducers: {
        setBookingHistoryLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setBookingHistory: (state, action: PayloadAction<BookingHistoryItem[]>) => {
            state.bookings = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setBookingHistoryError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
        upsertBookingHistoryItem: (state, action: PayloadAction<BookingHistoryItem>) => {
            const existingBookingIndex = state.bookings.findIndex(
                (booking) => booking._id === action.payload._id
            );

            if (existingBookingIndex >= 0) {
                state.bookings[existingBookingIndex] = action.payload;
                return;
            }

            state.bookings.unshift(action.payload);
        },
    },
});

export const {
    setBookingHistory,
    setBookingHistoryError,
    setBookingHistoryLoading,
    upsertBookingHistoryItem,
} = bookingHistorySlice.actions;
export default bookingHistorySlice.reducer;
