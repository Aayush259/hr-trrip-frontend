import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router";
import api from "../app/api";
import { clearAuth, setAuthUser, type AuthUser } from "../app/features/authSlice";
import { useAppDispatch, useAppSelector } from "../app/hooks/helperHooks";

type MeResponse = {
    data?: {
        user?: AuthUser;
    };
};

const RootLayout = () => {
    const dispatch = useAppDispatch();
    const { accessToken, isLoggedIn, user } = useAppSelector((state) => state.auth);
    const shouldCheckSession = Boolean(accessToken && isLoggedIn && user);
    const hasCheckedSession = useRef(false);
    const [isSessionReady, setIsSessionReady] = useState(!shouldCheckSession);

    useEffect(() => {
        if (!shouldCheckSession || hasCheckedSession.current) {
            return;
        }

        hasCheckedSession.current = true;

        api.get<MeResponse>("/api/users/me")
            .then((response) => {
                const refreshedUser = response.data.data?.user;

                if (refreshedUser) {
                    dispatch(setAuthUser(refreshedUser));
                } else {
                    dispatch(clearAuth());
                }
            })
            .catch(() => {
                dispatch(clearAuth());
            })
            .finally(() => {
                setIsSessionReady(true);
            });
    }, [dispatch, shouldCheckSession]);

    if (!isSessionReady) {
        return null;
    }

    return <Outlet />;
};

export default RootLayout;
