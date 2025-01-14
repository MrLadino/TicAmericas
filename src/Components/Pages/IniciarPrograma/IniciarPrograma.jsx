import { useState } from 'react';
import iniciarImg from '../../../assets/Iniciar.png'; // Ruta para la imagen "Iniciar"
import configurarImg from '../../../assets/Configurar.png'; // Ruta para la imagen "Configurar"

const IniciarPrograma = () => {
  const [modo, setModo] = useState('');
  const [opcionSeleccionada, setOpcionSeleccionada] = useState('');
  const [tiempoDuracion, setTiempoDuracion] = useState('');
  const [tiempoInicio, setTiempoInicio] = useState('');
  const [tiempoFin, setTiempoFin] = useState('');
  const [configuracionGuardada, setConfiguracionGuardada] = useState(null);
  const [error, setError] = useState('');

  const iniciarPrograma = () => {
    alert('¡El programa ha iniciado correctamente!');
  };

  const abrirConfiguracion = () => {
    setModo('configurar');
    setError(''); // Limpiar errores al abrir el menú de configuración
  };

  const guardarConfiguracion = () => {
    if (opcionSeleccionada === 'rango') {
      if (!tiempoInicio || !tiempoFin) {
        setError('Debes seleccionar tanto la hora de inicio como la hora de fin.');
        return;
      }
    }

    let configuracion = '';
    if (opcionSeleccionada === 'duracion') {
      configuracion = `${tiempoDuracion} horas`;
    } else if (opcionSeleccionada === 'rango') {
      configuracion = `De ${tiempoInicio} a ${tiempoFin}`;
    } else if (opcionSeleccionada === 'indefinido') {
      configuracion = 'Indefinido';
    }

    setConfiguracionGuardada(configuracion);
    setModo(''); // Volver al menú principal
    setError(''); // Limpiar errores después de guardar
    alert('Configuración guardada con éxito.');
  };

  const manejarEntradaNumerica = (e) => {
    const valor = e.target.value;
    if (/^\d*$/.test(valor)) {
      setTiempoDuracion(valor);
    }
  };

  const manejarEnterDuracion = (e) => {
    if (e.key === 'Enter' && tiempoDuracion) {
      guardarConfiguracion();
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="max-w-2xl w-full bg-white p-8 rounded-lg shadow-lg text-center">
        {/* Título */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Iniciar Programa</h2>

        {/* Descripción */}
        <p className="text-gray-600 mb-6">
          Este apartado te permite iniciar el funcionamiento del programa o configurar su comportamiento. <br /> Por favor configurar el sistema antes de iniciarlo
        </p>

        {/* Configuración guardada */}
        {configuracionGuardada && (
          <p className="text-green-600 font-medium mb-4">
            Configuración actual: <span className="font-bold">{configuracionGuardada}</span>
          </p>
        )}

        {/* Contenedor de botones */}
        <div className="flex justify-around mb-8">
          {/* Botón Iniciar */}
          <div className="flex flex-col items-center">
            <img
              src={iniciarImg}
              alt="Iniciar"
              className="w-32 h-32 rounded-full cursor-pointer hover:scale-105 shadow-md transition-transform"
              onClick={iniciarPrograma}
            />
            <p className="mt-2 text-gray-700 font-medium">Iniciar</p>
          </div>

          {/* Botón Configurar */}
          <div className="flex flex-col items-center">
            <img
              src={configurarImg}
              alt="Configurar"
              className="w-32 h-32 rounded-full cursor-pointer hover:scale-105 shadow-md transition-transform"
              onClick={abrirConfiguracion}
            />
            <p className="mt-2 text-gray-700 font-medium">Configurar</p>
          </div>
        </div>

        {/* Menú de configuración */}
        {modo === 'configurar' && (
          <div className="text-left mt-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">
              Configuración del Funcionamiento
            </h3>
            {/* Tipo de uso */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Selecciona el tipo de uso
              </label>
              <select
                value={opcionSeleccionada}
                onChange={(e) => setOpcionSeleccionada(e.target.value)}
                className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="" disabled>
                  Selecciona una opción
                </option>
                <option value="duracion">Por duración en horas</option>
                <option value="rango">Por un rango de tiempo</option>
                <option value="indefinido">Indefinido</option>
              </select>
            </div>

            {/* Configuración adicional según la selección */}
            {opcionSeleccionada === 'duracion' && (
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Ingresa la duración en horas
                </label>
                <input
                  type="text"
                  value={tiempoDuracion}
                  onChange={manejarEntradaNumerica}
                  onKeyDown={manejarEnterDuracion}
                  placeholder="Ejemplo: 2"
                  className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <p className="text-sm text-gray-500 mt-1">Presiona Enter para guardar el cambio</p>
              </div>
            )}

            {opcionSeleccionada === 'rango' && (
              <>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora de inicio
                  </label>
                  <input
                    type="time"
                    value={tiempoInicio}
                    onChange={(e) => setTiempoInicio(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora de fin
                  </label>
                  <input
                    type="time"
                    value={tiempoFin}
                    onChange={(e) => setTiempoFin(e.target.value)}
                    className="w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {opcionSeleccionada === 'indefinido' && (
              <p className="text-gray-700 mb-4">
                Seleccionaste la opción Indefinido. Presiona guardar para confirmar.
              </p>
            )}

            {/* Mensaje de error */}
            {error && <p className="text-red-600 font-medium mb-4">{error}</p>}

            {/* Botón para guardar configuración */}
            <button
              onClick={guardarConfiguracion}
              className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded-lg mt-4"
            >
              Guardar Configuración
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default IniciarPrograma;
