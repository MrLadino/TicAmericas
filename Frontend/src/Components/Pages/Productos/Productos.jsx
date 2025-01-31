import { useState } from 'react';
import {
    filtrarProductosPorCategoria,
    agregarProducto,
    agregarCategoria,
    editarCategoriaYActualizarProductos,
    eliminarProducto,
} from './PdtsLogica';

const Productos = () => {
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/150', precio: 100, categoria: 'General' },
        { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/150', precio: 200, categoria: 'General' },
    ]);

    const [categorias, setCategorias] = useState(['General', 'Electrónica', 'Ropa', 'Comida']);
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('General');
    const [busqueda, setBusqueda] = useState('');
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);
    const [tipoEdicion, setTipoEdicion] = useState('');
    const [productoEditar, setProductoEditar] = useState(null);
    const [categoriaEditar, setCategoriaEditar] = useState('');

    const productosFiltrados = filtrarProductosPorCategoria(productos, categoriaSeleccionada);
    const productosCoincidentes = productosFiltrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    const agregarNuevoProducto = (nuevoProducto) => {
        if (!nuevoProducto.nombre.trim() || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }
        setProductos(agregarProducto(productos, nuevoProducto));
        setMostrarModalEditar(false);
    };

    const manejarGuardarCambiosProducto = (productoActualizado) => {
        if (!productoActualizado.nombre.trim() || isNaN(productoActualizado.precio) || productoActualizado.precio <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }
        const productosActualizados = productos.map((producto) =>
            producto.id === productoActualizado.id ? productoActualizado : producto
        );
        setProductos(productosActualizados);
        setMostrarModalEditar(false);
    };

    const agregarNuevaCategoria = (nuevaCategoria) => {
        if (!nuevaCategoria.trim()) {
            alert('La categoría no puede estar vacía.');
            return;
        }
        if (categorias.includes(nuevaCategoria.trim())) {
            alert('La categoría ya existe.');
            return;
        }
        setCategorias(agregarCategoria(categorias, nuevaCategoria));
        setMostrarModalEditar(false);
    };

    const editarCategoriaSeleccionada = () => {
        if (!categoriaEditar.trim()) {
            alert('El nombre de la categoría no puede estar vacío.');
            return;
        }
        if (categorias.includes(categoriaEditar.trim())) {
            alert('Ya existe una categoría con ese nombre.');
            return;
        }
        const { productosActualizados, categoriasActualizadas } = editarCategoriaYActualizarProductos(
            productos,
            categorias,
            categoriaSeleccionada,
            categoriaEditar
        );
        setProductos(productosActualizados);
        setCategorias(categoriasActualizadas);
        setCategoriaSeleccionada(categoriaEditar);
        setMostrarModalEditar(false);
    };

    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    const abrirModalProducto = (tipo, producto = null) => {
        setTipoEdicion(tipo);
        setProductoEditar(
            producto || { id: Date.now(), nombre: '', descripcion: '', imagen: '', precio: '', categoria: categoriaSeleccionada }
        );
        setCategoriaEditar('');
        setMostrarModalEditar(true);
    };

    const abrirModalCategoria = (tipo, categoria = '') => {
        setTipoEdicion(tipo);
        setCategoriaEditar(categoria);
        setProductoEditar(null);
        setMostrarModalEditar(true);
    };

    const eliminarProductoSeleccionado = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            setProductos(eliminarProducto(productos, id));
        }
    };

    return (
        <div className="container mx-auto p-8">
        {/* Categoría */}
        <div className="mb-8 bg-gray-200 p-6 rounded-xl shadow-lg border-t-4 border-red-800">
            <div className="flex flex-col items-center space-y-4">
                <div className="flex space-x-6 items-center w-full justify-center">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="p-3 border rounded-lg bg-gray-50 text-gray-700"
                    >
                        {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                </div>
                <div className="flex justify-center space-x-4 mb-4">
                    <button
                        onClick={() => abrirModalCategoria('agregar')}
                        className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 text-sm w-full max-w-xs"
                    >
                        Agregar categoría
                    </button>
                    <button
                        onClick={() => abrirModalCategoria('editar', categoriaSeleccionada)}
                        className="bg-black text-white py-2 px-6 rounded-lg hover:bg-gray-800 text-sm w-full max-w-xs"
                    >
                        Editar categoría
                    </button>
                </div>
            </div>
        </div>

        {/* Barra de búsqueda y botón de agregar producto */}
        <div className="flex flex-col items-center justify-between mb-8 bg-gray-200 p-6 rounded-xl shadow-lg border-t-4 border-red-800">
            {/* Barra de búsqueda */}
            <div className="relative w-full md:w-3/4 lg:w-1/2 mb-4">
                <input
                    type="text"
                    value={busqueda}
                    onChange={manejarBusqueda}
                    placeholder="Buscar producto"
                    className="p-3 border rounded-lg w-full text-gray-700"
                />
            </div>

            {/* Botón de agregar producto */}
            <div className="flex justify-center mb-4">
                <button
                    onClick={() => abrirModalProducto('agregar')}
                    className="bg-red-600 text-white py-2 px-6 rounded-lg hover:bg-red-700 text-sm w-full max-w-xs"
                >
                    Agregar producto
                </button>
            </div>
        </div>

        {/* Tabla de productos */}
        <div className="overflow-x-auto">
            <table className="min-w-full border-collapse border border-gray-300 bg-white rounded-lg shadow-md">
                <thead className="bg-gray-400">
                    <tr>
                        <th className="border border-gray-300 px-4 py-3 text-left">ID</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Imagen</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Nombre</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Descripción</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Precio</th>
                        <th className="border border-gray-300 px-4 py-3 text-left">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    {productosCoincidentes.map((producto) => (
                        <tr key={producto.id} className="hover:bg-gray-50">
                            <td className="border border-gray-300 px-4 py-3">{producto.id}</td>
                            <td className="border border-gray-300 px-4 py-3">
                                <img src={producto.imagen} alt={producto.nombre} className="w-12 h-12 object-cover rounded-md" />
                            </td>
                            <td className="border border-gray-300 px-4 py-3">{producto.nombre}</td>
                            <td className="border border-gray-300 px-4 py-3">{producto.descripcion}</td>
                            <td className="border border-gray-300 px-4 py-3">${producto.precio.toFixed(2)}</td>
                            <td className="border border-gray-300 px-4 py-3 text-center">
                                <div className="flex justify-center space-x-2">
                                    <button
                                        onClick={() => abrirModalProducto('editar', producto)}
                                        className="bg-black text-white py-1 px-4 rounded-md hover:bg-gray-800 text-xs"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarProductoSeleccionado(producto.id)}
                                        className="bg-red-600 text-white py-1 px-4 rounded-md hover:bg-red-700 text-xs"
                                    >
                                        Eliminar
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Modal de edición Posdata: agregar scroll para evitar desbordamientos*/}
        {mostrarModalEditar && (
            <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                <div className="bg-white p-6 rounded-xl w-96 shadow-lg">
                    <h3 className="text-2xl font-semibold mb-4">
                        {tipoEdicion === 'agregar' ? 'Agregar' : 'Editar'} {productoEditar ? 'Producto' : 'Categoría'}
                    </h3>
                    {productoEditar ? (
                        <>
                            <input
                                type="text"
                                value={productoEditar.nombre}
                                onChange={(e) => setProductoEditar({ ...productoEditar, nombre: e.target.value })}
                                placeholder="Nombre"
                                className="p-3 border mb-4 w-full"
                            />
                            <input
                                type="text"
                                value={productoEditar.descripcion}
                                onChange={(e) => setProductoEditar({ ...productoEditar, descripcion: e.target.value })}
                                placeholder="Descripción"
                                className="p-3 border mb-4 w-full"
                            />
                            <input
                                type="number"
                                value={productoEditar.precio}
                                onChange={(e) => setProductoEditar({ ...productoEditar, precio: parseFloat(e.target.value) })}
                                placeholder="Precio"
                                className="p-3 border mb-4 w-full"
                            />
                            <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => {
                                    const file = e.target.files[0];
                                    if (file) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setProductoEditar({ ...productoEditar, imagen: reader.result });
                                        };
                                        reader.readAsDataURL(file);
                                    }
                                }}
                                className="p-3 border mb-4 w-full"
                            />
                            {productoEditar.imagen && (
                                <img src={productoEditar.imagen} alt="Vista previa" className="w-32 h-32 object-cover mt-4" />
                            )}
                        </>
                    ) : (
                        <input
                            type="text"
                            value={categoriaEditar}
                            onChange={(e) => setCategoriaEditar(e.target.value)}
                            placeholder="Nombre de la categoría"
                            className="p-3 border mb-4 w-full"
                        />
                    )}
                    <div className="flex justify-end space-x-4">
                        <button
                            onClick={() => setMostrarModalEditar(false)}
                            className="bg-gray-300 text-black py-2 px-4 rounded-lg hover:bg-gray-400"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={() => {
                                tipoEdicion === 'agregar'
                                    ? productoEditar
                                        ? agregarNuevoProducto(productoEditar)
                                        : agregarNuevaCategoria(categoriaEditar)
                                    : productoEditar
                                    ? manejarGuardarCambiosProducto(productoEditar)
                                    : editarCategoriaSeleccionada();
                            }}
                            className="bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
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
