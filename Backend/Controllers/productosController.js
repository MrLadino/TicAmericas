// Backend/Controllers/productosController.js
const db = require('../Config/db'); // Conexión a la base de datos

// Obtener todos los productos
exports.getProductos = async (req, res) => {
  try {
    const [productos] = await db.query("SELECT * FROM productos");
    res.json(productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener productos", error });
  }
};

// Obtener un producto por ID
exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const [producto] = await db.query("SELECT * FROM productos WHERE id = ?", [id]);
    if (producto.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    res.json(producto[0]);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

// Crear un nuevo producto
exports.createProducto = async (req, res) => {
  const { id, sku, nombre, descripcion, imagen, precio, stock, categoria, activo } = req.body;
  try {
    await db.query(
      "INSERT INTO productos (id, sku, nombre, descripcion, imagen, precio, stock, categoria_id, activo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [id, sku, nombre, descripcion, imagen, precio, stock, categoria, activo]
    );
    res.json({ message: "Producto creado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al crear el producto", error });
  }
};

// Actualizar un producto
exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { sku, nombre, descripcion, imagen, precio, stock, categoria, activo } = req.body;
  try {
    await db.query(
      "UPDATE productos SET sku = ?, nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ?, categoria_id = ?, activo = ? WHERE id = ?",
      [sku, nombre, descripcion, imagen, precio, stock, categoria, activo, id]
    );
    res.json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

// Eliminar un producto
exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    await db.query("DELETE FROM productos WHERE id = ?", [id]);
    res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};
