import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  const login = async (email, password) => {
    try {
      const response = await fetch("http://localhost:5000/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || "Error al iniciar sesión");

      // Guardar token y usuario
      localStorage.setItem("token", data.token);
      setUser(data.user);
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
    <AuthContext.Provider value={{ authenticated, login, logout, user }}>
      {children}
    </AuthContext.Provider>
  );
};
