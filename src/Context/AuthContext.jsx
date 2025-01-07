import React, { createContext, useContext, useState } from "react";

/**
 * Contexto de autenticación para gestionar el estado de autenticación en toda la aplicación.
 */
const AuthContext = createContext();

/**
 * Proveedor del contexto de autenticación.
 * @param {React.ReactNode} children - Componentes que estarán envueltos por el proveedor.
 */
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = () => setAuthenticated(true);
  const logout = () => setAuthenticated(false);

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

/**
 * Hook personalizado para acceder al contexto de autenticación.
 * @returns {Object} - Estado y funciones del contexto de autenticación.
 */
export const useAuth = () => useContext(AuthContext);
