// src/Routes/Routes.jsx
import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "../Components/Pages/Home/Home";
import Login from "../Components/Pages/Login/Login";


import Nosotros from "../Components/Pages/Nosotros/Nosotros";
import Productos from "../Components/Pages/Productos/Productos";
import Profile from "../Components/Pages/Profile/Profile";
import SignUp from "../Components/Pages/SignUp/SignUp";
import Ayuda from "../Components/Pages/Ayuda/Ayuda"; // Importa el componente Ayuda

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/nosotros" element={<Nosotros />} />
      <Route path="/productos" element={<Productos />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ayuda" element={<Ayuda />} /> {/* Agrega la ruta de Ayuda */}
    </Routes>
  );
};

export default AppRoutes;
