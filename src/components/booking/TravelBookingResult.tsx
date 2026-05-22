import { FiCheckCircle, FiExternalLink } from "react-icons/fi";
import type { TravelBooking } from "../../app/features/currentTravelBookingSlice";
import TravelBookingDetails from "./TravelBookingDetails";
import TravelBookingShare from "./TravelBookingShare";

type TravelBookingResultProps = {
    booking: TravelBooking;
    onUploadAnother: () => void;
};

const TravelBookingResult = ({ booking, onUploadAnother }: TravelBookingResultProps) => {
    return (
        <section className="booking-result-enter w-full max-w-3xl rounded-lg border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] sm:p-6">
            <header className="flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-start sm:justify-between">
                <div className="flex items-start gap-3">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-emerald-50 text-xl text-emerald-600">
                        <FiCheckCircle aria-hidden="true" />
                    </span>
                    <div>
                        <h1 className="text-lg font-semibold tracking-[0] text-slate-950">
                            Travel details extracted
                        </h1>
                        <p className="mt-1 text-sm leading-6 text-slate-500">
                            Review the itinerary details found in your document.
                        </p>
                    </div>
                </div>
                <div className="flex flex-col items-stretch gap-2 sm:items-end">
                    <div className="flex flex-col gap-2 sm:flex-row">
                        <TravelBookingShare bookingId={booking._id} />
                        <button
                            className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                            onClick={onUploadAnother}
                            type="button"
                        >
                            Upload more
                        </button>
                    </div>
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
    );
};

export default TravelBookingResult;
