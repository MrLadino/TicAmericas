import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";

const Programa = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [sliderItems, setSliderItems] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showModal, setShowModal] = useState(false);
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [timeForCurrent, setTimeForCurrent] = useState(0);
  const [showNoNovedades, setShowNoNovedades] = useState(false);
  const videoRef = useRef(null);

  // Cargar la publicidad desde la categoría o categorías activas
  useEffect(() => {
    const selectedCategory = localStorage.getItem("selectedCategory");
    if (!selectedCategory && isAdmin) {
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
        if (isAdmin) {
          // Si el usuario es admin, se selecciona la categoría almacenada
          const categoryData = data.find((cat) => cat.name === selectedCategory);
          if (categoryData && categoryData.files && categoryData.files.length > 0) {
            setSliderItems(categoryData.files);
          } else {
            setSliderItems([]);
            setShowNoNovedades(true);
          }
        } else {
          // Para usuario normal: combinar los archivos de todas las categorías activas
          let allFiles = [];
          data.forEach((cat) => {
            allFiles = allFiles.concat(cat.files || []);
          });
          if (allFiles.length > 0) {
            setSliderItems(allFiles);
          } else {
            setSliderItems([]);
            setShowNoNovedades(true);
          }
        }
      })
      .catch((err) => {
        console.error("Error fetching advertising:", err);
      });
  }, [navigate, isAdmin]);

  // Control de transiciones de imágenes y videos (solo si hay archivos)
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

  // Al pulsar "Cerrar" se abre el modal de contraseña para salir
  const handleCerrarClick = () => {
    setShowModal(true);
    setPassword("");
    setErrorMsg("");
  };

  // Auto-cierra el modal de contraseña después de 10 segundos si no se ingresa nada
  useEffect(() => {
    let timeout;
    if (showModal) {
      timeout = setTimeout(() => {
        setShowModal(false);
      }, 10000);
    }
    return () => clearTimeout(timeout);
  }, [showModal]);

  // Validar la contraseña ingresada vía backend (POST /api/auth/validate-password)
  const handleConfirm = () => {
    fetch("http://localhost:5000/api/auth/validate-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ password }),
    })
      .then((res) => {
        if (!res.ok) throw new Error("Contraseña incorrecta");
        return res.json();
      })
      .then((data) => {
        if (data.valid) {
          navigate("/home");
        } else {
          throw new Error("Contraseña incorrecta");
        }
      })
      .catch((err) => {
        setErrorMsg("Contraseña incorrecta");
        setTimeout(() => {
          setShowModal(false);
          setErrorMsg("");
        }, 2000);
      });
  };

  const currentItem = sliderItems[currentIndex];

  return (
    <div className="relative w-full h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-black pt-24 pb-10 px-4">
      {/* Botón "Cerrar" */}
      <button
        onClick={handleCerrarClick}
        className="absolute top-8 right-8 bg-indigo-700 text-white font-bold py-2 px-4 rounded-lg shadow-lg hover:bg-indigo-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
      >
        Cerrar
      </button>

      {sliderItems.length === 0 && showNoNovedades ? (
        <div className="flex flex-col items-center justify-center h-full text-white">
          <h1 className="text-3xl font-bold mb-4">Publicidad - TIC Americas</h1>
          <p className="mb-8 text-lg">No hay novedades por ahora.</p>
        </div>
      ) : (
        <div className="mx-auto max-w-5xl h-[75vh] rounded-2xl shadow-2xl border-4 border-indigo-500 bg-white transform hover:scale-105 transition duration-300 overflow-hidden relative">
          <div className="w-full h-full bg-black flex items-center justify-center">
            {currentItem?.file_type === "image" ? (
              <img
                src={currentItem.file_url}
                alt={`Slide ${currentIndex + 1}`}
                className="w-full h-full object-contain"
              />
            ) : (
              <video
                ref={videoRef}
                src={currentItem?.file_url}
                className="w-full h-full object-contain"
                autoPlay
                muted
                onEnded={handleVideoEnded}
              />
            )}
          </div>
        </div>
      )}

      {/* Modal de confirmación para cerrar el apartado */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-[999999]">
          <div className="bg-white p-6 rounded-xl shadow-2xl w-80 transform transition duration-300 hover:scale-105">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              Ingrese su contraseña para cerrar el apartado
            </h2>
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
                className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
              >
                Confirmar
              </button>
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
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
