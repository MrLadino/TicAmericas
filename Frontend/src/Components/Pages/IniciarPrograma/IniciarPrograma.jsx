import useIniciarPrograma from "./IPLogica";
import iniciarImg from "../../../assets/Iniciar.png";
import administrarImg from "../../../assets/Logo.png";

const IniciarPrograma = () => {
  const {
    modo,
    categorias,
    elementos,
    categoriaSeleccionada,
    error,
    archivoSeleccionado,
    mostrarPanel,
    iniciarPrograma,
    abrirAdministrarPublicidad,
    agregarCategoria,
    editarCategoria,
    eliminarCategoria,
    seleccionarCategoria,
    agregarElemento,
    eliminarElemento,
    seleccionarArchivo,
    cerrarPanel,
    volverAlEstadoBase, // Nueva función
    validarPublicidad // Nueva validación
  } = useIniciarPrograma();

  return (
    <div className="mt-20  min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4 sm:px-6 lg:px-8">
      <div className="mt-14 max-w-2xl w-full bg-white p-6 sm:p-8 rounded-xl shadow-xl text-center">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-4">Iniciar Programa</h2>
        <p className="text-gray-700 mb-6 text-sm sm:text-base">
          Este apartado te permite iniciar el programa o administrar la publicidad asociada.
        </p>

        <div className="flex flex-col sm:flex-row justify-around items-center sm:space-x-6 mb-8">
          <div className="flex flex-col items-center mb-4 sm:mb-0">
            <img
              src={iniciarImg}
              alt="Iniciar"
              className={`w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full cursor-pointer shadow-md transition-transform ${
                validarPublicidad() ? "hover:scale-105" : "opacity-50 cursor-not-allowed"
              }`}
              onClick={validarPublicidad() ? iniciarPrograma : null}
            />
            <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">Iniciar</p>
            {!validarPublicidad() && (
              <p className="text-red-500 text-xs mt-1">Configura publicidad antes de iniciar</p>
            )}
          </div>

          <div className="flex flex-col items-center">
            <img
              src={administrarImg}
              alt="Administrar"
              className="w-24 h-24 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full cursor-pointer hover:scale-105 shadow-md transition-transform"
              onClick={abrirAdministrarPublicidad}
            />
            <p className="mt-2 text-gray-700 font-semibold text-sm sm:text-base">Administrar Publicidad</p>
          </div>
        </div>

        {modo === "administrar" && (
          <div className="text-left mt-6">
            <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-4">Administrar Publicidad</h3>

            {/* Categorías */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">Categorías</label>
              <select
                className="w-full mb-4 p-2 border border-gray-300 rounded-lg"
                onChange={(e) => seleccionarCategoria(e.target.value)}
                value={categoriaSeleccionada || ""}
              >
                <option value="" disabled>
                  Selecciona una categoría
                </option>
                {categorias.map((categoria, index) => (
                  <option key={index} value={categoria}>
                    {categoria}
                  </option>
                ))}
              </select>

              <div className="flex flex-wrap gap-4">
                <button
                  onClick={agregarCategoria}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-600 transition-colors"
                >
                  Agregar categoría
                </button>
                {categoriaSeleccionada && (
                  <>
                    <button
                      onClick={() => editarCategoria(categoriaSeleccionada)}
                      className="bg-yellow-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-yellow-600 transition-colors"
                    >
                      Editar nombre
                    </button>
                    <button
                      onClick={eliminarCategoria}
                      className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                    >
                      Eliminar categoría
                    </button>
                  </>
                )}
              </div>
            </div>

            {/* Elementos */}
            {categoriaSeleccionada && (
              <div className="text-center mt-4">
                <h4 className="text-lg font-semibold text-gray-800 mb-4">
                  Elementos en {categoriaSeleccionada}
                </h4>
                <div className="overflow-y-auto max-h-96">
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {elementos[categoriaSeleccionada]?.map((elemento, index) => (
                      <div
                        key={index}
                        className="w-full h-40 rounded-lg shadow-lg bg-gray-200 flex items-center justify-center cursor-pointer"
                        onClick={() => seleccionarArchivo(elemento)}
                      >
                        {elemento.type.startsWith("image") ? (
                          <img
                            src={URL.createObjectURL(elemento)}
                            alt={`Elemento ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                          />
                        ) : (
                          <video
                            src={URL.createObjectURL(elemento)}
                            controls
                            className="w-full h-full rounded-lg"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={(e) => agregarElemento(categoriaSeleccionada, e.target.files)}
                    className="block w-full text-sm text-gray-500 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-600 hover:file:bg-blue-100"
                  />
                </div>
              </div>
            )}

            {error && <p className="text-red-600 font-medium mt-4">{error}</p>}

            {/* Botón de cerrar */}
            <div className="text-center mt-8">
              <button
                onClick={volverAlEstadoBase}
                className="bg-blue-500 text-white py-2 px-6 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
              >
                Hecho
              </button>
            </div>
          </div>
        )}

        {/* Panel */}
        {mostrarPanel && archivoSeleccionado && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96">
              <h4 className="text-lg font-bold text-gray-800 mb-4">Información del archivo</h4>
              <p className="text-sm text-gray-600 mb-2">Tipo: {archivoSeleccionado.type}</p>
              <p className="text-sm text-gray-600 mb-4">
                Tamaño: {(archivoSeleccionado.size / 1024).toFixed(2)} KB
              </p>
              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => eliminarElemento(categoriaSeleccionada, archivoSeleccionado)}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                  Eliminar
                </button>
                <button
                  onClick={cerrarPanel}
                  className="bg-gray-300 text-gray-800 py-2 px-4 rounded-lg shadow-md hover:bg-gray-400 transition-colors"
                >
                  Cerrar
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default IniciarPrograma;
