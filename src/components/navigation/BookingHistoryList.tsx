import { FiClock, FiFileText } from "react-icons/fi";
import type { BookingHistoryItem } from "../../app/features/bookingHistorySlice";

const statusStyles: Record<BookingHistoryItem["extractionStatus"], string> = {
    pending: "bg-amber-50 text-amber-700",
    processing: "bg-sky-50 text-sky-700",
    completed: "bg-emerald-50 text-emerald-700",
    failed: "bg-rose-50 text-rose-700",
};

type BookingHistoryListProps = {
    activeBookingId: string | null;
    bookings: BookingHistoryItem[];
    error: string | null;
    isLoading: boolean;
    onSelect: (bookingId: string) => void;
};

const formatDate = (value: string) => {
    return new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium",
        timeStyle: "short",
    }).format(new Date(value));
};

const BookingHistoryList = ({
    activeBookingId,
    bookings,
    error,
    isLoading,
    onSelect,
}: BookingHistoryListProps) => {
    return (
        <section className="mt-5 flex min-h-0 flex-1 flex-col">
            <div className="flex items-center justify-between px-1">
                <h2 className="text-xs font-semibold uppercase tracking-[0] text-slate-500">
                    Previous itineraries
                </h2>
                {isLoading ? (
                    <span className="h-3.5 w-3.5 animate-spin rounded-full border border-slate-200 border-t-slate-500" />
                ) : null}
            </div>

            <div className="mt-3 min-h-0 flex-1 space-y-2 overflow-y-auto pr-1">
                {error ? (
                    <p className="rounded-md border border-rose-100 bg-rose-50 px-3 py-2 text-sm text-rose-700">
                        {error}
                    </p>
                ) : null}

                {!error && !isLoading && !bookings.length ? (
                    <p className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3 text-sm text-slate-500">
                        No itineraries yet.
                    </p>
                ) : null}

                {bookings.map((booking) => (
                    <button
                        className={`w-full rounded-md border px-3 py-3 text-left transition focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 ${activeBookingId === booking._id
                                ? "border-sky-300 bg-sky-50"
                                : "border-slate-200 bg-white hover:bg-slate-50"
                            }`}
                        key={booking._id}
                        onClick={() => onSelect(booking._id)}
                        type="button"
                    >
                        <span className="flex items-start gap-2">
                            <FiFileText aria-hidden="true" className="mt-0.5 shrink-0 text-slate-500" />
                            <span className="min-w-0 flex-1">
                                <span className="block text-sm font-semibold text-slate-800">
                                    Itinerary
                                </span>
                                <span className="mt-1 flex items-center gap-1.5 text-xs text-slate-500">
                                    <FiClock aria-hidden="true" className="shrink-0" />
                                    <span className="truncate">{formatDate(booking.createdAt)}</span>
                                </span>
                            </span>
                        </span>
                        <span
                            className={`mt-3 inline-flex rounded-md px-2 py-1 text-xs font-semibold capitalize ${statusStyles[booking.extractionStatus]}`}
                        >
                            {booking.extractionStatus}
                        </span>
                    </button>
                ))}
            </div>
        </section>
    );
};

export default BookingHistoryList;
