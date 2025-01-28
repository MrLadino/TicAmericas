import { createContext, useContext, useState } from "react";
import validateEmail from "../Services/emailValidation";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      const { valid, message } = await validateEmail(email);
      if (!valid) {
        throw new Error(`Correo inválido: ${message}`);
      }

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
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
