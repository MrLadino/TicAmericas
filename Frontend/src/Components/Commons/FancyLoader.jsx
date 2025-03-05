// Frontend/src/Components/Commons/FancyLoader.jsx
import React, { useState, useEffect } from "react";
import logo from "../../assets/Logo.png";

const FancyLoader = () => {
  const [percentage, setPercentage] = useState(0);

  useEffect(() => {
    // Incrementa el porcentaje de 0 a 100 en 2 segundos (100 * 20ms = 2000ms)
    const interval = setInterval(() => {
      setPercentage((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(interval);
        return 100;
      });
    }, 20);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">
      <div className="relative w-64 h-64 rounded-full overflow-hidden shadow-2xl">
        <img src={logo} alt="Logo de TIC Americas" className="w-full h-full object-cover" />
        {/* Capa de máscara que se reduce gradualmente para revelar la imagen */}
        <div
          className="absolute bottom-0 left-0 w-full bg-white transition-all duration-200 ease-linear"
          style={{ height: `${100 - percentage}%` }}
        ></div>
      </div>
      <div className="mt-4 text-2xl font-bold text-gray-800">{percentage}%</div>
    </div>
  );
};

export default FancyLoader;
