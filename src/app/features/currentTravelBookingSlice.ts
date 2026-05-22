import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type TravelBookingExtractionStatus = "pending" | "processing" | "completed" | "failed";
export type CurrentTravelBookingStatus =
    | "empty"
    | "ready"
    | "uploading"
    | TravelBookingExtractionStatus;

export type CurrentTravelDocumentFile = {
    fileBuffer: ArrayBuffer;
    mimeType: string;
    filename: string;
    size: number;
};

export type TravelBooking = {
    _id: string;
    userId: string;
    documentUrl: string;
    extractionStatus: TravelBookingExtractionStatus;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    extractedData?: any;
    createdAt: string;
    updatedAt: string;
};

export type TravelDocumentStatusPayload = {
    status: "uploading" | "processing";
    message: string;
};

export type TravelDocumentCompletedPayload = {
    status: "success";
    message: string;
    data: {
        booking: TravelBooking;
    };
};

type CurrentTravelBookingState = {
    file: CurrentTravelDocumentFile | null;
    status: CurrentTravelBookingStatus;
    message: string | null;
    booking: TravelBooking | null;
    error: string | null;
};

const initialState: CurrentTravelBookingState = {
    file: null,
    status: "empty",
    message: null,
    booking: null,
    error: null,
};

const currentTravelBookingSlice = createSlice({
    name: "currentTravelBooking",
    initialState,
    reducers: {
        setCurrentTravelFile: (state, action: PayloadAction<CurrentTravelDocumentFile>) => {
            state.file = action.payload;
            state.status = "ready";
            state.message = null;
            state.booking = null;
            state.error = null;
        },
        markTravelDocumentSent: (state) => {
            state.status = "uploading";
            state.message = "Sending travel document...";
            state.error = null;
        },
        setTravelDocumentStatus: (state, action: PayloadAction<TravelDocumentStatusPayload>) => {
            state.status = action.payload.status;
            state.message = action.payload.message;
            state.error = null;
        },
        setTravelDocumentCompleted: (
            state,
            action: PayloadAction<TravelDocumentCompletedPayload>
        ) => {
            state.status = "completed";
            state.message = action.payload.message;
            state.booking = action.payload.data.booking;
            state.error = null;
        },
        setTravelDocumentError: (state, action: PayloadAction<string>) => {
            state.status = "failed";
            state.message = null;
            state.error = action.payload;
        },
        resetCurrentTravelBooking: () => {
            return initialState;
        },
    },
});

export const {
    markTravelDocumentSent,
    resetCurrentTravelBooking,
    setCurrentTravelFile,
    setTravelDocumentCompleted,
    setTravelDocumentError,
    setTravelDocumentStatus,
} = currentTravelBookingSlice.actions;
export default currentTravelBookingSlice.reducer;
