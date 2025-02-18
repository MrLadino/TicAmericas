// Frontend/src/Routes/Routes.jsx
import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from "../Context/AuthContext";

// Importa tus páginas
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";
import SignUp from "../Components/Pages/SignUp/SignUp";
import IniciarPrograma from "../Components/Pages/IniciarPrograma/IniciarPrograma";
import Caja from "../Components/Pages/Caja/Caja";
import Productos from "../Components/Pages/Productos/Productos";
import Profile from "../Components/Pages/Profile/Profile";
import Ayuda from "../Components/Pages/Ayuda/Ayuda";
import Programa from "../Components/Pages/Programa/Programa";

const AppRoutes = () => {
  const { authenticated, loadingAuth } = useAuth();

  if (loadingAuth) {
    return (
      <div className="flex h-screen justify-center items-center">
        <p className="text-xl">Cargando...</p>
      </div>
    );
  }

  return (
    <Routes>
      <Route path="/" element={authenticated ? <Navigate to="/home" /> : <Navigate to="/login" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/lector-estatico" element={authenticated ? <IniciarPrograma /> : <Navigate to="/login" />} />
      <Route path="/lector-dinamico" element={authenticated ? <Caja /> : <Navigate to="/login" />} />
      <Route path="/productos" element={authenticated ? <Productos /> : <Navigate to="/login" />} />
      <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/ayuda" element={authenticated ? <Ayuda /> : <Navigate to="/login" />} />
      <Route path="/programa" element={authenticated ? <Programa /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
