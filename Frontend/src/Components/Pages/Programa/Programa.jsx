import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

const Programa = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [sliderItems, setSliderItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Modal de cierre (solo para admin)
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Control de tiempo para cada slide
  const [timeForCurrent, setTimeForCurrent] = useState(0);
  const videoRef = useRef(null);

  // Carga inicial de la categoría seleccionada
  useEffect(() => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    if (!selectedCategory) {
      // Si no hay categoría almacenada, volvemos a home o a otra ruta
      navigate("/home");
      return;
    }
    const token = localStorage.getItem("token");
    if (!token) return;

    fetch("http://localhost:5000/api/advertising", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al obtener publicidad");
        return res.json();
      })
      .then((data) => {
        // Buscar la categoría cuyo nombre coincida con la almacenada
        const categoryData = data.find((cat) => cat.name === selectedCategory);
        if (categoryData && categoryData.files.length > 0) {
          setSliderItems(categoryData.files);
        } else {
          // Placeholder si no hay archivos
          setSliderItems([
            {
              file_type: "image",
              file_url:
                "https://via.placeholder.com/1920x1080?text=Sin+Contenido",
            },
          ]);
        }
      })
      .catch((err) => {
        console.error("Error fetching advertising:", err);
      });
  }, [navigate]);

  // Control de transiciones de imágenes y videos
  useEffect(() => {
    setTimeForCurrent(0);
    if (sliderItems.length === 0) return;
    const currentItem = sliderItems[currentIndex];

    let intervalId;
    const removeVideoListener = () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("timeupdate", handleVideoTime);
      }
    };

    if (currentItem?.file_type === "image") {
      // Para imágenes: 5 segundos
      intervalId = setInterval(() => {
        setTimeForCurrent((prev) => {
          const newVal = prev + 1;
          if (newVal >= 5) {
            nextSlide();
          }
          return newVal;
        });
      }, 1000);
    } else {
      // Para videos: reproducir hasta el final
      if (videoRef.current) {
        videoRef.current.addEventListener("timeupdate", handleVideoTime);
      }
    }

    return () => {
      clearInterval(intervalId);
      removeVideoListener();
    };
  }, [currentIndex, sliderItems]);

  const handleVideoTime = () => {
    if (!videoRef.current) return;
    setTimeForCurrent(videoRef.current.currentTime);
  };

  const handleVideoEnded = () => {
    nextSlide();
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => {
      const nextIndex = prev + 1;
      return nextIndex < sliderItems.length ? nextIndex : 0;
    });
  };

  // Botón "Cerrar" / "Volver"
  const handleCerrarClick = () => {
    if (isAdmin) {
      // Admin: mostrar modal de confirmación
      setShowModal(true);
      setPassword("");
      setErrorMsg("");
    } else {
      // Usuario normal: volver a Home sin contraseña
      navigate("/home");
    }
  };

  // Confirmar salida (solo admin)
  const handleConfirm = () => {
    if (password === "12345678") {
      // Si el admin ingresa la contraseña correcta,
      // en este ejemplo volvemos a "/iniciarPrograma" (o donde prefieras).
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
      <div className="flex items-center justify-center h-screen text-white bg-gradient-to-br from-indigo-900 via-purple-900 to-black">
        Cargando o sin contenido...
      </div>
    );
  }

  const currentItem = sliderItems[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black pt-24 pb-10 px-4">
      {/* Botón "Volver" o "Cerrar" */}
      <button
        onClick={handleCerrarClick}
        className="absolute top-8 right-8 bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        {isAdmin ? "Cerrar" : "Volver"}
      </button>

      {/* Contenedor principal */}
      <div className="mx-auto max-w-5xl h-[75vh] rounded-2xl shadow-2xl border-4 border-indigo-500 bg-white transform hover:scale-105 transition duration-300 overflow-hidden relative">
        <div className="w-full h-full bg-black flex items-center justify-center">
          {currentItem.file_type === "image" ? (
            <img
              src={currentItem.file_url}
              alt={`Slide ${currentIndex + 1}`}
              className="w-full h-full object-contain"
            />
          ) : (
            <video
              ref={videoRef}
              src={currentItem.file_url}
              className="w-full h-full object-contain"
              autoPlay
              muted
              onEnded={handleVideoEnded}
            />
          )}
        </div>
      </div>

      {/* Modal de confirmación (solo se muestra si es admin) */}
      {showModal && isAdmin && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80 transform hover:scale-105 transition duration-300">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Confirmar salida
            </h2>
            <p className="mb-4 text-center text-gray-700">
              Ingrese la contraseña de administrador:
            </p>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded mb-4 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
              placeholder="Contraseña"
            />
            {errorMsg && (
              <p className="text-red-500 text-center mb-2">{errorMsg}</p>
            )}
            <div className="flex justify-around">
              <button
                onClick={handleConfirm}
                className="bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700 transition"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded hover:bg-gray-600 transition"
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
