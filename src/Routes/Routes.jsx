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
import { BrowserRouter as Router } from "react-router-dom"; // Importa Router

const AppRoutes = () => {
  const { authenticated } = useAuth(); // Verificamos el estado de autenticación del usuario
  const basePath = import.meta.env.MODE === "development" ? "" : "/TicAmericas"; // Base URL dinámica

  return (
    <Router basename={basePath}> {/* Añadido basename para manejar correctamente las rutas */}
      <Routes>
        {/* Redirección inicial según el estado de autenticación */}
        <Route
          path={`${basePath}/`}
          element={
            !authenticated ? (
              <Navigate to={`${basePath}/login`} replace />
            ) : (
              <Navigate to={`${basePath}/home`} replace />
            )
          }
        />

        {/* Rutas públicas */}
        <Route path={`${basePath}/login`} element={<Login />} />
        <Route path={`${basePath}/signup`} element={<SignUp />} />

        {/* Rutas protegidas */}
        <Route
          path={`${basePath}/home`}
          element={authenticated ? <Home /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/lector-estatico`}
          element={authenticated ? <IniciarPrograma /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/lector-dinamico`}
          element={authenticated ? <Caja /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/productos`}
          element={authenticated ? <Productos /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/profile`}
          element={authenticated ? <Profile /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/ayuda`}
          element={authenticated ? <Ayuda /> : <Navigate to={`${basePath}/login`} replace />}
        />
        <Route
          path={`${basePath}/programa`}
          element={authenticated ? <Programa /> : <Navigate to={`${basePath}/login`} replace />}
        />

        {/* Ruta comodín para manejar páginas inexistentes */}
        <Route path="*" element={<Navigate to={`${basePath}/login`} replace />} />
      </Routes>
    </Router>
  );
};

export default AppRoutes;
