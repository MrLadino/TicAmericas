// Frontend/src/Components/Pages/Productos/PdtsLogica.js

// Función para generar un ID aleatorio de 5 dígitos (como string)
export const generarIdCorto = () => {
  return String(Math.floor(10000 + Math.random() * 90000));
};

// Agregar un nuevo producto
export const agregarProducto = (productos, nuevoProducto) => {
  if (!nuevoProducto.id) {
    nuevoProducto.id = generarIdCorto();
  }
  // Aseguramos que el SKU tenga máximo 5 caracteres
  nuevoProducto.sku = (nuevoProducto.sku || "").toString().substring(0, 5);
  return [...productos, nuevoProducto];
};

// Agregar una nueva categoría
export const agregarCategoria = (categorias, nuevaCategoria) => {
  const categoriaLimpia = nuevaCategoria.trim();
  if (categoriaLimpia && !categorias.some(c => c.name === categoriaLimpia)) {
    return [...categorias, { id: generarIdCorto(), name: categoriaLimpia }];
  }
  return categorias;
};

// Filtrar productos por categoría
export const filtrarProductosPorCategoria = (productos, categoriaSeleccionada) => {
  return productos.filter((producto) => producto.categoria === categoriaSeleccionada);
};

// Filtrar productos por estado (activos/inactivos)
export const filtrarProductosPorEstado = (productos, estadoFiltro) => {
  return productos.filter((producto) =>
    estadoFiltro === 'activos' ? producto.activo : !producto.activo
  );
};

// Filtrar productos por nombre
export const filtrarProductosPorNombre = (productos, nombre) => {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
};

// Editar un producto existente
export const editarProducto = (productos, productoEditado) => {
  return productos.map((producto) =>
    producto.id === productoEditado.id ? productoEditado : producto
  );
};

// Eliminar un producto por su ID
export const eliminarProducto = (productos, productoId) => {
  return productos.filter((producto) => producto.id !== productoId);
};

// Actualizar la categoría de un producto existente
export const actualizarCategoriaProducto = (productos, categoriaSeleccionada, nuevaCategoria) => {
  return productos.map((producto) =>
    producto.categoria === categoriaSeleccionada
      ? { ...producto, categoria: nuevaCategoria }
      : producto
  );
};

// Actualizar el nombre de una categoría (en el array de categorías)
export const actualizarCategoria = (categorias, categoriaSeleccionada, nuevaCategoria) => {
  return categorias.map((categoria) =>
    categoria.name === categoriaSeleccionada ? { ...categoria, name: nuevaCategoria.trim() } : categoria
  );
};

// Editar la categoría y actualizar los productos que la usan
export const editarCategoriaYActualizarProductos = (productos, categorias, categoriaSeleccionada, nuevaCategoria) => {
  const productosActualizados = actualizarCategoriaProducto(productos, categoriaSeleccionada, nuevaCategoria);
  const categoriasActualizadas = categorias.map((cat) =>
    cat.name === categoriaSeleccionada ? { ...cat, name: nuevaCategoria.trim() } : cat
  );
  return { productosActualizados, categoriasActualizadas };
};

// Alternar el estado activo/inactivo de un producto
export const toggleEstadoProducto = (productos, productoId) => {
  return productos.map((producto) =>
    producto.id === productoId ? { ...producto, activo: !producto.activo } : producto
  );
};
