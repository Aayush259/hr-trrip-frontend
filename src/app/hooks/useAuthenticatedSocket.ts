import { useEffect } from "react";
import type { AuthUser } from "../features/authSlice";
import socket from "../socket";

type UseAuthenticatedSocketOptions = {
    accessToken: string | null;
    isLoggedIn: boolean;
    user: AuthUser | null;
};

const useAuthenticatedSocket = ({
    accessToken,
    isLoggedIn,
    user,
}: UseAuthenticatedSocketOptions) => {
    useEffect(() => {
        if (!accessToken || !isLoggedIn || !user) {
            socket.disconnect();
            return;
        }

        socket.auth = { token: accessToken };

        if (socket.connected) {
            socket.disconnect();
        }

        socket.connect();

        return () => {
            socket.disconnect();
        };
    }, [accessToken, isLoggedIn, user]);
};

export default useAuthenticatedSocket;
