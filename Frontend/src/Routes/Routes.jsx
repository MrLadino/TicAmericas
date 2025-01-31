import { Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import IniciarPrograma from "../Components/Pages/IniciarPrograma/IniciarPrograma";
import Productos from "../Components/Pages/Productos/Productos";
import Profile from "../Components/Pages/Profile/Profile";
import SignUp from "../Components/Pages/SignUp/SignUp";
import Ayuda from "../Components/Pages/Ayuda/Ayuda";
import Programa from "../Components/Pages/Programa/Programa";
import Caja from "../Components/Pages/Caja/Caja";

const AppRoutes = () => {
  const { authenticated } = useAuth(); // Verificamos el estado de autenticación del usuario

  return (
    <Routes>
      {/* Redirección inicial según el estado de autenticación */}
      <Route
        path="/"
        element={!authenticated ? <Navigate to="/login" /> : <Navigate to="/home" />}
      />

      {/* Ruta pública para login */}
      <Route path="/login" element={<Login />} />

      {/* Ruta pública para el registro de nuevos usuarios */}
      <Route path="/signup" element={<SignUp />} />

      {/* Rutas protegidas que requieren autenticación */}
      <Route
        path="/home"
        element={authenticated ? <Home /> : <Navigate to="/login" />}
      />
      <Route
        path="/lector-estatico"
        element={authenticated ? <IniciarPrograma /> : <Navigate to="/login" />}
      />
      <Route
        path="/lector-dinamico"
        element={authenticated ? <Caja /> : <Navigate to="/login" />}
      />
      <Route
        path="/productos"
        element={authenticated ? <Productos /> : <Navigate to="/login" />}
      />
      <Route
        path="/profile"
        element={authenticated ? <Profile /> : <Navigate to="/login" />}
      />
      <Route
        path="/ayuda"
        element={authenticated ? <Ayuda /> : <Navigate to="/login" />}
      />
      <Route
        path="/programa"
        element={authenticated ? <Programa /> : <Navigate to="/login" />}
      />

      {/* Ruta comodín para manejar páginas inexistentes */}
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;