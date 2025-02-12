import { Routes, Route, Navigate, useLocation } from "react-router-dom";
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

const App = () => {
  const { authenticated } = useAuth();
  const location = useLocation();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Renderiza el Header si no estás en login/signup */}
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/programa" && <Header />}

      <main className="flex-grow">
        <Routes>
          {/* Rutas protegidas y no protegidas */}
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
      </main>

      {/* Renderiza el Footer si no estás en login/signup */}
      {location.pathname !== "/login" &&
        location.pathname !== "/signup" &&
        location.pathname !== "/programa" && <Footer />}
    </div>
  );
};

export default App;
