import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";
import { PlanProvider } from "./context/PlanContext";

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <PlanProvider>
            <App />
        </PlanProvider>
    </StrictMode>
);