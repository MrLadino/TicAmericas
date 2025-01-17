import { createContext, useContext, useState } from 'react';

// Crear el contexto para la autenticación
const AuthContext = createContext();

// Hook personalizado para acceder al contexto de autenticación
export const useAuth = () => useContext(AuthContext);

// Proveedor de autenticación
export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false); // Empezamos como no autenticado

  // Función para iniciar sesión (simulada, reemplazar con lógica real)
  const login = async (email, password) => {
    // Validación de las credenciales (puedes reemplazar esta lógica con una API real)
    if (email === 'usuario@dominio.com' && password === 'contraseña') {
      setAuthenticated(true); // Cambiamos el estado a autenticado
      return true; // Devuelve true si las credenciales son correctas
    } else {
      throw new Error('Credenciales incorrectas'); // Error si las credenciales no coinciden
    }
  };

  // Función para cerrar sesión
  const logout = () => {
    setAuthenticated(false); // Cambiamos el estado a no autenticado
  };

  return (
    <AuthContext.Provider value={{ authenticated, login, logout }}>
      {children} {/* Los componentes hijos pueden acceder al contexto */}
    </AuthContext.Provider>
  );
};
