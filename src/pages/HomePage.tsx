import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import api from "../app/api";
import {
    markTravelBookingRetrying,
    resetCurrentTravelBooking,
    setTravelDocumentError,
} from "../app/features/currentTravelBookingSlice";
import { getApiErrorMessage } from "../app/helpers";
import useBookingDetailsFromRoute from "../app/hooks/useBookingDetailsFromRoute";
import { useAppDispatch, useAppSelector } from "../app/hooks/helperHooks";
import useTravelDocumentUpload from "../app/hooks/useTravelDocumentUpload";
import TravelBookingErrorState from "../components/booking/TravelBookingErrorState";
import TravelBookingLoading from "../components/booking/TravelBookingLoading";
import TravelBookingResult from "../components/booking/TravelBookingResult";
import AppSidebar from "../components/navigation/AppSidebar";
import HomeFileUpload from "../components/upload/HomeFileUpload";
import PageFileDropOverlay from "../components/upload/PageFileDropOverlay";

const hasDraggedFiles = (event: DragEvent) => {
    return Array.from(event.dataTransfer?.types || []).includes("Files");
};

const HomePage = () => {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const user = useAppSelector((state) => state.auth.user);
    const { booking, message, status } = useAppSelector(
        (state) => state.currentTravelBooking
    );
    const dragDepth = useRef(0);
    const [dropError, setDropError] = useState<string | null>(null);
    const [isFileDragActive, setIsFileDragActive] = useState(false);
    const uploadTravelDocument = useTravelDocumentUpload();
    const canDropTravelDocument = status === "empty" || status === "ready";
    const isWaitingForBooking = ["loading", "uploading", "pending", "processing"].includes(
        status
    );

    useBookingDetailsFromRoute();

    useEffect(() => {
        if (!canDropTravelDocument) {
            return;
        }

        const handleDragEnter = (event: DragEvent) => {
            if (!hasDraggedFiles(event)) {
                return;
            }

            event.preventDefault();
            dragDepth.current += 1;
            setIsFileDragActive(true);
        };

        const handleDragOver = (event: DragEvent) => {
            if (!hasDraggedFiles(event)) {
                return;
            }

            event.preventDefault();

            if (event.dataTransfer) {
                event.dataTransfer.dropEffect = "copy";
            }
        };

        const handleDragLeave = (event: DragEvent) => {
            if (!hasDraggedFiles(event)) {
                return;
            }

            event.preventDefault();
            dragDepth.current = Math.max(0, dragDepth.current - 1);

            if (!dragDepth.current) {
                setIsFileDragActive(false);
            }
        };

        const handleDrop = (event: DragEvent) => {
            if (!hasDraggedFiles(event)) {
                return;
            }

            event.preventDefault();
            dragDepth.current = 0;
            setIsFileDragActive(false);

            const file = event.dataTransfer?.files[0];

            if (!file) {
                setDropError(null);
                return;
            }

            void uploadTravelDocument(file).then(setDropError);
        };

        window.addEventListener("dragenter", handleDragEnter);
        window.addEventListener("dragover", handleDragOver);
        window.addEventListener("dragleave", handleDragLeave);
        window.addEventListener("drop", handleDrop);

        return () => {
            dragDepth.current = 0;
            window.removeEventListener("dragenter", handleDragEnter);
            window.removeEventListener("dragover", handleDragOver);
            window.removeEventListener("dragleave", handleDragLeave);
            window.removeEventListener("drop", handleDrop);
        };
    }, [canDropTravelDocument, uploadTravelDocument]);

    const handleUploadAnother = () => {
        dispatch(resetCurrentTravelBooking());
        setSearchParams({});
        setDropError(null);
    };

    const handleRetry = async () => {
        if (!booking?._id) {
            return;
        }

        dispatch(markTravelBookingRetrying());

        try {
            await api.post(`/api/bookings/retry/${booking._id}`);
        } catch (retryError) {
            dispatch(
                setTravelDocumentError(
                    getApiErrorMessage(retryError, "Unable to retry itinerary generation.")
                )
            );
        }
    };

    return (
        <>
            {user ? <AppSidebar user={user} /> : null}
            <main className="flex min-h-screen items-center justify-center px-6 py-20 text-slate-950">
                {status === "completed" && booking ? (
                    <TravelBookingResult
                        booking={booking}
                        onUploadAnother={handleUploadAnother}
                    />
                ) : null}
                {status === "failed" ? (
                    <TravelBookingErrorState
                        onRetry={booking?._id ? handleRetry : undefined}
                        onUploadAnother={handleUploadAnother}
                    />
                ) : null}
                {isWaitingForBooking ? <TravelBookingLoading message={message} /> : null}
                {canDropTravelDocument ? (
                    <div className="flex w-full flex-col items-center">
                        <HomeFileUpload />
                        {dropError ? (
                            <p className="mt-3 text-center text-sm font-medium text-rose-600" role="alert">
                                {dropError}
                            </p>
                        ) : null}
                    </div>
                ) : null}
            </main>
            {isFileDragActive ? <PageFileDropOverlay /> : null}
        </>
    );
};

export default HomePage;
