import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks/helperHooks";

const ProtectedLayout = () => {
    const { accessToken, isLoggedIn, user } = useAppSelector((state) => state.auth);

    if (!accessToken || !isLoggedIn || !user) {
        return <Navigate replace to="/login" />;
    }

    return <Outlet />;
};

export default ProtectedLayout;
