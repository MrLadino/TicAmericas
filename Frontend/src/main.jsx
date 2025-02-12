import React from "react"; 
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext"; // Aquí ya lo envuelves
import "./index.css";
import App from "./App"; 

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider> {/* Solo lo envuelves aquí */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
