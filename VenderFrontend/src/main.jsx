import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { VendorProvider } from "./context/VendorContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <VendorProvider>
      <App />
    </VendorProvider>
  </StrictMode>
);
