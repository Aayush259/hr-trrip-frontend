import { useEffect, useState } from "react";
import { FiAlertCircle, FiExternalLink, FiShare2 } from "react-icons/fi";
import { useParams } from "react-router";
import api from "../app/api";
import type { TravelBooking } from "../app/features/currentTravelBookingSlice";
import { getApiErrorMessage } from "../app/helpers";
import TravelBookingDetails from "../components/booking/TravelBookingDetails";

type BookingDetailsResponse = {
    data?: {
        booking?: TravelBooking;
    };
};

const SharedItineraryPage = () => {
    const { bookingId } = useParams();
    const [booking, setBooking] = useState<TravelBooking | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!bookingId) {
            return;
        }

        let isMounted = true;

        api.get<BookingDetailsResponse>(`/api/bookings/${bookingId}`)
            .then((response) => {
                if (!isMounted) {
                    return;
                }

                const sharedBooking = response.data.data?.booking;

                if (sharedBooking) {
                    setBooking(sharedBooking);
                } else {
                    setError("This shared itinerary could not be found.");
                }
            })
            .catch((fetchError) => {
                if (!isMounted) {
                    return;
                }

                setError(getApiErrorMessage(fetchError, "Unable to load this shared itinerary."));
            })
            .finally(() => {
                if (isMounted) {
                    setIsLoading(false);
                }
            });

        return () => {
            isMounted = false;
        };
    }, [bookingId]);

    return (
        <main className="flex min-h-screen items-center justify-center px-6 py-16 text-slate-950">
            {!bookingId ? (
                <section className="w-full max-w-[26rem] rounded-lg border border-rose-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-rose-50 text-xl text-rose-600">
                        <FiAlertCircle aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-base font-semibold tracking-[0] text-slate-950">
                        Itinerary unavailable
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-rose-700">
                        This itinerary link is missing its booking id.
                    </p>
                </section>
            ) : null}

            {bookingId && isLoading ? (
                <section className="w-full max-w-[26rem] rounded-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]">
                    <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
                    <h1 className="mt-5 text-base font-semibold tracking-[0] text-slate-950">
                        Loading itinerary
                    </h1>
                </section>
            ) : null}

            {bookingId && !isLoading && error ? (
                <section className="w-full max-w-[26rem] rounded-lg border border-rose-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]">
                    <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-rose-50 text-xl text-rose-600">
                        <FiAlertCircle aria-hidden="true" />
                    </span>
                    <h1 className="mt-5 text-base font-semibold tracking-[0] text-slate-950">
                        Itinerary unavailable
                    </h1>
                    <p className="mt-2 text-sm leading-6 text-rose-700">{error}</p>
                </section>
            ) : null}

            {bookingId && !isLoading && booking ? (
                <section className="booking-result-enter w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] sm:p-6">
                    <header className="flex items-start gap-3 border-b border-slate-100 pb-5">
                        <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-sky-50 text-xl text-sky-700">
                            <FiShare2 aria-hidden="true" />
                        </span>
                        <div>
                            <h1 className="text-lg font-semibold tracking-[0] text-slate-950">
                                Shared itinerary
                            </h1>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Travel details shared from a processed document.
                            </p>
                        </div>
                    </header>

                    <div className="mt-5">
                        <TravelBookingDetails data={booking.extractedData} />
                    </div>

                    <a
                        className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-sky-700 transition hover:text-sky-800"
                        href={booking.documentUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        <span>View source document</span>
                        <FiExternalLink aria-hidden="true" />
                    </a>
                </section>
            ) : null}
        </main>
    );
};

export default SharedItineraryPage;
