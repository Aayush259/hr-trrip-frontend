import { useEffect } from "react";
import api from "../api";
import {
    setBookingHistory,
    setBookingHistoryError,
    setBookingHistoryLoading,
    type BookingHistoryItem,
} from "../features/bookingHistorySlice";
import { getApiErrorMessage } from "../helpers";
import { useAppDispatch } from "./helperHooks";

type BookingHistoryResponse = {
    data?: {
        bookings?: BookingHistoryItem[];
    };
};

const useBookingHistory = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        let isMounted = true;

        dispatch(setBookingHistoryLoading());

        api.get<BookingHistoryResponse>("/api/bookings")
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                dispatch(setBookingHistory(response.data.data?.bookings || []));
            })
            .catch((error) => {
                if (!isMounted) {
                    return;
                }

                dispatch(
                    setBookingHistoryError(
                        getApiErrorMessage(error, "Unable to load previous itineraries.")
                    )
                );
            });

        return () => {
            isMounted = false;
        };
    }, [dispatch]);
};

export default useBookingHistory;
