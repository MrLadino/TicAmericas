// Frontend/src/Components/Pages/Programa/Programa.jsx
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

const Programa = () => {
  const navigate = useNavigate();
  const [sliderItems, setSliderItems] = useState([]); 
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    if (!selectedCategory) {
      navigate("/iniciarPrograma");
      return;
    }
    const token = localStorage.getItem("token");
    fetch("http://localhost:5000/api/advertising", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener publicidad");
        return res.json();
      })
      .then((data) => {
        // Buscamos la categoría
        const categoryData = data.find((cat) => cat.name === selectedCategory);
        if (categoryData && categoryData.files.length > 0) {
          setSliderItems(categoryData.files);
        } else {
          // Placeholder si no hay archivos
          setSliderItems([
            {
              file_type: "image",
              file_url: "https://via.placeholder.com/1920x1080?text=Sin+Contenido",
            },
          ]);
        }
      })
      .catch((err) => {
        console.error("Error fetching advertising:", err);
      });
  }, [navigate]);

  useEffect(() => {
    if (sliderItems.length === 0) return;

    const currentItem = sliderItems[currentIndex];
    if (currentItem.file_type === "image") {
      // Para imágenes => 5s
      const timer = setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
      }, 5000);
      return () => clearTimeout(timer);
    }
    // Si es video => se maneja con onEnded en el <video>
  }, [sliderItems, currentIndex]);

  const handleVideoEnded = () => {
    setCurrentIndex((prev) => (prev + 1) % sliderItems.length);
  };

  const handleCerrarClick = () => {
    setShowModal(true);
    setPassword("");
    setErrorMsg("");
  };

  const handleConfirm = () => {
    if (password === "12345678") {
      navigate("/iniciarPrograma");
    } else {
      setErrorMsg("Contraseña incorrecta");
      setTimeout(() => {
        setShowModal(false);
        setErrorMsg("");
      }, 2000);
    }
  };

  if (sliderItems.length === 0) {
    return (
      <div className="flex items-center justify-center h-screen text-white">
        Cargando o sin contenido...
      </div>
    );
  }

  const currentItem = sliderItems[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gradient-to-r from-blue-500 to-purple-600 overflow-hidden">
      {/* Contenedor principal del slider */}
      <div className="absolute inset-0 flex items-center justify-center">
        {currentItem.file_type === "image" ? (
          <img
            src={currentItem.file_url}
            alt={`Slide ${currentIndex + 1}`}
            className="w-full h-full object-cover transition-opacity duration-1000"
          />
        ) : (
          <video
            src={currentItem.file_url}
            className="w-full h-full object-cover transition-opacity duration-1000"
            autoPlay
            muted
            onEnded={handleVideoEnded}
          />
        )}
      </div>

      {/* Indicadores */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {sliderItems.map((_, i) => (
          <div
            key={i}
            className={`w-4 h-4 rounded-full ${
              i === currentIndex ? "bg-white" : "bg-gray-400"
            }`}
          ></div>
        ))}
      </div>

      {/* Botón "Cerrar" */}
      <div className="absolute top-4 right-4">
        <button
          onClick={handleCerrarClick}
          className="bg-red-600 text-white font-semibold py-2 px-4 rounded-lg shadow-lg hover:bg-red-700"
        >
          Cerrar
        </button>
      </div>

      {/* Modal de confirmación */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-bold mb-4 text-center">Confirmar salida</h2>
            <p className="mb-4 text-center">Ingrese la contraseña de administrador:</p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4"
              placeholder="Contraseña"
            />
            {errorMsg && (
              <p className="text-red-500 text-center mb-2">{errorMsg}</p>
            )}
            <div className="flex justify-around">
              <button
                onClick={handleConfirm}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Programa;
