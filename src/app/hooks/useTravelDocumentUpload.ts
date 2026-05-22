import { useCallback } from "react";
import {
    markTravelDocumentSent,
    setCurrentTravelFile,
    setTravelDocumentError,
} from "../features/currentTravelBookingSlice";
import socket from "../socket";
import { useAppDispatch } from "./helperHooks";

const MAX_FILE_SIZE = 2 * 1024 * 1024;

const validateTravelDocument = (file: File) => {
    if (!file.type.startsWith("image/") && file.type !== "application/pdf") {
        return "Choose an image or PDF file.";
    }

    if (file.size > MAX_FILE_SIZE) {
        return "File size must be 2MB or less.";
    }

    return null;
};

const useTravelDocumentUpload = () => {
    const dispatch = useAppDispatch();

    const uploadTravelDocument = useCallback(
        async (file: File) => {
            const validationError = validateTravelDocument(file);

            if (validationError) {
                return validationError;
            }

            try {
                const fileBuffer = await file.arrayBuffer();
                const currentFile = {
                    fileBuffer,
                    mimeType: file.type,
                    filename: file.name,
                    size: file.size,
                };

                dispatch(setCurrentTravelFile(currentFile));
                dispatch(markTravelDocumentSent());
                socket.emit("upload_travel_document", {
                    fileBuffer,
                    mimeType: file.type,
                    filename: file.name,
                });

                return null;
            } catch {
                dispatch(setTravelDocumentError("The file could not be prepared for upload."));
                return null;
            }
        },
        [dispatch]
    );

    return uploadTravelDocument;
};

export default useTravelDocumentUpload;
