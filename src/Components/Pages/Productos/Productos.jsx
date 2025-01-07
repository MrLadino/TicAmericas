import React, { useState } from 'react';

const Productos = () => {
  const [productos, setProductos] = useState([
    { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/150', precio: 100, categoria: 'General' },
    { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/150', precio: 200, categoria: 'General' },
  ]);

  const [categorias, setCategorias] = useState(['General', 'Electrónica', 'Ropa', 'Comida']);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('General');
  const [nuevoProducto, setNuevoProducto] = useState({ nombre: '', descripcion: '', imagen: '', precio: '', categoria: '' });
  const [imagenLocal, setImagenLocal] = useState(null);

  const productosFiltrados = productos.filter((producto) => producto.categoria === categoriaSeleccionada);

  const agregarProducto = () => {
    const nuevaImagen = imagenLocal
      ? URL.createObjectURL(imagenLocal)
      : 'https://via.placeholder.com/150';

    setProductos([
      ...productos,
      {
        id: productos.length + 1,
        nombre: nuevoProducto.nombre,
        descripcion: nuevoProducto.descripcion,
        imagen: nuevaImagen,
        precio: parseFloat(nuevoProducto.precio) || 0,
        categoria: nuevoProducto.categoria || categoriaSeleccionada,
      },
    ]);
    setNuevoProducto({ nombre: '', descripcion: '', imagen: '', precio: '', categoria: '' });
    setImagenLocal(null);
  };

  const agregarCategoria = () => {
    const nuevaCategoria = prompt('Ingrese el nombre de la nueva categoría');
    if (nuevaCategoria && !categorias.includes(nuevaCategoria)) {
      setCategorias([...categorias, nuevaCategoria]);
    }
  };

  return (
    <div className="container mx-auto p-6">
      {/* Barra de categorías */}
      <div className="flex space-x-4 mb-4 bg-gray-100 p-4 rounded-md shadow-md">
        {categorias.map((categoria) => (
          <button
            key={categoria}
            onClick={() => setCategoriaSeleccionada(categoria)}
            className={`py-2 px-4 rounded-md ${
              categoria === categoriaSeleccionada
                ? 'bg-red-600 text-white'
                : 'bg-gray-200 text-gray-800 hover:bg-red-200'
            }`}
          >
            {categoria}
          </button>
        ))}
      </div>

      {/* Tabla de productos */}
      <div className="overflow-x-auto">
        <table className="min-w-full border-collapse border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border border-gray-300 px-4 py-2 text-left">Imagen</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Nombre</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Descripción</th>
              <th className="border border-gray-300 px-4 py-2 text-left">Precio</th>
            </tr>
          </thead>
          <tbody>
            {productosFiltrados.map((producto) => (
              <tr key={producto.id} className="hover:bg-gray-100">
                <td className="border border-gray-300 px-4 py-2">
                  <img src={producto.imagen} alt={producto.nombre} className="w-16 h-16 object-cover rounded-md" />
                </td>
                <td className="border border-gray-300 px-4 py-2">{producto.nombre}</td>
                <td className="border border-gray-300 px-4 py-2">{producto.descripcion}</td>
                <td className="border border-gray-300 px-4 py-2">${producto.precio.toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Botón flotante para agregar categorías */}
      <button
        onClick={agregarCategoria}
        className="fixed bottom-6 right-6 bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700"
      >
        +
      </button>

      {/* Formulario de agregar producto */}
      <div className="mt-6 p-4 border border-gray-200 rounded-md shadow-md">
        <h3 className="text-xl font-semibold mb-4">Agregar Producto</h3>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nuevoProducto.nombre}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, nombre: e.target.value })}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <textarea
          placeholder="Descripción del producto"
          value={nuevoProducto.descripcion}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, descripcion: e.target.value })}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <input
          type="number"
          placeholder="Precio"
          value={nuevoProducto.precio}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, precio: e.target.value })}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <select
          value={nuevoProducto.categoria}
          onChange={(e) => setNuevoProducto({ ...nuevoProducto, categoria: e.target.value })}
          className="w-full mb-3 p-2 border rounded-md"
        >
          <option value="">Seleccionar Categoría</option>
          {categorias.map((categoria) => (
            <option key={categoria} value={categoria}>
              {categoria}
            </option>
          ))}
        </select>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagenLocal(e.target.files[0])}
          className="w-full mb-3 p-2 border rounded-md"
        />
        <button
          onClick={agregarProducto}
          className="bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700"
        >
          Agregar Producto
        </button>
      </div>
    </div>
  );
};

export default Productos;
