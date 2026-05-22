/**
 * @module routes
 * @description Defines the application's routing structure using react-router.
 */

import { createBrowserRouter } from "react-router";
import ProtectedLayout from "../layout/ProtectedLayout";
import PublicOnlyLayout from "../layout/PublicOnlyLayout";
import RootLayout from "../layout/RootLayout";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import SharedItineraryPage from "../pages/SharedItineraryPage";
import SignupPage from "../pages/SignupPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />,
        children: [
            {
                path: "share/:bookingId",
                element: <SharedItineraryPage />,
            },
            {
                element: <ProtectedLayout />,
                children: [
                    {
                        index: true,
                        element: <HomePage />,
                    },
                ],
            },
            {
                element: <PublicOnlyLayout />,
                children: [
                    {
                        path: "login",
                        element: <LoginPage />,
                    },
                    {
                        path: "signup",
                        element: <SignupPage />,
                    },
                ],
            },
        ],
    },
]);
