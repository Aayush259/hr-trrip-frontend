import { useSearchParams } from "react-router";
import { resetCurrentTravelBooking } from "../app/features/currentTravelBookingSlice";
import useBookingDetailsFromRoute from "../app/hooks/useBookingDetailsFromRoute";
import { useAppDispatch, useAppSelector } from "../app/hooks/helperHooks";
import TravelBookingErrorState from "../components/booking/TravelBookingErrorState";
import TravelBookingLoading from "../components/booking/TravelBookingLoading";
import TravelBookingResult from "../components/booking/TravelBookingResult";
import AppSidebar from "../components/navigation/AppSidebar";
import HomeFileUpload from "../components/upload/HomeFileUpload";

const HomePage = () => {
    const dispatch = useAppDispatch();
    const [, setSearchParams] = useSearchParams();
    const user = useAppSelector((state) => state.auth.user);
    const { booking, error, message, status } = useAppSelector(
        (state) => state.currentTravelBooking
    );
    const isWaitingForBooking = ["loading", "uploading", "pending", "processing"].includes(
        status
    );

    useBookingDetailsFromRoute();

    const handleUploadAnother = () => {
        dispatch(resetCurrentTravelBooking());
        setSearchParams({});
    };

    return (
        <>
            {user ? <AppSidebar user={user} /> : null}
            <main className="flex min-h-screen items-center justify-center px-6 py-20 text-slate-950">
                {status === "completed" && booking ? (
                    <TravelBookingResult
                        booking={booking}
                        onUploadAnother={handleUploadAnother}
                    />
                ) : null}
                {status === "failed" ? (
                    <TravelBookingErrorState
                        message={error || "The document could not be processed."}
                        onUploadAnother={handleUploadAnother}
                    />
                ) : null}
                {isWaitingForBooking ? <TravelBookingLoading message={message} /> : null}
                {status === "empty" || status === "ready" ? <HomeFileUpload /> : null}
            </main>
        </>
    );
};

export default HomePage;
