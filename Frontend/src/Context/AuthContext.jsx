// Frontend/src/Context/AuthContext.jsx

import React, { createContext, useContext, useState, useEffect } from "react";
import jwt_decode from "jwt-decode";

const AuthContext = createContext(null);

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoadingAuth(true);

    // Retardo artificial para mostrar loader (puedes ajustarlo o quitarlo)
    const timer = setTimeout(() => {
      if (token) {
        try {
          const decoded = jwt_decode(token);
          // Verificar expiración del token
          if (decoded.exp * 1000 < Date.now()) {
            localStorage.removeItem("token");
            setAuthenticated(false);
            setUser(null);
          } else {
            setUser({
              user_id: decoded.user_id,
              email: decoded.email,
              role: decoded.role,
            });
            setAuthenticated(true);
          }
        } catch (error) {
          console.error("Error decodificando el token:", error);
          localStorage.removeItem("token");
          setAuthenticated(false);
          setUser(null);
        }
      }
      setLoadingAuth(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  const login = async (email, password, rememberMe) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, rememberMe }),
      });
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.message || "Error al iniciar sesión");
      }
      localStorage.setItem("token", data.token);
      const decoded = jwt_decode(data.token);
      setUser({
        user_id: decoded.user_id,
        email: decoded.email,
        role: decoded.role,
      });
      setAuthenticated(true);
      return true;
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      throw new Error(error.message);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ authenticated, user, login, logout, loadingAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
