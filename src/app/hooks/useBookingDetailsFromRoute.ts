import { useEffect } from "react";
import { useSearchParams } from "react-router";
import api from "../api";
import {
    setCurrentBookingDetailError,
    setCurrentBookingFromHistory,
    setCurrentBookingLoading,
    type TravelBooking,
} from "../features/currentTravelBookingSlice";
import { getApiErrorMessage } from "../helpers";
import { useAppDispatch } from "./helperHooks";

type BookingDetailsResponse = {
    data?: {
        booking?: TravelBooking;
    };
};

const useBookingDetailsFromRoute = () => {
    const dispatch = useAppDispatch();
    const [searchParams] = useSearchParams();
    const bookingId = searchParams.get("bookingId");

    useEffect(() => {
        if (!bookingId) {
            return;
        }

        let isMounted = true;

        dispatch(setCurrentBookingLoading());

        api.get<BookingDetailsResponse>(`/api/bookings/${bookingId}`)
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                const booking = response.data.data?.booking;

                if (booking) {
                    dispatch(setCurrentBookingFromHistory(booking));
                } else {
                    dispatch(setCurrentBookingDetailError("Booking details were not found."));
                }
            })
            .catch((error) => {
                if (!isMounted) {
                    return;
                }

                dispatch(
                    setCurrentBookingDetailError(
                        getApiErrorMessage(error, "Unable to load booking details.")
                    )
                );
            });

        return () => {
            isMounted = false;
        };
    }, [bookingId, dispatch]);

    return bookingId;
};

export default useBookingDetailsFromRoute;
