import { Routes, Route, Navigate, BrowserRouter as Router } from "react-router-dom";
import { useAuth } from "./Context/AuthContext";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import Home from "./Components/Pages/Home/Inicio";
import Login from "./Components/Pages/Login/Login";
import IniciarPrograma from "./Components/Pages/IniciarPrograma/IniciarPrograma";
import Productos from "./Components/Pages/Productos/Productos";
import Profile from "./Components/Pages/Profile/Profile";
import SignUp from "./Components/Pages/SignUp/SignUp";
import Ayuda from "./Components/Pages/Ayuda/Ayuda";
import Programa from "./Components/Pages/Programa/Programa";
import Caja from "./Components/Pages/Caja/Caja";

const PrivateRoute = ({ authenticated, children }) => {
  return authenticated ? children : <Navigate to="/TicAmericas/login" />;
};

const shouldShowHeaderFooter = (pathname) => {
  return !["/login", "/signup", "/programa"].includes(pathname);
};

const App = () => {
  const { authenticated } = useAuth();
  const basePath = import.meta.env.MODE === "development" ? "" : "/TicAmericas"; // Base URL dinámica

  return (
    <Router basename={basePath}>
      <div className="flex flex-col min-h-screen">
        {/* Header condicional */}
        {shouldShowHeaderFooter(window.location.pathname) && <Header />}

        <main className="flex-grow">
          <Routes>
            {/* Redirección inicial según autenticación */}
            <Route
              path="/"
              element={
                !authenticated ? (
                  <Navigate to="/login" replace />
                ) : (
                  <Navigate to="/home" replace />
                )
              }
            />

            {/* Rutas públicas */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />

            {/* Rutas protegidas */}
            <Route
              path="/home"
              element={<PrivateRoute authenticated={authenticated}><Home /></PrivateRoute>}
            />
            <Route
              path="/lector-estatico"
              element={<PrivateRoute authenticated={authenticated}><IniciarPrograma /></PrivateRoute>}
            />
            <Route
              path="/lector-dinamico"
              element={<PrivateRoute authenticated={authenticated}><Caja /></PrivateRoute>}
            />
            <Route
              path="/productos"
              element={<PrivateRoute authenticated={authenticated}><Productos /></PrivateRoute>}
            />
            <Route
              path="/profile"
              element={<PrivateRoute authenticated={authenticated}><Profile /></PrivateRoute>}
            />
            <Route
              path="/ayuda"
              element={<PrivateRoute authenticated={authenticated}><Ayuda /></PrivateRoute>}
            />
            <Route
              path="/programa"
              element={<PrivateRoute authenticated={authenticated}><Programa /></PrivateRoute>}
            />

            {/* Ruta comodín */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </main>

        {/* Footer condicional */}
        {shouldShowHeaderFooter(window.location.pathname) && <Footer />}
      </div>
    </Router>
  );
};

export default App;
