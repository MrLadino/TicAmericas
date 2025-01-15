import { useState } from 'react';
import {
    filtrarProductosPorCategoria,
    agregarProducto,
    agregarCategoria,
    editarCategoriaYActualizarProductos,
    // actualizarBusqueda,
    eliminarProducto,
} from './PdtsLogica';

const Productos = () => {
    // Estado de los productos
    const [productos, setProductos] = useState([
        { id: 1, nombre: 'Producto 1', descripcion: 'Descripción del producto 1', imagen: 'https://via.placeholder.com/150', precio: 100, categoria: 'General' },
        { id: 2, nombre: 'Producto 2', descripcion: 'Descripción del producto 2', imagen: 'https://via.placeholder.com/150', precio: 200, categoria: 'General' },
    ]);

    // Estado de las categorías
    const [categorias, setCategorias] = useState(['General', 'Electrónica', 'Ropa', 'Comida']);
    
    // Estado para la categoría seleccionada
    const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('General');

    // Estado para la búsqueda
    const [busqueda, setBusqueda] = useState('');
    
    // Estado para las últimas búsquedas (opcional)
    // const [ultimasBusquedas, setUltimasBusquedas] = useState([]);

    // Estado para controlar la visualización del modal de edición
    const [mostrarModalEditar, setMostrarModalEditar] = useState(false);

    // Estado para determinar el tipo de edición (producto o categoría)
    const [tipoEdicion, setTipoEdicion] = useState('');
    
    // Estado para editar el producto seleccionado
    const [productoEditar, setProductoEditar] = useState(null);
    
    // Estado para editar el nombre de la categoría
    const [categoriaEditar, setCategoriaEditar] = useState('');

    // Filtrar productos por categoría
    const productosFiltrados = filtrarProductosPorCategoria(productos, categoriaSeleccionada);

    // Filtrar productos por nombre
    const productosCoincidentes = productosFiltrados.filter((producto) =>
        producto.nombre.toLowerCase().includes(busqueda.toLowerCase())
    );

    // Función para agregar un nuevo producto
    const agregarNuevoProducto = (nuevoProducto) => {
        if (!nuevoProducto.nombre.trim() || isNaN(nuevoProducto.precio) || nuevoProducto.precio <= 0) {
            alert('Por favor, completa todos los campos correctamente.');
            return;
        }
        setProductos(agregarProducto(productos, nuevoProducto));
        setMostrarModalEditar(false);
    };

    // Función para guardar los cambios en un producto existente
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

    // Función para agregar una nueva categoría
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

    // Función para editar la categoría seleccionada
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

    // Función para manejar la búsqueda del producto
    const manejarBusqueda = (e) => {
        setBusqueda(e.target.value);
    };

    // Función para abrir el modal de edición de producto o categoría
    const abrirModalProducto = (tipo, producto = null) => {
        setTipoEdicion(tipo);
        setProductoEditar(
            producto || { id: Date.now(), nombre: '', descripcion: '', imagen: '', precio: '', categoria: categoriaSeleccionada }
        );
        setCategoriaEditar('');
        setMostrarModalEditar(true);
    };

    // Función para abrir el modal de edición de categoría
    const abrirModalCategoria = (tipo, categoria = '') => {
        setTipoEdicion(tipo);
        setCategoriaEditar(categoria);
        setProductoEditar(null);
        setMostrarModalEditar(true);
    };

    // Función para eliminar un producto
    const eliminarProductoSeleccionado = (id) => {
        if (window.confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            setProductos(eliminarProducto(productos, id));
        }
    };

    return (
        <div className="container mx-auto p-6">
            {/* Controles de categoría */}
            <div className="flex items-center justify-between mb-6 bg-gray-100 p-4 rounded-md shadow-md">
                <div className="flex space-x-4 items-center">
                    <select
                        value={categoriaSeleccionada}
                        onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                        className="p-2 border rounded-md bg-white"
                    >
                        {categorias.map((categoria) => (
                            <option key={categoria} value={categoria}>
                                {categoria}
                            </option>
                        ))}
                    </select>
                    <button
                        onClick={() => abrirModalCategoria('agregar')}
                        className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                    >
                        Agregar categoría
                    </button>
                    <button
                        onClick={() => abrirModalCategoria('editar', categoriaSeleccionada)}
                        className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700"
                    >
                        Editar categoría
                    </button>
                </div>
            </div>

            {/* Barra de búsqueda de productos */}
            <div className="flex items-center justify-between mb-6 bg-gray-100 p-4 rounded-md shadow-md">
                <div className="relative w-64">
                    <input
                        type="text"
                        value={busqueda}
                        onChange={manejarBusqueda}
                        placeholder="Buscar producto"
                        className="p-2 border rounded-md w-full"
                    />
                    <button
                        onClick={() => alert('Realizar búsqueda')}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-600"
                    >
                        <i className="fas fa-search"></i> {/* Aquí puedes usar cualquier ícono de lupa */}
                    </button>

                    {/* Menú desplegable de productos coincidentes */}
                    {busqueda && productosCoincidentes.length > 0 && (
                        <ul className="absolute left-0 w-full mt-1 bg-white border border-gray-300 shadow-lg rounded-md max-h-60 overflow-y-auto">
                            {productosCoincidentes.map((producto) => (
                                <li
                                    key={producto.id}
                                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                                    onClick={() => setBusqueda(producto.nombre)}  /* Al hacer click, establece el nombre del producto como búsqueda */
                                >
                                    {producto.nombre}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
                <button
                    onClick={() => abrirModalProducto('agregar')}
                    className="bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700"
                >
                    Agregar producto
                </button>
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
                            <th className="border border-gray-300 px-4 py-2 text-left">Acciones</th>
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
                                <td className="border border-gray-300 px-4 py-2">
                                    ${producto.precio.toFixed(2)}
                                </td>
                                <td className="border border-gray-300 px-4 py-2">
                                    <button
                                        onClick={() => abrirModalProducto('editar', producto)}
                                        className="bg-blue-500 text-white py-1 px-3 rounded-md hover:bg-blue-600"
                                    >
                                        Editar
                                    </button>
                                    <button
                                        onClick={() => eliminarProductoSeleccionado(producto.id)}
                                        className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 ml-2"
                                    >
                                        Eliminar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {mostrarModalEditar && (
                <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-md w-96">
                        <h3 className="text-xl mb-4">
                            {tipoEdicion === 'agregar' ? 'Agregar' : 'Editar'} {productoEditar ? 'Producto' : 'Categoría'}
                        </h3>
                        {productoEditar ? (
                            <>
                                <input
                                    type="text"
                                    value={productoEditar.nombre}
                                    onChange={(e) => setProductoEditar({ ...productoEditar, nombre: e.target.value })}
                                    placeholder="Nombre"
                                    className="p-2 border mb-4 w-full"
                                />
                                <input
                                    type="text"
                                    value={productoEditar.descripcion}
                                    onChange={(e) => setProductoEditar({ ...productoEditar, descripcion: e.target.value })}
                                    placeholder="Descripción"
                                    className="p-2 border mb-4 w-full"
                                />
                                <input
                                    type="number"
                                    value={productoEditar.precio}
                                    onChange={(e) => setProductoEditar({ ...productoEditar, precio: parseFloat(e.target.value) })}
                                    placeholder="Precio"
                                    className="p-2 border mb-4 w-full"
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
                                    className="p-2 border mb-4 w-full"
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
                                className="p-2 border mb-4 w-full"
                            />
                        )}
                        <div className="flex justify-end space-x-2">
                            <button
                                onClick={() => setMostrarModalEditar(false)}
                                className="bg-gray-500 text-white py-2 px-4 rounded-md"
                            >
                                Cancelar
                            </button>
                            <button
                                onClick={() => {
                                    if (productoEditar) {
                                        tipoEdicion === 'agregar'
                                            ? agregarNuevoProducto(productoEditar)
                                            : manejarGuardarCambiosProducto(productoEditar);
                                    } else if (tipoEdicion === 'editar') {
                                        editarCategoriaSeleccionada();
                                    } else {
                                        agregarNuevaCategoria(categoriaEditar);
                                    }
                                }}
                                className="bg-blue-600 text-white py-2 px-4 rounded-md"
                            >
                                Guardar cambios
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Productos;
