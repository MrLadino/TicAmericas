import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import logo from "../../../assets/Logo.png";
import exitImg from "../../../assets/Exit.png";
import { useLocation } from "react-router-dom";
import { useState } from "react";

const Header = () => {
  const { logout, authenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    if (authenticated) {
      logout();
      navigate("/login");
    } else {
      console.error("El usuario no está autenticado.");
    }
  };

  // Condición para no mostrar el Header en la ruta '/programa'
  if (location.pathname === "/programa") return null;

  return (
    <header className="bg-red-700 text-white py-3 shadow-xl">
      <div className="container mx-auto px-4">
        {/* Encabezado con diseño responsivo */}
        <div className="flex items-center justify-between sm:flex-col sm:items-center sm:space-y-4 sm:mb-4">
          {/* Logo */}
          <img
            src={logo}
            alt="Logo"
            className="h-12 w-12 rounded-full sm:h-16 sm:w-16"
          />

          {/* Título centrado */}
          <h1 className="text-lg sm:text-2xl md:text-3xl font-bold text-white tracking-wide text-center sm:mt-2">
            TIC Americas
          </h1>

          {/* Botón de menú hamburguesa */}
          <div className="sm:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="bg-red-800 p-2 rounded-lg hover:bg-red-600 transition duration-300"
            >
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white mb-1"></span>
              <span className="block w-6 h-0.5 bg-white"></span>
            </button>
          </div>
        </div>

        {/* Menú de navegación */}
        <nav
          className={`${
            isMenuOpen ? "block" : "hidden"
          } sm:block sm:mt-4`}
        >
          <ul className="flex flex-col sm:flex-row sm:justify-center sm:space-x-8 mt-4 sm:mt-0">
            <li className="my-2 sm:my-0">
              <Link
                to="/"
                className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Inicio
              </Link>
            </li>
            <li className="my-2 sm:my-0">
              <Link
                to="/lector-estatico"
                className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                onClick={() => setIsMenuOpen(false)}
              >
                Lector Estático
              </Link>
            </li>
            {authenticated && (
              <>
                <li className="my-2 sm:my-0">
                  <Link
                    to="/lector-dinamico"
                    className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Lector Dinámico
                  </Link>
                </li>
                <li className="my-2 sm:my-0">
                  <Link
                    to="/productos"
                    className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Productos
                  </Link>
                </li>
                <li className="my-2 sm:my-0">
                  <Link
                    to="/profile"
                    className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Perfil
                  </Link>
                </li>
                <li className="my-2 sm:my-0">
                  <Link
                    to="/ayuda"
                    className="font-semibold text-base md:text-lg lg:text-xl xl:text-2xl hover:text-black hover:underline transition duration-300 sm:px-4"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    Ayuda
                  </Link>
                </li>
              </>
            )}
          </ul>

          {/* Botón de logout */}
          {authenticated && (
            <div className="flex justify-center mt-4">
              <button
                onClick={handleLogout}
                className="flex items-center bg-red-800 px-4 py-2 rounded-lg hover:bg-red-600 transition duration-300 font-semibold text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl"
              >
                <img src={exitImg} alt="Salir" className="h-6 w-6 mr-2" />
                <span>Cerrar Sesión</span>
              </button>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;
