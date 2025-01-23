import useIniciarPrograma from "./IPLogica";
import iniciarImg from "../../../assets/Iniciar.png";
import configurarImg from "../../../assets/Configurar.png";

const IniciarPrograma = () => {
  const {
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
  } = useIniciarPrograma();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Iniciar Programa</h2>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Este apartado te permite iniciar el funcionamiento del programa o configurar su comportamiento. <br />
          Por favor configurar el sistema antes de iniciarlo.
        </p>

        {configuracionGuardada && (
          <p className="text-green-600 font-medium mb-4 text-sm sm:text-base">
            Configuración actual: <span className="font-bold">{configuracionGuardada}</span>
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-around items-center sm:space-x-6 mb-8">
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <img
              src={iniciarImg}
              alt="Iniciar"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full cursor-pointer hover:scale-105 shadow-md transition-transform"
              onClick={iniciarPrograma}
            />
            <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">Iniciar</p>
          </div>

          <div className="flex flex-col items-center">
            <img
              src={configurarImg}
              alt="Configurar"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full cursor-pointer hover:scale-105 shadow-md transition-transform"
              onClick={abrirConfiguracion}
            />
            <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">Configurar</p>
          </div>
        </div>

        {modo === "configurar" && (
          <div className="text-left mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Configuración del Funcionamiento</h3>
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona el tipo de uso
              </label>
              <select
                value={opcionSeleccionada}
                onChange={(e) => setOpcionSeleccionada(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="duracion">Por duración en horas</option>
                <option value="rango">Por un rango de tiempo</option>
                <option value="indefinido">Indefinido</option>
              </select>
            </div>

            {opcionSeleccionada === "duracion" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">Ingresa la duración en horas</label>
                <input
                  type="text"
                  value={tiempoDuracion}
                  onChange={manejarEntradaNumerica}
                  onKeyDown={manejarEnterDuracion}
                  placeholder="Ejemplo: 2"
                  className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                />
                <p className="text-xs sm:text-sm text-gray-500 mt-1">Presiona Enter para guardar el cambio</p>
              </div>
            )}

            {opcionSeleccionada === "rango" && (
              <>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora de inicio</label>
                  <input
                    type="time"
                    value={tiempoInicio}
                    onChange={(e) => setTiempoInicio(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Hora de fin</label>
                  <input
                    type="time"
                    value={tiempoFin}
                    onChange={(e) => setTiempoFin(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-2 sm:p-3 focus:outline-none focus:ring-2 focus:ring-red-500"
                  />
                </div>
              </>
            )}

            {opcionSeleccionada === "indefinido" && (
              <p className="text-gray-700 mb-4 text-sm sm:text-base">
                Seleccionaste la opción Indefinido. Presiona guardar para confirmar.
              </p>
            )}

            {error && <p className="text-red-600 font-medium mb-4 text-sm sm:text-base">{error}</p>}

            <button
              onClick={guardarConfiguracion}
              className="bg-red-500 text-white py-2 sm:py-3 px-4 sm:px-6 rounded-lg shadow-md hover:bg-red-600 transition-colors text-sm sm:text-base"
            >
              Guardar configuración
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IniciarPrograma;
