import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./Context/AuthContext";
import "./index.css"; // Estilos globales
import App from "./App.jsx"; // Componente principal de la aplicación

// Renderizar la aplicación
createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* Proveedor de contexto para autenticación */}
    <AuthProvider>
      {/* Enrutador principal */}
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
