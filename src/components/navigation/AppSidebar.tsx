import { useState } from "react";
import { FiLogOut, FiMail, FiMenu, FiUser, FiX } from "react-icons/fi";
import { useSearchParams } from "react-router";
import type { AuthUser } from "../../app/features/authSlice";
import { useAppSelector } from "../../app/hooks/helperHooks";
import useBookingHistory from "../../app/hooks/useBookingHistory";
import BookingHistoryList from "./BookingHistoryList";

type AppSidebarProps = {
    user: AuthUser;
};

const AppSidebar = ({ user }: AppSidebarProps) => {
    const [isOpen, setIsOpen] = useState(true);
    const [searchParams, setSearchParams] = useSearchParams();
    const { bookings, error, isLoading } = useAppSelector((state) => state.bookingHistory);
    const activeBookingId = searchParams.get("bookingId");

    useBookingHistory();

    const handleBookingSelect = (bookingId: string) => {
        setSearchParams({ bookingId });
    };

    return (
        <>
            <button
                aria-controls="app-sidebar"
                aria-expanded={isOpen}
                aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
                className="fixed left-5 top-5 z-40 flex h-11 w-11 items-center justify-center rounded-md border border-slate-200 bg-white text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                onClick={() => setIsOpen((currentState) => !currentState)}
                type="button"
            >
                {isOpen ? <FiX aria-hidden="true" /> : <FiMenu aria-hidden="true" />}
            </button>

            <aside
                className={`fixed inset-y-0 left-0 z-30 flex w-[min(18rem,calc(100vw-1.25rem))] flex-col border-r border-slate-200 bg-white px-5 pb-5 pt-24 text-slate-950 shadow-[0_24px_70px_-42px_rgba(15,23,42,0.45)] transition-transform duration-200 ease-out ${isOpen ? "translate-x-0" : "-translate-x-full"
                    }`}
                id="app-sidebar"
            >
                <section className="rounded-lg border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-start gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-white text-slate-700 shadow-sm">
                            <FiUser aria-hidden="true" />
                        </span>
                        <div className="min-w-0">
                            <p className="truncate text-sm font-semibold text-slate-950">{user.name}</p>
                            <p className="mt-1 flex min-w-0 items-center gap-2 text-sm text-slate-500">
                                <FiMail aria-hidden="true" className="shrink-0" />
                                <span className="truncate">{user.email}</span>
                            </p>
                        </div>
                    </div>
                </section>

                <BookingHistoryList
                    activeBookingId={activeBookingId}
                    bookings={bookings}
                    error={error}
                    isLoading={isLoading}
                    onSelect={handleBookingSelect}
                />

                <button
                    className="mt-5 flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-md border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-sky-100"
                    type="button"
                >
                    <FiLogOut aria-hidden="true" className="text-base" />
                    <span>Logout</span>
                </button>
            </aside>
        </>
    );
};

export default AppSidebar;
