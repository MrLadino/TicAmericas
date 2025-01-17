// import { createContext, useContext, useState } from "react";

// const AuthContext = createContext();

// // Hook personalizado para usar el contexto
// export const useAuth = () => useContext(AuthContext);

// export const AuthProvider = ({ children }) => {
//   const [authenticated, setAuthenticated] = useState(() => {
//     // Recuperar estado de autenticación del localStorage al cargar la app
//     const authState = localStorage.getItem("authenticated");
//     return authState === "true";
//   });

//   // Simulación de autenticación (reemplazar con lógica real como solicitudes HTTP)
//   const login = async (email, password) => {
//     try {
//       if (email === "usuario@dominio.com" && password === "contraseña") {
//         setAuthenticated(true);
//         localStorage.setItem("authenticated", "true"); // Guardar estado en localStorage
//         return true;
//       } else {
//         throw new Error("Credenciales incorrectas");
//       }
//     } catch (error) {
//       console.error("Error al iniciar sesión:", error.message);
//       throw error;
//     }
//   };

//   // Cerrar sesión
//   const logout = () => {
//     setAuthenticated(false);
//     localStorage.removeItem("authenticated"); // Eliminar estado del localStorage
//   };

//   return (
//     <AuthContext.Provider value={{ authenticated, login, logout }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };


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