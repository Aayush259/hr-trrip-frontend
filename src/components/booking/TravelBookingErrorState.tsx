import { FiAlertCircle } from "react-icons/fi";

type TravelBookingErrorStateProps = {
    onRetry?: () => void;
    onUploadAnother: () => void;
};

const TravelBookingErrorState = ({
    onRetry,
    onUploadAnother,
}: TravelBookingErrorStateProps) => {
    return (
        <section className="w-full max-w-[26rem] rounded-lg border border-rose-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]">
            <span className="mx-auto flex h-11 w-11 items-center justify-center rounded-md bg-rose-50 text-xl text-rose-600">
                <FiAlertCircle aria-hidden="true" />
            </span>
            <h1 className="mt-5 text-base font-semibold tracking-[0] text-slate-950">
                AI servers are busy
            </h1>
            <p className="mt-2 text-sm leading-6 text-rose-700">
                Itinerary generation is under temporary high demand. Try again in a moment.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-2 sm:flex-row">
                {onRetry ? (
                    <button
                        className="h-10 rounded-md bg-slate-950 px-4 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                        onClick={onRetry}
                        type="button"
                    >
                        Retry
                    </button>
                ) : null}
                <button
                    className="h-10 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                    onClick={onUploadAnother}
                    type="button"
                >
                    Upload another
                </button>
            </div>
        </section>
    );
};

export default TravelBookingErrorState;
