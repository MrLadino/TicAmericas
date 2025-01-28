// Función para agregar un nuevo producto
export const agregarProducto = (productos, nuevoProducto) => {
  return [...productos, nuevoProducto];
};

// Función para agregar una nueva categoría
export const agregarCategoria = (categorias, nuevaCategoria) => {
  const categoriaLimpia = nuevaCategoria.trim();
  if (categoriaLimpia && !categorias.includes(categoriaLimpia)) {
    return [...categorias, categoriaLimpia];
  }
  return categorias;
};

// Función para actualizar la categoría de un producto existente
export const actualizarCategoriaProducto = (productos, categoriaSeleccionada, nuevaCategoria) => {
  return productos.map((producto) =>
    producto.categoria === categoriaSeleccionada
      ? { ...producto, categoria: nuevaCategoria }
      : producto
  );
};

// Función para actualizar el nombre de una categoría
export const actualizarCategoria = (categorias, categoriaSeleccionada, nuevaCategoria) => {
  return categorias.map((categoria) =>
    categoria === categoriaSeleccionada ? nuevaCategoria.trim() : categoria
  );
};

// Función para filtrar productos por categoría
export const filtrarProductosPorCategoria = (productos, categoriaSeleccionada) => {
  return productos.filter((producto) => producto.categoria === categoriaSeleccionada);
};

// Función para actualizar la lista de búsquedas recientes
export const actualizarBusqueda = (termino, ultimasBusquedas) => {
  const terminoLimpio = termino.trim();
  if (!terminoLimpio) return ultimasBusquedas;
  const nuevasBusquedas = [terminoLimpio, ...ultimasBusquedas.filter((b) => b !== terminoLimpio)];
  return nuevasBusquedas.slice(0, 5);
};

// Función para editar un producto existente
export const editarProducto = (productos, productoEditado) => {
  return productos.map((producto) =>
    producto.id === productoEditado.id ? productoEditado : producto
  );
};

// Función para eliminar un producto por su ID
export const eliminarProducto = (productos, productoId) => {
  return productos.filter((producto) => producto.id !== productoId);
};

// Función para editar categoría sin eliminar productos
export const editarCategoriaSinEliminarProductos = (productos, categorias, categoriaSeleccionada, nuevaCategoria) => {
  const productosActualizados = actualizarCategoriaProducto(productos, categoriaSeleccionada, nuevaCategoria);
  const categoriasActualizadas = actualizarCategoria(categorias, categoriaSeleccionada, nuevaCategoria);
  return { productosActualizados, categoriasActualizadas };
};

// Función para actualizar una categoría y reflejar el cambio en los productos
export const editarCategoriaYActualizarProductos = (productos, categorias, categoriaSeleccionada, nuevaCategoria) => {
  const categoriaLimpia = nuevaCategoria.trim();

  const productosActualizados = productos.map((producto) =>
    producto.categoria === categoriaSeleccionada
      ? { ...producto, categoria: categoriaLimpia }
      : producto
  );

  const categoriasActualizadas = categorias.map((categoria) =>
    categoria === categoriaSeleccionada ? categoriaLimpia : categoria
  );

  return { productosActualizados, categoriasActualizadas };
};

// Filtrar productos por nombre
export const filtrarProductosPorNombre = (productos, nombre) => {
  return productos.filter((producto) =>
    producto.nombre.toLowerCase().includes(nombre.toLowerCase())
  );
};
