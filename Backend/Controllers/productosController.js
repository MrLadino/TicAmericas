// Backend/Controllers/productosController.js

const db = require("../Config/db");
const ExcelJS = require("exceljs");
const multer = require("multer");

// Helper para generar un ID corto (5 dígitos)
const generarIdCorto = () => {
  return String(Math.floor(10000 + Math.random() * 90000));
};

// -------------------- CATEGORÍAS --------------------
exports.getCategorias = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [categorias] = await db.query("SELECT * FROM product_categories WHERE user_id = ?", [userId]);
    return res.json(categorias);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    return res.status(500).json({ message: "Error al obtener categorías", error });
  }
};

exports.createCategoria = async (req, res) => {
  const userId = req.user.user_id;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "El nombre es obligatorio." });
  }
  try {
    const [result] = await db.query("INSERT INTO product_categories (name, user_id) VALUES (?, ?)", [name, userId]);
    return res.status(201).json({ message: "Categoría creada", id: result.insertId, name });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Ya existe una categoría con ese nombre para tu usuario" });
    }
    return res.status(500).json({ message: "Error en el servidor.", error });
  }
};

exports.updateCategoria = async (req, res) => {
  const userId = req.user.user_id;
  const { id } = req.params;
  const { name } = req.body;
  if (!name) {
    return res.status(400).json({ message: "El nuevo nombre es obligatorio." });
  }
  try {
    const [rows] = await db.query("SELECT * FROM product_categories WHERE category_id = ? AND user_id = ?", [id, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o no pertenece al usuario." });
    }
    await db.query("UPDATE product_categories SET name = ? WHERE category_id = ? AND user_id = ?", [name, id, userId]);
    return res.json({ message: "Categoría actualizada con éxito", id, name });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Ya existe una categoría con ese nombre para tu usuario" });
    }
    return res.status(500).json({ message: "Error al actualizar la categoría", error });
  }
};

exports.deleteCategoria = async (req, res) => {
  const userId = req.user.user_id;
  const { id } = req.params;
  try {
    const [rows] = await db.query("SELECT * FROM product_categories WHERE category_id = ? AND user_id = ?", [id, userId]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Categoría no encontrada o no pertenece al usuario." });
    }
    await db.query("DELETE FROM product_categories WHERE category_id = ? AND user_id = ?", [id, userId]);
    return res.json({ message: "Categoría eliminada con éxito", id });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    return res.status(500).json({ message: "Error al eliminar la categoría", error });
  }
};

// -------------------- PRODUCTOS --------------------
exports.getProductos = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [productos] = await db.query(
      `SELECT p.*, pc.name AS categoria
       FROM productos p
       LEFT JOIN product_categories pc ON p.categoria_id = pc.category_id
       WHERE p.user_id = ?`,
      [userId]
    );
    return res.json(productos);
  } catch (error) {
    console.error("Error al obtener productos:", error);
    return res.status(500).json({ message: "Error al obtener productos", error });
  }
};

exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.user_id;
    const [producto] = await db.query(
      `SELECT p.*, pc.name AS categoria
       FROM productos p
       LEFT JOIN product_categories pc ON p.categoria_id = pc.category_id
       WHERE p.id = ? AND p.user_id = ?`,
      [id, userId]
    );
    if (producto.length === 0) {
      return res.status(404).json({ message: "Producto no encontrado" });
    }
    return res.json(producto[0]);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener el producto", error });
  }
};

