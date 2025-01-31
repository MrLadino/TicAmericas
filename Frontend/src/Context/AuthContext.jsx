import { createContext, useContext, useState } from "react";
import validateEmail from "../Services/emailValidation";

const AuthContext = createContext();

// Hook personalizado para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const { valid, message } = await validateEmail(email);
      if (!valid) {
        throw new Error(`Correo inválido: ${message}`);
      }

      // Validar las credenciales (en este caso, las credenciales fijas)
      if (email === "andresladino0324@gmail.com" && password === "an02133012") {
        setAuthenticated(true);
        return true;
      } else {
        throw new Error("Credenciales incorrectas");
      }
    } catch (error) {
      throw new Error(error.message || "Error al iniciar sesión");
    }
  };

  const logout = () => {
    setAuthenticated(false);
  };

  return (
    // Proveedor del contexto con el estado de autenticación y las funciones login y logout
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children} {/* Asegúrate de que children esté bien cerrado */}
    </AuthContext.Provider>
  );
};
