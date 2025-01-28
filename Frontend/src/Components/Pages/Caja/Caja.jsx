const Caja = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
        <h1 className="text-4xl font-bold mb-8 text-gray-900">Caja</h1>
        <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-6">
          {/* Input para leer el QR */}
          <label htmlFor="qrInput" className="block text-lg font-medium text-gray-700 mb-2">
            Escanea o introduce el código de barras/QR:
          </label>
          <input
            type="text"
            id="qrInput"
            className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-blue-500 focus:border-blue-500"
            placeholder="Ingresa el código..."
          />
  
          {/* Botón para procesar el QR */}
          <button
            className="w-full mt-4 bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-blue-600 transition-colors"
            onClick={() => alert("Procesando código...")}
          >
            Procesar
          </button>
        </div>
  
        {/* Sección para mostrar el producto */}
        <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-gray-100 shadow-md rounded-lg mt-8 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Producto</h2>
          <p className="text-gray-700">Aquí aparecerá la información del producto escaneado.</p>
        </div>
      </div>
    );
  };
  
  export default Caja;
  