exports.createProducto = async (req, res) => {
  let { id, sku, nombre, descripcion, imagen, precio, stock, categoria, activo, qr_code } = req.body;
  try {
    const userId = req.user.user_id;
    if (!id || !id.trim()) {
      id = generarIdCorto();
    }
    if (!categoria) {
      return res.status(400).json({ message: "No hay categoría para este producto" });
    }
    const [catResult] = await db.query(
      "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
      [categoria, userId]
    );
    if (catResult.length === 0) {
      return res.status(400).json({ message: "La categoría no existe. Crea la categoría primero." });
    }
    const categoria_id = catResult[0].category_id;
    await db.query(
      `INSERT INTO productos
       (id, user_id, sku, nombre, descripcion, imagen, precio, stock, categoria_id, activo, qr_code)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        sku || "",
        nombre || "",
        descripcion || "",
        imagen || null,
        precio || 0,
        stock || 0,
        categoria_id,
        activo === undefined ? 1 : activo,
        qr_code || "",
      ]
    );
    return res.json({ message: "Producto creado con éxito" });
  } catch (error) {
    console.error("Error al crear el producto:", error);
    return res.status(500).json({ message: "Error al crear el producto", error });
  }
};

exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const { sku, nombre, descripcion, imagen, precio, stock, categoria, activo, qr_code } = req.body;
  try {
    const userId = req.user.user_id;
    if (!categoria) {
      return res.status(400).json({ message: "No hay categoría para este producto" });
    }
    const [catResult] = await db.query(
      "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
      [categoria, userId]
    );
    if (catResult.length === 0) {
      return res.status(400).json({ message: "La categoría no existe. Crea la categoría primero." });
    }
    const categoria_id = catResult[0].category_id;
    await db.query(
      `UPDATE productos
       SET sku = ?, nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ?, categoria_id = ?, activo = ?, qr_code = ?
       WHERE id = ? AND user_id = ?`,
      [
        sku || "",
        nombre || "",
        descripcion || "",
        imagen || null,
        precio || 0,
        stock || 0,
        categoria_id,
        activo === undefined ? 1 : activo,
        qr_code || "",
        id,
        userId,
      ]
    );
    return res.json({ message: "Producto actualizado con éxito" });
  } catch (error) {
    console.error("Error al actualizar el producto:", error);
    return res.status(500).json({ message: "Error al actualizar el producto", error });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.user_id;
    await db.query("DELETE FROM productos WHERE id = ? AND user_id = ?", [id, userId]);
    return res.json({ message: "Producto eliminado con éxito" });
  } catch (error) {
    console.error("Error al eliminar el producto:", error);
    return res.status(500).json({ message: "Error al eliminar el producto", error });
  }
};

exports.exportExcel = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [productos] = await db.query(
      `SELECT p.id, p.sku, p.nombre, p.descripcion, p.precio, p.stock, p.activo, p.qr_code,
              pc.name AS categoria, p.imagen
       FROM productos p
       LEFT JOIN product_categories pc ON p.categoria_id = pc.category_id
       WHERE p.user_id = ?`,
      [userId]
    );
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Productos", {
      properties: { defaultRowHeight: 60 },
    });
    worksheet.columns = [
      { header: "ID",          key: "id",          width: 10 },
      { header: "SKU",         key: "sku",         width: 12 },
      { header: "Nombre",      key: "nombre",      width: 20 },
      { header: "Descripción", key: "descripcion", width: 25 },
      { header: "Stock",       key: "stock",       width: 10 },
      { header: "Precio",      key: "precio",      width: 12 },
      { header: "Activo",      key: "activo",      width: 8 },
      { header: "QR Code",     key: "qr_code",     width: 15 },
      { header: "Categoría",   key: "categoria",   width: 15 },
      { header: "Imagen",      key: "imagen_col",  width: 15 },
    ];
    worksheet.getRow(1).font = { bold: true };

    if (productos.length > 0) {
      for (let i = 0; i < productos.length; i++) {
        const p = productos[i];
        const activoTexto = p.activo ? "V" : "?";
        const row = worksheet.addRow({
          id: p.id,
          sku: p.sku,
          nombre: p.nombre,
          descripcion: p.descripcion,
          stock: p.stock,
          precio: p.precio,
          activo: activoTexto,
          qr_code: p.qr_code || "",
          categoria: p.categoria || "",
          imagen_col: "",
        });
        row.height = 70;

        if (p.imagen) {
          let base64Data = p.imagen;
          let extension = "png";
          const match = base64Data.match(/^data:image\/(\w+);base64,/);
          if (match) {
            extension = match[1];
            base64Data = base64Data.replace(/^data:image\/\w+;base64,/, "");
          }
          const imageId = workbook.addImage({
            base64: base64Data,
            extension: extension,
          });
          const rowIndex = row.number;
          worksheet.addImage(imageId, {
            tl: { col: 9, row: rowIndex - 1 },
            ext: { width: 60, height: 60 },
          });
        }
      }
    }

    const totalRows = worksheet.rowCount;
    const totalCols = worksheet.columnCount;
    for (let r = 1; r <= totalRows; r++) {
      for (let c = 1; c <= totalCols; c++) {
        const cell = worksheet.getCell(r, c);
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };
      }
    }

    res.setHeader("Content-Disposition", 'attachment; filename="productos_tic.xlsx"');
    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    const buffer = await workbook.xlsx.writeBuffer();
    return res.send(buffer);
  } catch (error) {
    console.error("Error al exportar Excel:", error);
    return res.status(500).json({ message: "Error al exportar Excel", error });
  }
};

exports.importExcel = (req, res) => {
  const uploadExcel = multer({ storage: multer.memoryStorage() }).single("excel");
  uploadExcel(req, res, async (err) => {
    if (err) {
      console.error("Error al subir archivo Excel:", err);
      return res.status(400).json({ message: "Error al subir el archivo Excel" });
    }
    try {
      const userId = req.user.user_id;
      if (!req.file) {
        return res.status(400).json({ message: "No se recibió ningún archivo Excel" });
      }
      const catName = req.body.categoryName;
      if (!catName) {
        return res.status(400).json({ message: "No hay categoría seleccionada para importar productos" });
      }
      const [catRes] = await db.query(
        "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
        [catName, userId]
      );
      if (catRes.length === 0) {
        return res.status(400).json({ message: "La categoría seleccionada no existe. Crea la categoría primero." });
      }
      const categoria_id = catRes[0].category_id;
      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);
      const worksheet = workbook.worksheets[0];
      const rows = [];
      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return;
        const vals = row.values;
        rows.push({
          sku: vals[1] || "",
          descripcion: vals[2] || "",
          nombre: vals[3] || "",
          stock: vals[4] || 0,
          precio: vals[5] || 0
        });
      });

      const insertValues = [];
      for (const rowData of rows) {
        let { sku, descripcion, nombre, stock, precio } = rowData;
        if (!nombre.trim()) continue;
        const [existe] = await db.query(
          "SELECT * FROM productos WHERE LOWER(nombre) = ? AND user_id = ?",
          [nombre.toLowerCase(), userId]
        );
        if (existe.length > 0) continue;
        if (!sku.trim()) {
          sku = generarIdCorto();
        }
        const id = generarIdCorto();
        insertValues.push([
          id,
          userId,
          sku,
          nombre,
          descripcion,
          null,
          precio || 0,
          stock || 0,
          categoria_id,
          0,
          ""
        ]);
      }

      if (insertValues.length > 0) {
        const query = `INSERT INTO productos (id, user_id, sku, nombre, descripcion, imagen, precio, stock, categoria_id, activo, qr_code) VALUES ?`;
        await db.query(query, [insertValues]);
      }

      return res.json({ message: "Productos importados exitosamente", total: insertValues.length });
    } catch (error) {
      console.error("Error al importar Excel:", error);
      return res.status(500).json({ message: "Error al importar Excel", error });
    }
  });
};
