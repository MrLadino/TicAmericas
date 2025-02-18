import React from "react";
import useHomeLogic from "./useHomeLogic";

const Home = () => {
  // Desestructuramos las propiedades del hook
  const { images, currentImage, handlePrev, handleNext } = useHomeLogic();

  return (
    <div className="flex flex-col min-h-screen bg-white text-black">
      <main className="flex-grow">
        {/* Título principal */}
        <h1 className="text-center mt-32 text-4xl sm:text-5xl md:text-6xl font-extrabold">
          Bienvenido a tu experiencia personalizada
        </h1>

        {/* Slider de imágenes */}
        <div className="relative w-full sm:w-3/4 lg:w-2/3 mx-auto mt-12 shadow-xl rounded-lg overflow-hidden">
          <img
            src={images[currentImage]}
            alt={`Slider ${currentImage + 1}`}
            className="w-full h-64 sm:h-80 lg:h-96 object-cover transition-all duration-1000 ease-in-out transform hover:scale-105"
          />
          {/* Botón para retroceder */}
          <button
            onClick={handlePrev}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-800"
          >
            Prev
          </button>
          {/* Botón para avanzar */}
          <button
            onClick={handleNext}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-gray-700 text-white px-3 py-2 rounded-full hover:bg-gray-800"
          >
            Next
          </button>
        </div>

        {/* Sección de Beneficios (opcional) */}
        <div className="bg-gray-200 py-8 px-4 sm:py-12 sm:px-6 mt-8 sm:mt-16 mx-auto max-w-screen-lg rounded-lg shadow-lg">
          <h2 className="text-3xl font-semibold text-center mb-6">
            Ventajas de usar nuestro sistema
          </h2>
          <p className="text-lg text-center mb-8">
            Mejora tu productividad con herramientas de última tecnología adaptadas a tus necesidades diarias.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl font-bold mb-4">Fácil de Usar</h4>
              <p className="text-sm text-gray-700">Diseño intuitivo y amigable para el usuario.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl font-bold mb-4">Accesible</h4>
              <p className="text-sm text-gray-700">Disponible en todos tus dispositivos preferidos.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-md hover:shadow-xl transition duration-300">
              <h4 className="text-xl font-bold mb-4">Soporte 24/7</h4>
              <p className="text-sm text-gray-700">Asistencia inmediata en cualquier momento.</p>
            </div>
          </div>
        </div>

        {/* Sección de Testimonios (opcional) */}
        <div className="py-16 mt-16 bg-black text-white">
          <h2 className="text-3xl font-extrabold text-center mb-6">Lo que dicen nuestros usuarios</h2>
          <div className="flex flex-wrap justify-center gap-6 px-4 sm:px-6">
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <blockquote className="bg-red-600 p-6 sm:p-8 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg">
                  Este sistema ha transformado por completo la forma en que gestiono mi trabajo diario. ¡Increíble!
                </p>
                <footer className="mt-4 text-sm">- Juan Pérez</footer>
              </blockquote>
            </div>
            <div className="w-full sm:w-1/2 lg:w-1/3 p-4">
              <blockquote className="bg-red-600 p-6 sm:p-8 rounded-lg shadow-lg">
                <p className="text-base sm:text-lg">
                  La plataforma es tan fácil de usar que todos en mi equipo la adoptaron rápidamente. ¡Es genial!
                </p>
                <footer className="mt-4 text-sm">- María López</footer>
              </blockquote>
            </div>
          </div>
        </div>

        <div className="my-24" />
      </main>
    </div>
  );
};

export default Home;
