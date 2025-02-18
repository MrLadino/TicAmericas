import React, { useState, useEffect } from 'react';
import {
  filtrarProductosPorCategoria,
  filtrarProductosPorEstado,
  filtrarProductosPorNombre,
  agregarProducto,
  agregarCategoria,
  editarCategoriaYActualizarProductos,
  eliminarProducto,
  toggleEstadoProducto,
} from './PdtsLogica';

const Productos = () => {
  // Estado inicial sin productos ni categorías; se cargarán desde el backend
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [estadoFiltro, setEstadoFiltro] = useState("activos"); // "activos" o "inactivos"

  // Estados para modales / formularios
  const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
  const [tipoEdicion, setTipoEdicion] = useState(''); // 'agregar' o 'editar'
  const [productoEditar, setProductoEditar] = useState(null);
  const [categoriaEditar, setCategoriaEditar] = useState('');

  // Notificaciones estilizadas
  const [notificacion, setNotificacion] = useState(null);
  const mostrarNotificacion = (mensaje, tipo = 'info') => {
    setNotificacion({ mensaje, tipo });
    setTimeout(() => setNotificacion(null), 3000);
  };

  // Confirmación para eliminar producto
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [productoAEliminar, setProductoAEliminar] = useState(null);
  // Confirmación para eliminar categoría
  const [showConfirmDeleteCat, setShowConfirmDeleteCat] = useState(false);
  const [categoriaAEliminar, setCategoriaAEliminar] = useState(null);

  // =====================================================
  //        CARGA INICIAL DESDE EL BACKEND
  // =====================================================
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) return;
    // Obtener productos (endpoint: /api/productos)
    fetch("http://localhost:5000/api/productos", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        setProductos(data);
      })
      .catch((err) => console.error("Error fetching productos:", err));

    // Obtener categorías (endpoint: /api/advertising)
    fetch("http://localhost:5000/api/advertising", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        // data: arreglo de categorías con estructura { category_id, name, ... }
        const cats = data.map((cat) => ({
          id: cat.category_id,
          name: cat.name,
        }));
        setCategorias(cats);
        if (cats.length > 0) {
          setCategoriaSeleccionada(cats[0].name);
        } else {
          setCategoriaSeleccionada('');
        }
      })
      .catch((err) => console.error("Error fetching categorias:", err));
  }, []);

  // =====================================================
  //       FILTRADO DE PRODUCTOS
  // =====================================================
  const productosFiltrados = filtrarProductosPorCategoria(productos, categoriaSeleccionada);
  const productosFiltradosEstado = filtrarProductosPorEstado(productosFiltrados, estadoFiltro);
  const productosCoincidentes = filtrarProductosPorNombre(productosFiltradosEstado, busqueda);

  // =====================================================
  //       FUNCIONES DE PRODUCTOS (SIMULADAS)
  // =====================================================
  const agregarNuevoProducto = (nuevoProducto) => {
    if (!nuevoProducto.nombre.trim() || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
      mostrarNotificacion('Completa todos los campos correctamente. [Tic America]', 'error');
      return;
    }
    setProductos(agregarProducto(productos, nuevoProducto));
    setMostrarModalEditar(false);
    mostrarNotificacion('Producto agregado correctamente. [Tic America]', 'success');
  };

  const manejarGuardarCambiosProducto = (productoActualizado) => {
    if (!productoActualizado.nombre.trim() || isNaN(productoActualizado.precio) || productoActualizado.precio <= 0) {
      mostrarNotificacion('Completa todos los campos correctamente. [Tic America]', 'error');
      return;
    }
    setProductos(productos.map((p) =>
      p.id === productoActualizado.id ? productoActualizado : p
    ));
    setMostrarModalEditar(false);
    mostrarNotificacion('Producto actualizado correctamente. [Tic America]', 'success');
  };

  const handleEliminarProducto = (id) => {
    setShowConfirmDelete(true);
    setProductoAEliminar(id);
  };

  const confirmarEliminarProducto = () => {
    setProductos(eliminarProducto(productos, productoAEliminar));
    mostrarNotificacion('Producto eliminado correctamente. [Tic America]', 'success');
    setShowConfirmDelete(false);
    setProductoAEliminar(null);
  };

  const cancelarEliminarProducto = () => {
    setShowConfirmDelete(false);
    setProductoAEliminar(null);
  };

  const toggleProductoEstado = (id) => {
    setProductos(toggleEstadoProducto(productos, id));
    mostrarNotificacion('Estado del producto actualizado. [Tic America]', 'info');
  };

  // =====================================================
  //       FUNCIONES DE CATEGORÍAS (SIMULADAS)
  // =====================================================
  const agregarNuevaCategoria = (nuevaCategoria) => {
    if (!nuevaCategoria.trim()) {
      mostrarNotificacion('La categoría no puede estar vacía. [Tic America]', 'error');
      return;
    }
    if (categorias.some((c) => c.name === nuevaCategoria.trim())) {
      mostrarNotificacion('La categoría ya existe. [Tic America]', 'error');
      return;
    }
    const nuevaCatObj = {
      id: Date.now().toString().slice(-5),
      name: nuevaCategoria.trim(),
    };
    setCategorias([...categorias, nuevaCatObj]);
    setMostrarModalEditar(false);
    mostrarNotificacion('Categoría agregada correctamente. [Tic America]', 'success');
  };

  const editarCategoriaSeleccionada = () => {
    if (!categoriaEditar.trim()) {
      mostrarNotificacion('El nombre de la categoría no puede estar vacío. [Tic America]', 'error');
      return;
    }
    const catOriginal = categorias.find((c) => c.name === categoriaSeleccionada);
    if (!catOriginal) {
      mostrarNotificacion('No se encontró la categoría a editar. [Tic America]', 'error');
      return;
    }
    if (categorias.some((c) => c.name === categoriaEditar.trim() && c.id !== catOriginal.id)) {
      mostrarNotificacion('Ya existe una categoría con ese nombre. [Tic America]', 'error');
      return;
    }
    const catActualizada = { ...catOriginal, name: categoriaEditar.trim() };
    const nuevasCategorias = categorias.map((c) =>
      c.id === catOriginal.id ? catActualizada : c
    );
    // Actualizamos los productos que usan esta categoría
    const { productosActualizados, categoriasActualizadas } = editarCategoriaYActualizarProductos(
      productos,
      nuevasCategorias,
      categoriaSeleccionada,
      catActualizada.name
    );
    setProductos(productosActualizados);
    setCategorias(categoriasActualizadas);
    setCategoriaSeleccionada(catActualizada.name);
    setMostrarModalEditar(false);
    mostrarNotificacion('Categoría editada correctamente. [Tic America]', 'success');
  };

  const handleEliminarCategoria = () => {
    if (!categoriaSeleccionada) {
      mostrarNotificacion('No hay categoría seleccionada para eliminar. [Tic America]', 'error');
      return;
    }
    const catObj = categorias.find((c) => c.name === categoriaSeleccionada);
    if (!catObj) {
      mostrarNotificacion('Categoría no encontrada. [Tic America]', 'error');
      return;
    }
    setCategoriaAEliminar(catObj);
    setShowConfirmDeleteCat(true);
  };

  const confirmarEliminarCategoria = () => {
    const nuevas = categorias.filter((c) => c.id !== categoriaAEliminar.id);
    setCategorias(nuevas);
    // Actualizar los productos que tenían esa categoría: asignar cadena vacía
    const prodSinCat = productos.map((p) =>
      p.categoria === categoriaAEliminar.name ? { ...p, categoria: '' } : p
    );
    setProductos(prodSinCat);
    mostrarNotificacion('Categoría eliminada correctamente. [Tic America]', 'success');
    setShowConfirmDeleteCat(false);
    setCategoriaAEliminar(null);
    setCategoriaSeleccionada(nuevas.length > 0 ? nuevas[0].name : '');
  };

  const cancelarEliminarCategoria = () => {
    setShowConfirmDeleteCat(false);
    setCategoriaAEliminar(null);
  };

  // =====================================================
  //       MANEJO DE FORMULARIOS / UI
  // =====================================================
  const manejarBusqueda = (e) => setBusqueda(e.target.value);

  const abrirModalProducto = (tipo, producto = null) => {
    setTipoEdicion(tipo);
    setProductoEditar(
      producto || {
        id: Date.now().toString().slice(-5),
        sku: '',
        nombre: '',
        descripcion: '',
        imagen: '',
        precio: 0,
        categoria: categoriaSeleccionada || '',
        activo: true,
      }
    );
    setCategoriaEditar('');
    setMostrarModalEditar(true);
  };

  const abrirModalCategoria = (tipo, categoriaName = '') => {
    setTipoEdicion(tipo);
    setProductoEditar(null);
    setCategoriaEditar(tipo === 'editar' ? categoriaName : '');
    setMostrarModalEditar(true);
  };

  // =====================================================
  //                    RENDER
  // =====================================================
  return (
    <div className="mt-20 min-h-screen p-8 bg-white">
      {/* Notificación flotante */}
      {notificacion && (
        <div
          className={`fixed top-4 right-4 p-4 rounded shadow-xl border z-50 transition-all
            ${
              notificacion.tipo === 'success'
                ? 'bg-white border-red-600 text-red-800'
                : notificacion.tipo === 'error'
                ? 'bg-red-100 border-red-800 text-red-900'
                : 'bg-gray-100 border-red-400 text-red-800'
            }
          `}
        >
          {notificacion.mensaje}
        </div>
      )}

      {/* Modal de confirmación para eliminar producto */}
      {showConfirmDelete && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              ¿Estás seguro de eliminar este producto?
            </h2>
            <div className="flex justify-around mt-6">
              <button
                onClick={confirmarEliminarProducto}
                className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-red-800"
              >
                Sí, eliminar
              </button>
              <button
                onClick={cancelarEliminarProducto}
                className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de confirmación para eliminar categoría */}
      {showConfirmDeleteCat && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-80 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center text-gray-800">
              ¿Estás seguro de eliminar esta categoría?
            </h2>
            <div className="flex justify-around mt-6">
              <button
                onClick={confirmarEliminarCategoria}
                className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-red-800"
              >
                Sí, eliminar
              </button>
              <button
                onClick={cancelarEliminarCategoria}
                className="bg-gray-300 text-black py-2 px-6 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Encabezado - Categorías */}
      <div className="mb-8 bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-700">
        <div className="flex flex-col lg:flex-row items-center justify-around space-y-4 lg:space-y-0 lg:space-x-6">
          {categorias.length === 0 ? (
            <p className="text-gray-500 italic">Sin categorías</p>
          ) : (
            <select
              value={categoriaSeleccionada}
              onChange={(e) => setCategoriaSeleccionada(e.target.value)}
              className="p-3 border rounded bg-gray-100 text-red-800 w-52"
            >
              <option value="">-- Selecciona Categoría --</option>
              {categorias.map((cat) => (
                <option key={cat.id} value={cat.name}>
                  {cat.name}
                </option>
              ))}
            </select>
          )}
          <div className="flex space-x-2">
            <button
              onClick={() => abrirModalCategoria('agregar')}
              className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-red-800 text-sm"
            >
              Agregar categoría
            </button>
            <button
              onClick={() => abrirModalCategoria('editar', categoriaSeleccionada)}
              className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-900 text-sm"
            >
              Editar categoría
            </button>
            <button
              onClick={handleEliminarCategoria}
              className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 text-sm"
            >
              Eliminar categoría
            </button>
          </div>
        </div>
      </div>

      {/* Barra de búsqueda y botón de agregar producto */}
      <div className="flex flex-col items-center justify-between mb-8 bg-white p-6 rounded-xl shadow-lg border-t-4 border-red-700">
        <div className="relative w-full md:w-3/4 lg:w-1/2 mb-4">
          <input
            type="text"
            value={busqueda}
            onChange={manejarBusqueda}
            placeholder="Buscar producto"
            className="p-3 border rounded w-full text-red-800 focus:outline-none focus:ring-2 focus:ring-red-500"
          />
        </div>
        <div className="flex justify-center mb-4">
          <button
            onClick={() => abrirModalProducto('agregar')}
            className="bg-red-700 text-white py-2 px-6 rounded-lg hover:bg-red-800 text-sm"
          >
            Agregar producto
          </button>
        </div>
        <p className="text-red-800 font-semibold">
          Mostrando productos {estadoFiltro.toUpperCase()}
        </p>
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto shadow-xl rounded-lg">
        <table className="min-w-full border-collapse bg-white rounded-lg">
          <thead className="bg-red-800 text-white">
            <tr>
              <th className="px-4 py-3 text-left">ID</th>
              <th className="px-4 py-3 text-left">SKU</th>
              <th className="px-4 py-3 text-left">Imagen</th>
              <th className="px-4 py-3 text-left">Nombre</th>
              <th className="px-4 py-3 text-left">Descripción</th>
              <th className="px-4 py-3 text-left">Precio</th>
              <th className="px-4 py-3 text-left">Estado</th>
              <th className="px-4 py-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {productosCoincidentes.map((producto) => (
              <tr
                key={producto.id}
                className={`transition-colors ${
                  producto.activo
                    ? 'bg-white hover:bg-gray-50'
                    : 'bg-gray-300 opacity-70'
                }`}
              >
                <td className="px-4 py-3">{producto.id}</td>
                <td className="px-4 py-3">{producto.sku}</td>
                <td className="px-4 py-3">
                  {producto.imagen ? (
                    <img
                      src={producto.imagen}
                      alt={producto.nombre}
                      className="w-12 h-12 object-cover rounded-md"
                    />
                  ) : (
                    <div className="w-12 h-12 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs">
                      Sin Imagen
                    </div>
                  )}
                </td>
                <td className="px-4 py-3">{producto.nombre}</td>
                <td className="px-4 py-3">{producto.descripcion}</td>
                <td className="px-4 py-3">${producto.precio.toFixed(2)}</td>
                <td className="px-4 py-3">
                  <button
                    onClick={() => toggleProductoEstado(producto.id)}
                    className={`py-1 px-3 rounded text-xs text-white transition-colors ${
                      producto.activo
                        ? 'bg-green-600 hover:bg-green-700'
                        : 'bg-gray-600 hover:bg-gray-700'
                    }`}
                  >
                    {producto.activo ? 'Activo' : 'Inactivo'}
                  </button>
                </td>
                <td className="px-4 py-3 text-center">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => {
                        setTipoEdicion('editar');
                        setProductoEditar(producto);
                        setMostrarModalEditar(true);
                      }}
                      className="bg-black text-white py-1 px-4 rounded hover:bg-gray-900 text-xs"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleEliminarProducto(producto.id)}
                      className="bg-red-600 text-white py-1 px-4 rounded hover:bg-red-700 text-xs"
                    >
                      Eliminar
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {productosCoincidentes.length === 0 && (
              <tr>
                <td colSpan={8} className="px-4 py-3 text-center text-gray-500">
                  No hay productos que coincidan con los filtros.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal de edición (producto o categoría) */}
      {mostrarModalEditar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl w-96 shadow-2xl overflow-y-auto max-h-[90vh]">
            <h3 className="text-2xl font-semibold mb-4">
              {tipoEdicion === 'agregar' ? 'Agregar' : 'Editar'} {productoEditar ? 'Producto' : 'Categoría'}
            </h3>
            {productoEditar ? (
              <>
                <label className="block mb-2 text-sm font-semibold text-black">
                  Nombre del producto
                </label>
                <input
                  type="text"
                  value={productoEditar.nombre}
                  onChange={(e) =>
                    setProductoEditar({ ...productoEditar, nombre: e.target.value })
                  }
                  className="p-3 border mb-4 w-full rounded"
                />
                <label className="block mb-2 text-sm font-semibold text-black">
                  Descripción
                </label>
                <input
                  type="text"
                  value={productoEditar.descripcion}
                  onChange={(e) =>
                    setProductoEditar({ ...productoEditar, descripcion: e.target.value })
                  }
                  className="p-3 border mb-4 w-full rounded"
                />
                <label className="block mb-2 text-sm font-semibold text-black">
                  Precio
                </label>
                <input
                  type="number"
                  value={productoEditar.precio}
                  onChange={(e) =>
                    setProductoEditar({
                      ...productoEditar,
                      precio: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="p-3 border mb-4 w-full rounded"
                />
                <label className="block mb-2 text-sm font-semibold text-black">
                  SKU (máx. 5 caracteres)
                </label>
                <input
                  type="text"
                  value={productoEditar.sku}
                  onChange={(e) =>
                    setProductoEditar({
                      ...productoEditar,
                      sku: e.target.value.substring(0, 5),
                    })
                  }
                  maxLength={5}
                  className="p-3 border mb-4 w-full rounded"
                />
                <label className="block mb-2 text-sm font-semibold text-black">
                  Imagen (opcional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files[0];
                    if (file) {
                      const reader = new FileReader();
                      reader.onloadend = () =>
                        setProductoEditar({ ...productoEditar, imagen: reader.result });
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="p-3 border mb-4 w-full rounded"
                />
                {productoEditar.imagen && (
                  <img
                    src={productoEditar.imagen}
                    alt="Vista previa"
                    className="w-32 h-32 object-cover mt-2 mx-auto rounded"
                  />
                )}
                <div className="flex items-center mb-4">
                  <input
                    type="checkbox"
                    checked={productoEditar.activo}
                    onChange={(e) =>
                      setProductoEditar({ ...productoEditar, activo: e.target.checked })
                    }
                    className="h-4 w-4 text-red-600"
                  />
                  <label className="ml-2 text-sm text-black">
                    Producto Activo
                  </label>
                </div>
              </>
            ) : (
              <>
                <label className="block mb-2 text-sm font-semibold text-black">
                  Nombre de la categoría
                </label>
                <input
                  type="text"
                  value={categoriaEditar}
                  onChange={(e) => setCategoriaEditar(e.target.value)}
                  className="p-3 border mb-4 w-full rounded"
                />
              </>
            )}
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setMostrarModalEditar(false)}
                className="bg-gray-500 text-black py-2 px-4 rounded-lg hover:bg-gray-600"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  if (tipoEdicion === 'agregar') {
                    if (productoEditar) {
                      agregarNuevoProducto(productoEditar);
                    } else {
                      agregarNuevaCategoria(categoriaEditar);
                    }
                  } else {
                    if (productoEditar) {
                      manejarGuardarCambiosProducto(productoEditar);
                    } else {
                      editarCategoriaSeleccionada();
                    }
                  }
                }}
                className="bg-red-700 text-white py-2 px-4 rounded-lg hover:bg-red-800"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Productos;
