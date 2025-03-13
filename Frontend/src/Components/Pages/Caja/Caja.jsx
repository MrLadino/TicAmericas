import React, { useState } from "react";

const Caja = () => {
  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [alerta, setAlerta] = useState(null);

  const mostrarAlerta = (mensaje, tipo = "error") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 3000);
  };

  const buscarProducto = async () => {
    if (!codigo.trim()) return;
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Token enviado desde frontend:", token);
      if (!token) {
        mostrarAlerta("No hay token guardado. Inicia sesión nuevamente.", "error");
        return;
      }
      const response = await fetch(`http://localhost:5000/api/productos/buscar/${codigo}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!response.ok) throw new Error("Producto no encontrado");
      const data = await response.json();
      setProducto(data);
    } catch (error) {
      mostrarAlerta(error.message);
      setProducto(null);
    }
  };

  const venderProducto = async () => {
    if (!producto || cantidad <= 0) return;
    try {
      const token = localStorage.getItem("token");
      console.log("🔍 Token enviado desde frontend:", token);
      if (!token) {
        mostrarAlerta("No hay token guardado. Inicia sesión nuevamente.", "error");
        return;
      }
      const response = await fetch("http://localhost:5000/api/productos/actualizar-stock", {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ id: producto.id, cantidadVendida: cantidad }),
      });
      if (!response.ok) throw new Error("Error al actualizar el stock");
      const data = await response.json();
      mostrarAlerta(`Venta realizada. Nuevo stock: ${data.nuevoStock}`, "success");
      setProducto(null);
      setCodigo("");
      setCantidad(1);
    } catch (error) {
      mostrarAlerta(error.message, "error");
    }
  };

  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen bg-gray-50 text-gray-900">
      <h1 className="text-4xl font-bold mb-8 text-red-600">Caja</h1>

      <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-md rounded-lg p-6">
        <label htmlFor="qrInput" className="block text-lg font-medium text-gray-700 mb-2">
          Escanea o introduce el código de barras/QR:
        </label>
        <input
          type="text"
          id="qrInput"
          value={codigo}
          onChange={(e) => setCodigo(e.target.value)}
          placeholder="Ingresa el código..."
          className="w-full p-3 border rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500"
        />
        <button
          onClick={buscarProducto}
          className="w-full mt-4 bg-red-500 text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-red-600 transition-colors"
        >
          Buscar Producto
        </button>
      </div>

      {producto && (
        <div className="absolute top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-4/5 md:w-1/2 lg:w-1/3 bg-white shadow-lg rounded-lg p-6 relative">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">{producto.nombre}</h2>
            {producto.imagen ? (
              <img src={producto.imagen} alt={producto.nombre} className="w-32 h-32 object-cover mb-4 mx-auto" />
            ) : (
              <div className="w-32 h-32 bg-gray-200 flex items-center justify-center text-sm text-gray-500 mb-4 mx-auto">
                Sin imagen
              </div>
            )}
            <p className="text-gray-700 mb-2">{producto.descripcion}</p>
            <p className="text-gray-700 mb-2">Precio: ${producto.precio}</p>
            <p className="text-gray-700 mb-4">Stock: {producto.stock}</p>

            {!producto.venderMode && (
              <div className="flex justify-between">
                <button
                  onClick={() => setProducto({ ...producto, venderMode: true })}
                  className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                >
                  Vender
                </button>
                <button
                  onClick={() => {
                    setProducto(null);
                    setCodigo("");
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Cancelar
                </button>
              </div>
            )}

            {producto.venderMode && (
              <div className="mt-4">
                <label className="block text-lg font-medium text-gray-700 mb-2">
                  Cantidad a vender:
                </label>
                <input
                  type="number"
                  min="1"
                  max={producto.stock}
                  value={cantidad}
                  onChange={(e) => setCantidad(Number(e.target.value))}
                  className="w-full p-2 border rounded mb-4"
                />
                <div className="flex justify-between">
                  <button
                    onClick={venderProducto}
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition"
                  >
                    Confirmar Venta
                  </button>
                  <button
                    onClick={() => setProducto({ ...producto, venderMode: false })}
                    className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
                  >
                    Volver
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {alerta && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white ${
            alerta.tipo === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {alerta.mensaje}
        </div>
      )}
    </div>
  );
};

export default Caja;
