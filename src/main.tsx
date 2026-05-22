/**
 * @module EntryPoint
 * @description The main entry point of the React application.
 * Initializes the root React tree, injects the Redux store provider, 
 * and sets up the application router.
 */

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import { router } from "./app/routes";
import { Provider } from "react-redux";
import { store } from "./app/store";

// Mount the React application to the DOM element with ID 'root'
createRoot(document.getElementById("root")!).render(
    <StrictMode>
        {/* Global State Provider (Redux Toolkit) */}
        <Provider store={store}>
            {/* Client-side Router Provider */}
            <RouterProvider router={router} />
        </Provider>
    </StrictMode>,
);
