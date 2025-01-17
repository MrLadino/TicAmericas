import { useState } from "react";
import { useNavigate } from "react-router-dom";

const useIniciarPrograma = () => {
  const navigate = useNavigate();
  const [modo, setModo] = useState("");
  const [opcionSeleccionada, setOpcionSeleccionada] = useState("");
  const [tiempoDuracion, setTiempoDuracion] = useState("");
  const [tiempoInicio, setTiempoInicio] = useState("");
  const [tiempoFin, setTiempoFin] = useState("");
  const [configuracionGuardada, setConfiguracionGuardada] = useState(null);
  const [error, setError] = useState("");

  const iniciarPrograma = () => {
    alert("¡El programa ha iniciado correctamente!");
    navigate("/programa");
  };

  const abrirConfiguracion = () => {
    setModo("configurar");
    setError("");
  };

  const guardarConfiguracion = () => {
    if (opcionSeleccionada === "rango") {
      if (!tiempoInicio || !tiempoFin) {
        setError("Debes seleccionar tanto la hora de inicio como la hora de fin.");
        return;
      }
    }

    let configuracion = "";
    if (opcionSeleccionada === "duracion") {
      configuracion = `${tiempoDuracion} horas`;
    } else if (opcionSeleccionada === "rango") {
      configuracion = `De ${tiempoInicio} a ${tiempoFin}`;
    } else if (opcionSeleccionada === "indefinido") {
      configuracion = "Indefinido";
    }

    setConfiguracionGuardada(configuracion);
    setModo("");
    setError("");
    alert("Configuración guardada con éxito.");
  };

  const manejarEntradaNumerica = (e) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) {
      setTiempoDuracion(valor);
    }
  };

  const manejarEnterDuracion = (e) => {
    if (e.key === "Enter" && tiempoDuracion) {
      guardarConfiguracion();
    }
  };

  return {
    modo,
    opcionSeleccionada,
    tiempoDuracion,
    tiempoInicio,
    tiempoFin,
    configuracionGuardada,
    error,
    iniciarPrograma,
    abrirConfiguracion,
    guardarConfiguracion,
    manejarEntradaNumerica,
    manejarEnterDuracion,
    setOpcionSeleccionada,
    setTiempoInicio,
    setTiempoFin,
  };
};

export default useIniciarPrograma;
