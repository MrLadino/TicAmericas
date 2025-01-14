// Función para agregar un nuevo producto
export const agregarProducto = (productos, nuevoProducto) => {
    return [...productos, nuevoProducto];
  };
  
  // Función para agregar una nueva categoría
  export const agregarCategoria = (categorias, nuevaCategoria) => {
    // Verifica si la categoría no está vacía y no existe ya en la lista
    if (!categorias.includes(nuevaCategoria.trim()) && nuevaCategoria.trim() !== "") {
      return [...categorias, nuevaCategoria.trim()];
    }
    return categorias; // Si la categoría ya existe o está vacía, no la agrega
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
    const terminoLimpio = termino.trim(); // Limpia el término de búsqueda
    if (!terminoLimpio) return ultimasBusquedas; // Si está vacío, no lo agrega
  
    const nuevasBusquedas = [terminoLimpio, ...ultimasBusquedas.filter((b) => b !== terminoLimpio)];
    return nuevasBusquedas.slice(0, 5); // Limita a las últimas 5 búsquedas únicas
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
  
  // Función para evitar eliminación de productos al editar categoría
  export const editarCategoriaSinEliminarProductos = (productos, categorias, categoriaSeleccionada, nuevaCategoria) => {
    // Primero, actualizamos la categoría de los productos asociados a la categoría seleccionada
    const productosActualizados = actualizarCategoriaProducto(productos, categoriaSeleccionada, nuevaCategoria);
    
    // Luego, actualizamos la categoría en la lista de categorías
    const categoriasActualizadas = actualizarCategoria(categorias, categoriaSeleccionada, nuevaCategoria);
    
    return { productosActualizados, categoriasActualizadas };
  };
  