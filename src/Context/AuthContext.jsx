import { createContext, useContext, useState } from 'react';

// Crear el contexto para la autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(true); // Comienza como autenticado para saltar la validación

  // Función para iniciar sesión (sin validación)
  const login = async (email, password) => {
    setAuthenticated(true); // Marcar siempre como autenticado
    return true; // Siempre devuelve true para saltarse la validación
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthenticated(false); // Cambiar a no autenticado
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children} {/* Los componentes hijos pueden acceder al contexto */}
    </AuthContext.Provider>
  );
};
