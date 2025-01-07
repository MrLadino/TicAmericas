import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../../../assets/Logo.png";

const Header = () => {
  return (
    <header className="bg-red-600 text-white py-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center px-4">
        {/* Logo */}
        <img src={logo} alt="Logo" className="h-20 w-20 rounded-full" />
        
        {/* Nombre del sitio */}
        <h1 className="text-3xl font-bold text-[#f0f0f0] flex-grow text-center">TIC Americas</h1>
        
        {/* Navegación */}
        <nav className="space-x-4 flex-grow flex justify-center">
          <Link to="/" className="text-xl font-bold text-[#f0f0f0] hover:underline">Inicio</Link>
          <Link to="/nosotros" className="text-xl font-bold text-[#f0f0f0] hover:underline">Nosotros</Link>
          <Link to="/productos" className="text-xl font-bold text-[#f0f0f0] hover:underline">Productos</Link>
          <Link to="/profile" className="text-xl font-bold text-[#f0f0f0] hover:underline">Perfil</Link>
          <Link to="/ayuda" className="text-xl font-bold text-[#f0f0f0] hover:underline">Ayuda</Link> {/* Ruta correcta a Ayuda */}
        </nav>
        
        {/* Botón de Log Out */}
        <button
          className="bg-red-800 text-[#f0f0f0] px-4 py-2 rounded-lg hover:bg-red-700 font-bold text-xl"
        >
          Log Out
        </button>
      </div>
    </header>
  );
};

export default Header;
