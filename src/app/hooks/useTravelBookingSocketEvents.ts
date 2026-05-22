import { useEffect } from "react";
import {
    setTravelDocumentCompleted,
    setTravelDocumentError,
    setTravelDocumentStatus,
    type TravelDocumentCompletedPayload,
    type TravelDocumentStatusPayload,
} from "../features/currentTravelBookingSlice";
import { useAppDispatch } from "./helperHooks";
import socket from "../socket";

type TravelDocumentErrorPayload = {
    message: string;
};

const useTravelBookingSocketEvents = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        const handleStatus = (payload: TravelDocumentStatusPayload) => {
            dispatch(setTravelDocumentStatus(payload));
        };

        const handleCompleted = (payload: TravelDocumentCompletedPayload) => {
            dispatch(setTravelDocumentCompleted(payload));
        };

        const handleError = (payload: TravelDocumentErrorPayload) => {
            dispatch(setTravelDocumentError(payload.message));
        };

        socket.on("travel_document_status", handleStatus);
        socket.on("travel_document_completed", handleCompleted);
        socket.on("travel_document_error", handleError);

        return () => {
            socket.off("travel_document_status", handleStatus);
            socket.off("travel_document_completed", handleCompleted);
            socket.off("travel_document_error", handleError);
        };
    }, [dispatch]);
};

export default useTravelBookingSocketEvents;
