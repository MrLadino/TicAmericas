import { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(true);

  const login = async (email, password) => {
    // Simulación de autenticación (reemplazar por la lógica real)
    if (email === 'usuario@dominio.com' && password === 'contraseña') {
      setAuthenticated(true);
      return true;
    } else {
      throw new Error('Credenciales incorrectas');
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