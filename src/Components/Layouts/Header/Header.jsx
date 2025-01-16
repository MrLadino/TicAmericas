import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import logo from "../../../assets/Logo.png";
import exitImg from "../../../assets/Exit.png";
import { useLocation } from 'react-router-dom';

const Header = () => {
  const { logout, authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    if (authenticated) {
      logout();
      navigate("/login");
    } else {
      console.error("El usuario no está autenticado.");
    }
  };

  // Condición para no mostrar el Header en la ruta '/programa'
  if (location.pathname === '/programa') return null;

  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
        
        {/* Título */}
        <h1 className="text-3xl font-bold text-[#f0f0f0] flex-grow text-center">
          TIC Americas
        </h1>
        
        {/* Navegación */}
        <nav className="space-x-4 flex-grow flex justify-center">
          {location.pathname !== '/' && location.pathname !== '/login' && location.pathname !== '/signup' && (
            <Link to="/" className="text-xl font-bold text-[#f0f0f0] hover:underline">Inicio</Link>
          )}
          {location.pathname !== '/lector-estatico' && location.pathname !== '/login' && location.pathname !== '/signup' && (
            <Link to="/lector-estatico" className="text-xl font-bold text-[#f0f0f0] hover:underline">Lector Estático</Link>
          )}
          {authenticated && location.pathname !== '/lector-dinamico' && (
            <Link to="/lector-dinamico" className="text-xl font-bold text-[#f0f0f0] hover:underline">Lector Dinámico</Link>
          )}
          {authenticated && location.pathname !== '/productos' && (
            <Link to="/productos" className="text-xl font-bold text-[#f0f0f0] hover:underline">Productos</Link>
          )}
          {authenticated && location.pathname !== '/profile' && (
            <Link to="/profile" className="text-xl font-bold text-[#f0f0f0] hover:underline">Perfil</Link>
          )}
          {authenticated && location.pathname !== '/ayuda' && (
            <Link to="/ayuda" className="text-xl font-bold text-[#f0f0f0] hover:underline">Ayuda</Link>
          )}
        </nav>
        
        {/* Botón de Logout con imagen */}
        <button
          onClick={handleLogout}
          className="flex items-center bg-red-800 px-4 py-2 rounded-lg hover:bg-red-700 font-bold text-xl"
        >
          <img
            src={exitImg}
            alt="Salir"
            className="h-8 w-8 mr-2"
          />
        </button>
      </div>
    </header>
  );
};

export default Header;
