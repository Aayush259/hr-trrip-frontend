/**
 * @module routes
 * @description Defines the application's routing structure using react-router.
 */

import { createBrowserRouter } from "react-router";
import RootLayout from "../layout/RootLayout";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <RootLayout />
    },
]);
