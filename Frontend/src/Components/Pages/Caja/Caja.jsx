import React, { useState } from "react";
import { useAuth } from "../../../Context/AuthContext"; // Asegúrate de tu ruta real

const Caja = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === "admin";

  const [codigo, setCodigo] = useState("");
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  const [alerta, setAlerta] = useState(null);

  // Nuevo estado para la confirmación de venta
  const [confirmarVenta, setConfirmarVenta] = useState(null);

  const mostrarAlerta = (mensaje, tipo = "error") => {
    setAlerta({ mensaje, tipo });
    setTimeout(() => setAlerta(null), 3000);
  };

  const buscarProducto = async () => {
    if (!codigo.trim()) return;
    try {
      let token = localStorage.getItem("token");
      if (token) {
        // Ocultar parte del token en los logs
        console.log(
          "🔍 Token enviado desde frontend:",
          token.slice(0, 4) + "...(hidden)"
        );
      } else {
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

  // Solicitar confirmación antes de vender
  const solicitarConfirmacionVenta = () => {
    if (!producto || cantidad <= 0) return;
    setConfirmarVenta({
      mensaje: `¿Deseas vender ${cantidad} unidades de "${producto.nombre}"?`,
      onConfirm: venderProducto
    });
  };

  const venderProducto = async () => {
    // Cerrar la ventana de confirmación
    setConfirmarVenta(null);

    if (!producto || cantidad <= 0) return;
    try {
      let token = localStorage.getItem("token");
      if (token) {
        console.log(
          "🔍 Token enviado desde frontend:",
          token.slice(0, 4) + "...(hidden)"
        );
      } else {
        mostrarAlerta("No hay token guardado. Inicia sesión nuevamente.", "error");
        return;
      }

      const response = await fetch("http://localhost:5000/api/productos/actualizar-stock", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        // Se envía 'cantidadVendida' en lugar de 'stock'
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
    <div className=" mt-20 min-h-screen bg-gray-100 flex flex-col items-center py-10 px-4 text-gray-900 relative">
      {/* ENCABEZADO */}
      <div className="mt-16  w-full max-w-4xl bg-red-600 text-white rounded-xl shadow-lg p-6 mb-8 animate-fadeIn">
        <h1 className="text-3xl font-extrabold mb-2">Caja - TIC Americas</h1>
        <p className="text-sm font-medium">
          Escanea el código de barras o QR para ver la información del producto.
        </p>
      </div>

      {/* CUERPO PRINCIPAL */}
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-6 animate-fadeIn">
        <label htmlFor="qrInput" className="block text-lg font-medium text-gray-700 mb-2">
          Escanea o introduce el código de barras/QR:
        </label>
        <div className="flex items-center gap-2">
          <input
            type="text"
            id="qrInput"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            placeholder="Ingresa el código..."
            className="flex-1 p-3 border-2 border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring focus:ring-red-500"
          />
          <button
            onClick={buscarProducto}
            className="bg-black text-white font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-gray-800 transition-colors"
          >
            Buscar
          </button>
        </div>
      </div>

      {/* MODAL DE PRODUCTO */}
      {producto && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 animate-fadeIn">
          <div className="w-11/12 max-w-md bg-white shadow-2xl rounded-lg p-6 relative transform hover:scale-105 transition duration-300">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">{producto.nombre}</h2>
            {producto.imagen ? (
              <img
                src={producto.imagen}
                alt={producto.nombre}
                className="w-40 h-40 object-cover mb-4 mx-auto rounded-lg"
              />
            ) : (
              <div className="w-40 h-40 bg-gray-200 flex items-center justify-center text-sm text-gray-500 mb-4 mx-auto rounded-lg">
                Sin imagen
              </div>
            )}
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Descripción:</span> {producto.descripcion}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-semibold">Precio:</span> ${producto.precio}
            </p>
            <p className="text-gray-700 mb-4">
              <span className="font-semibold">Stock:</span> {producto.stock}
            </p>

            {/* Opciones de venta solo para ADMIN */}
            {isAdmin ? (
              <>
                {!producto.venderMode && (
                  <div className="flex justify-between">
                    <button
                      onClick={() => setProducto({ ...producto, venderMode: true })}
                      className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
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
                      Cerrar
                    </button>
                  </div>
                )}

                {producto.venderMode && (
                  <div className="mt-4">
                    <label className="block text-lg font-semibold text-gray-700 mb-2">
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
                        onClick={solicitarConfirmacionVenta}
                        className="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition"
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
              </>
            ) : (
              /* Para usuario normal, sin edición */
              <div className="mt-6 flex justify-end">
                <button
                  onClick={() => {
                    setProducto(null);
                    setCodigo("");
                  }}
                  className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
                >
                  Cerrar
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ALERTA con z-veryHigh */}
      {alerta && (
        <div
          className={`fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg text-white z-[999999] transition-transform animate-fadeIn ${
            alerta.tipo === "error" ? "bg-red-600" : "bg-green-600"
          }`}
        >
          {alerta.mensaje}
        </div>
      )}

      {/* MODAL DE CONFIRMACIÓN DE VENTA (encima de todo) */}
      {confirmarVenta && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-[999999] animate-fadeIn">
          <div className="bg-white w-80 rounded-lg p-6 text-center shadow-2xl">
            <h3 className="text-xl font-bold text-red-700 mb-4">Confirmar Venta</h3>
            <p className="text-gray-800 mb-6">{confirmarVenta.mensaje}</p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => setConfirmarVenta(null)}
                className="bg-gray-500 text-white py-2 px-4 rounded-lg hover:bg-gray-600 transition"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  confirmarVenta.onConfirm();
                }}
                className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800 transition"
              >
                Aceptar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Caja;

