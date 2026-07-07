import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Toaster } from "sonner";

import App from "./App";

import "./index.css";

console.log("main.tsx is running!");

createRoot(
  document.getElementById("root")!,
).render(
  <StrictMode>
    <App />

    <Toaster
      position="top-right"
      richColors
      closeButton
      duration={3000}
    />
  </StrictMode>,
);