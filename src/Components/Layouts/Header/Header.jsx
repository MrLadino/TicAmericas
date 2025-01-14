import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext"; // Importa el hook
import logo from "../../../assets/Logo.png";
import exitImg from "../../../assets/Exit.png"; // Importa la imagen para el logout

const Header = () => {
  const { logout, authenticated } = useAuth(); // Usamos el hook aquí
  const navigate = useNavigate();

  const handleLogout = () => {
    if (authenticated) {
      logout(); // Cambia el estado de autenticación
      navigate("/login"); // Redirige a la página de login
    } else {
      console.error("El usuario no está autenticado.");
    }
  };

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
          <Link to="/" className="text-xl font-bold text-[#f0f0f0] hover:underline">Inicio</Link>
          <Link to="/iniciarPrograma" className="text-xl font-bold text-[#f0f0f0] hover:underline">Iniciar</Link>
          <Link to="/productos" className="text-xl font-bold text-[#f0f0f0] hover:underline">Productos</Link>
          <Link to="/profile" className="text-xl font-bold text-[#f0f0f0] hover:underline">Perfil</Link>
          <Link to="/ayuda" className="text-xl font-bold text-[#f0f0f0] hover:underline">Ayuda</Link>
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
          {/* <span className="text-[#f0f0f0]">Cerrar Sesión</span> */}
        </button>
      </div>
    </header>
  );
};

export default Header;
