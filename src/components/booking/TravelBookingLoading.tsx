type TravelBookingLoadingProps = {
    message: string | null;
};

const TravelBookingLoading = ({ message }: TravelBookingLoadingProps) => {
    return (
        <section className="w-full max-w-[26rem] rounded-lg border border-slate-200 bg-white px-6 py-8 text-center shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)]">
            <span className="mx-auto block h-10 w-10 animate-spin rounded-full border-2 border-slate-200 border-t-sky-500" />
            <h1 className="mt-5 text-base font-semibold tracking-[0] text-slate-950">
                Reading travel document
            </h1>
            <p className="mt-2 text-sm leading-6 text-slate-500">
                {message || "Waiting for itinerary details..."}
            </p>
        </section>
    );
};

export default TravelBookingLoading;
