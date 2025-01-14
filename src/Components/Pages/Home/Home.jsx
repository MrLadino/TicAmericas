// src/Components/Pages/Home/Home.jsx
import { useState, useEffect } from "react";
import slider1 from "../../../assets/Slider1.png";
import slider2 from "../../../assets/Slider2.png";

const Home = () => {
  const images = [slider1, slider2]; // Array de imágenes
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Cambia a la siguiente imagen
    }, 5000); // Cambia cada 5 segundos

    return () => clearInterval(interval); // Limpia el intervalo cuando el componente se desmonta
  }, [images.length]);

  const handlePrev = () => {
    setCurrentImage((prevImage) => (prevImage - 1 + images.length) % images.length);
  };

  const handleNext = () => {
    setCurrentImage((prevImage) => (prevImage + 1) % images.length);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
      <main className="flex-grow">
        {/* Título */}
        <h1 className="text-center mt-16 text-5xl font-bold text-gray-900">
          Bienvenido a la página principal
        </h1>

        {/* Slider de imágenes */}
        <div className="relative w-4/5 md:w-3/4 lg:w-1/2 mx-auto mt-12 shadow-lg rounded-lg overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`Slider ${currentImage + 1}`}
            className="w-full h-80 object-cover transition-opacity duration-1000"
            style={{ filter: "drop-shadow(0 4px 6px rgba(0, 0, 0, 0.1))" }}
          />
          {/* Botones de flecha */}
          <button
            onClick={handlePrev}
            className="absolute top-1/2 left-0 transform -translate-y-1/2 text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
            aria-label="Anterior"
          >
            &#8592;
          </button>
          <button
            onClick={handleNext}
            className="absolute top-1/2 right-0 transform -translate-y-1/2 text-white bg-gray-600 p-3 rounded-full hover:bg-gray-700"
            aria-label="Siguiente"
          >
            &#8594;
          </button>
        </div>

        {/* Sección de Beneficios */}
        <div className="bg-gray-100 py-8 px-6 mt-12 mx-auto w-4/5 md:w-3/4 lg:w-1/2 shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-black text-center mb-4">
            Ventajas de usar nuestro sistema
          </h2>
          <p className="text-lg text-gray-700 mb-4">
            Nuestro sistema te permite gestionar todo de manera eficiente, con herramientas diseñadas para facilitar tus actividades diarias.
          </p>
          <p className="text-lg text-gray-700 mb-4">
            Además, ofrecemos actualizaciones constantes para mantenerte a la vanguardia de la tecnología. ¡Siempre estamos trabajando para mejorar!
          </p>
        </div>

        {/* Sección de Características */}
        <div className="bg-red-600 py-8 mt-12">
          <div className="flex flex-wrap justify-around text-center text-white">
            <div className="mb-4">
              <h4 className="text-xl font-bold">Fácil de Usar</h4>
              <p className="text-sm">Diseño intuitivo para todos.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold">Accesible</h4>
              <p className="text-sm">Disponible en cualquier dispositivo.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold">Soporte 24/7</h4>
              <p className="text-sm">Asistencia siempre que la necesites.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold">Seguridad</h4>
              <p className="text-sm">Tus datos están protegidos con nosotros.</p>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold">Integraciones</h4>
              <p className="text-sm">Compatible con múltiples plataformas.</p>
            </div>
          </div>
        </div>

        {/* Testimonios */}
        <div className="py-12 mt-12 bg-gray-50">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Lo que dicen nuestros usuarios</h2>
          <div className="flex flex-wrap justify-around mx-auto w-4/5 md:w-3/4 lg:w-3/5">
            <div className="w-full md:w-1/3 p-4">
              <blockquote className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">
                  Este sistema ha transformado completamente la manera en que gestiono mis actividades diarias. ¡Altamente recomendado!
                </p>
                <footer className="mt-4 text-sm text-gray-500">- Juan Pérez</footer>
              </blockquote>
            </div>
            <div className="w-full md:w-1/3 p-4">
              <blockquote className="bg-white p-6 rounded-lg shadow-lg">
                <p className="text-gray-700">
                  La interfaz es tan fácil de usar que todo mi equipo la adoptó sin problemas. ¡Gracias por hacerlo tan simple!
                </p>
                <footer className="mt-4 text-sm text-gray-500">- María López</footer>
              </blockquote>
            </div>
          </div>
        </div>

        {/* Espaciado adicional antes del footer */}
        <div className="my-16" />
      </main>
    </div>
  );
};

export default Home;
