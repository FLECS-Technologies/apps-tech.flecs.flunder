import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Demo from "./Demo.tsx";
import App from "./App.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
