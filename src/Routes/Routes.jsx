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
import Caja from "../Components/Pages/Caja/Caja"; // Importamos el nuevo componente Caja

const AppRoutes = () => {
  const { authenticated } = useAuth();

  return (
    <Routes>
      <Route path="/" element={!authenticated ? <Navigate to="/login" /> : <Navigate to="/home" />} />
      <Route path="/login" element={<Login />} />
      <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/login" />} />
      <Route path="/lector-estatico" element={authenticated ? <IniciarPrograma /> : <Navigate to="/login" />} />
      <Route path="/lector-dinamico" element={authenticated ? <Caja /> : <Navigate to="/login" />} />
      <Route path="/productos" element={authenticated ? <Productos /> : <Navigate to="/login" />} />
      <Route path="/profile" element={authenticated ? <Profile /> : <Navigate to="/login" />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/ayuda" element={authenticated ? <Ayuda /> : <Navigate to="/login" />} />
      <Route path="/programa" element={authenticated ? <Programa /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AppRoutes;
