import { useState } from "react";
import { createPortal } from "react-dom";
import { FiCheck, FiCopy, FiExternalLink, FiShare2, FiX } from "react-icons/fi";

type TravelBookingShareProps = {
    bookingId: string;
};

const TravelBookingShare = ({ bookingId }: TravelBookingShareProps) => {
    const [isOpen, setIsOpen] = useState(false);
    const [copyMessage, setCopyMessage] = useState<string | null>(null);
    const shareUrl = `${window.location.origin}/share/${bookingId}`;

    const openShareDialog = () => {
        setCopyMessage(null);
        setIsOpen(true);
    };

    const copyShareUrl = async () => {
        try {
            await navigator.clipboard.writeText(shareUrl);
            setCopyMessage("Link copied");
        } catch {
            setCopyMessage("Unable to copy");
        }
    };

    const shareDialog = (
        <div
            aria-labelledby="share-itinerary-title"
            aria-modal="true"
            className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/30 px-5"
            role="dialog"
        >
            <button
                aria-label="Close share dialog"
                className="absolute inset-0 cursor-default"
                onClick={() => setIsOpen(false)}
                type="button"
            />
            <section className="relative w-full max-w-md rounded-lg border border-slate-200 bg-white p-5 shadow-[0_24px_70px_-24px_rgba(15,23,42,0.4)] sm:p-6">
                <div className="flex items-start justify-between gap-4">
                    <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-sky-50 text-sky-700">
                            <FiShare2 aria-hidden="true" />
                        </span>
                        <div>
                            <h2
                                className="text-base font-semibold tracking-[0] text-slate-950"
                                id="share-itinerary-title"
                            >
                                Share itinerary
                            </h2>
                            <p className="mt-1 text-sm leading-6 text-slate-500">
                                Anyone with this link can open the itinerary.
                            </p>
                        </div>
                    </div>
                    <button
                        aria-label="Close share dialog"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-slate-200 text-slate-500 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                        onClick={() => setIsOpen(false)}
                        type="button"
                    >
                        <FiX aria-hidden="true" />
                    </button>
                </div>

                <div className="mt-5 rounded-md border border-slate-200 bg-slate-50 px-3 py-3">
                    <a
                        className="block break-all text-sm font-medium text-slate-800 underline decoration-sky-300 underline-offset-2"
                        href={shareUrl}
                        rel="noreferrer"
                        target="_blank"
                    >
                        {shareUrl}
                    </a>
                </div>

                <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                    <p className="flex min-h-5 items-center gap-1.5 text-sm font-medium text-sky-700">
                        {copyMessage === "Link copied" ? <FiCheck aria-hidden="true" /> : null}
                        <span>{copyMessage}</span>
                    </p>
                    <div className="flex gap-2">
                        <a
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                            href={shareUrl}
                            rel="noreferrer"
                            target="_blank"
                        >
                            <FiExternalLink aria-hidden="true" />
                            <span>Open</span>
                        </a>
                        <button
                            className="inline-flex h-10 items-center justify-center gap-2 rounded-md bg-slate-950 px-3 text-sm font-semibold text-white transition hover:bg-slate-800 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                            onClick={copyShareUrl}
                            type="button"
                        >
                            <FiCopy aria-hidden="true" />
                            <span>Copy</span>
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );

    return (
        <div className="w-full sm:w-auto">
            <button
                className="inline-flex h-9 w-full items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100 sm:w-auto"
                onClick={openShareDialog}
                type="button"
            >
                <FiShare2 aria-hidden="true" />
                <span>Share</span>
            </button>

            {isOpen ? createPortal(shareDialog, document.body) : null}
        </div>
    );
};

export default TravelBookingShare;
