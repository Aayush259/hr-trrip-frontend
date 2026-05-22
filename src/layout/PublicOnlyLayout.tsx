import { Navigate, Outlet } from "react-router";
import { useAppSelector } from "../app/hooks/helperHooks";

const PublicOnlyLayout = () => {
    const { accessToken, isLoggedIn, user } = useAppSelector((state) => state.auth);

    if (accessToken && isLoggedIn && user) {
        return <Navigate replace to="/" />;
    }

    return <Outlet />;
};

export default PublicOnlyLayout;
