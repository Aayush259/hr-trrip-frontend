import type { ReactNode } from "react";
import { FiCheckCircle, FiExternalLink } from "react-icons/fi";
import type { TravelBooking } from "../../app/features/currentTravelBookingSlice";

type TravelBookingResultProps = {
    booking: TravelBooking;
    onUploadAnother: () => void;
};

const formatLabel = (label: string) => {
    return label
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .replace(/[_-]+/g, " ")
        .replace(/^./, (character) => character.toUpperCase());
};

const renderDataValue = (value: unknown, keyPath: string): ReactNode => {
    if (value === null || value === undefined || value === "") {
        return <span className="text-slate-400">Not provided</span>;
    }

    if (Array.isArray(value)) {
        if (!value.length) {
            return <span className="text-slate-400">No items</span>;
        }

        return (
            <div className="space-y-2">
                {value.map((item, index) => (
                    <div
                        className="rounded-md border border-slate-200 bg-slate-50 px-3 py-3"
                        key={`${keyPath}-${index}`}
                    >
                        {renderDataValue(item, `${keyPath}-${index}`)}
                    </div>
                ))}
            </div>
        );
    }

    if (typeof value === "object") {
        const entries = Object.entries(value as Record<string, unknown>);

        if (!entries.length) {
            return <span className="text-slate-400">No details</span>;
        }

        return (
            <dl className="space-y-3">
                {entries.map(([entryLabel, entryValue]) => (
                    <div className="rounded-md border border-slate-200 bg-white px-3 py-3" key={entryLabel}>
                        <dt className="text-xs font-semibold uppercase tracking-[0] text-slate-500">
                            {formatLabel(entryLabel)}
                        </dt>
                        <dd className="mt-2 text-sm leading-6 text-slate-800">
                            {renderDataValue(entryValue, `${keyPath}-${entryLabel}`)}
                        </dd>
                    </div>
                ))}
            </dl>
        );
    }

    return <span className="break-words">{String(value)}</span>;
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
                <button
                    className="h-9 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                    onClick={onUploadAnother}
                    type="button"
                >
                    Upload more
                </button>
            </header>

            <div className="mt-5 rounded-lg bg-slate-50 p-3 sm:p-4">
                {renderDataValue(booking.extractedData, "booking")}
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
