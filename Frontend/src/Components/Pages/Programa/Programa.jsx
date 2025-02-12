import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Importar useNavigate para navegar
import imagen1 from '../../../assets/Publicidad1.png';
import imagen2 from '../../../assets/Publicidad2.png';
import imagen3 from '../../../assets/Publicidad3.png';

const Slider = () => {
  const images = [imagen1, imagen2, imagen3];
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate(); // Hook para la navegación

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Cambiar de imagen cada 5 segundos

    // Limpiar el intervalo cuando el componente se desmonte
    return () => clearInterval(interval);
  }, []);

  // Función para regresar al apartado de "Iniciar Programa"
  const handleSalir = () => {
    navigate('/iniciarPrograma'); // Navegar a la página de iniciar programa
  };

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Imagen que ocupa toda la pantalla */}
      <img
        src={images[currentIndex]}
        alt={`Imagen ${currentIndex + 1}`}
        className="w-full h-full object-cover"
      />

      {/* Indicadores de las imágenes */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`w-4 h-4 rounded-full ${index === currentIndex ? 'bg-white' : 'bg-gray-500'}`}
          ></div>
        ))}
      </div>

      {/* Botón para salir y volver a "Iniciar Programa" */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleSalir}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-red-700"
        >
          Salir
        </button>
      </div>
    </div>
  );
};

export default Slider;




