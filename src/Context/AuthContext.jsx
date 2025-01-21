import { createContext, useContext, useState } from 'react';
import validateEmail from '../Services/emailValidation'; // Importa la función de validación de correo

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);

  const login = async (email, password) => {
    try {
      // Validar correo electrónico usando la API
      const { valid, message } = await validateEmail(email);
      if (!valid) {
        throw new Error(`Correo inválido: ${message}`);
      }

      // Autenticación básica (esto es un ejemplo, reemplaza con tu lógica real)
      if (email === 'andresladino0324@gmail.com' && password === 'contraseña') {
        setAuthenticated(true);
        return true;
      } else {
        throw new Error('Credenciales incorrectas');
      }
    } catch (error) {
      console.error('Error en la validación o autenticación:', error.message);
      throw new Error(error.message || 'Hubo un problema al iniciar sesión');
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
