const db = require("../Config/db");
const ExcelJS = require("exceljs");
const multer = require("multer");

// Generar un ID corto (5 dígitos)
function generarIdCorto() {
  return String(Math.floor(10000 + Math.random() * 90000));
}

// ============== CATEGORÍAS ==============
exports.getCategorias = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [categorias] = await db.query(
      "SELECT * FROM product_categories WHERE user_id = ?",
      [userId]
    );
    return res.json(categorias);
  } catch (error) {
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
    const [result] = await db.query(
      "INSERT INTO product_categories (name, user_id) VALUES (?, ?)",
      [name, userId]
    );
    return res.json({ message: "OK", id: result.insertId, name });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Ya existe una categoría con ese nombre para tu usuario",
      });
    }
    return res.status(500).json({ message: "Error al crear categoría", error });
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
    const [rows] = await db.query(
      "SELECT * FROM product_categories WHERE category_id = ? AND user_id = ?",
      [id, userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada o no pertenece al usuario",
      });
    }
    await db.query(
      "UPDATE product_categories SET name = ? WHERE category_id = ? AND user_id = ?",
      [name, id, userId]
    );
    return res.json({ message: "OK", id, name });
  } catch (error) {
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({
        message: "Ya existe una categoría con ese nombre para tu usuario",
      });
    }
    return res.status(500).json({ message: "Error al actualizar categoría", error });
  }
};

exports.deleteCategoria = async (req, res) => {
  const userId = req.user.user_id;
  const { id } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM product_categories WHERE category_id = ? AND user_id = ?",
      [id, userId]
    );
    if (rows.length === 0) {
      return res.status(404).json({
        message: "Categoría no encontrada o no pertenece al usuario",
      });
    }
    await db.query(
      "DELETE FROM product_categories WHERE category_id = ? AND user_id = ?",
      [id, userId]
    );
    return res.json({ message: "OK", id });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar categoría", error });
  }
};

// ============== PRODUCTOS ==============
exports.getProductos = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [productos] = await db.query(
      `SELECT 
         p.id,
         p.sku,
         p.nombre,
         p.descripcion,
         p.imagen,
         p.precio,
         p.stock,
         p.activo,
         p.codigo_barras,
         pc.name AS categoria
       FROM productos p
       LEFT JOIN product_categories pc ON p.categoria_id = pc.category_id
       WHERE p.user_id = ?`,
      [userId]
    );
    return res.json(productos);
  } catch (error) {
    return res.status(500).json({ message: "Error al obtener productos", error });
  }
};

exports.getProductoById = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.user_id;
    const [producto] = await db.query(
      `SELECT 
         p.id,
         p.sku,
         p.nombre,
         p.descripcion,
         p.imagen,
         p.precio,
         p.stock,
         p.activo,
         p.codigo_barras,
         pc.name AS categoria
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
  let {
    id,
    sku,
    nombre,
    descripcion,
    imagen,
    precio,
    stock,
    categoria,
    activo,
    codigo_barras,
  } = req.body;
  try {
    const userId = req.user.user_id;
    if (!id || !id.trim()) id = generarIdCorto();
    if (!categoria)
      return res.status(400).json({ message: "No hay categoría para este producto" });
    const [catResult] = await db.query(
      "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
      [categoria, userId]
    );
    if (catResult.length === 0) {
      return res.status(400).json({
        message: "La categoría no existe. Crea la categoría primero.",
      });
    }
    const categoria_id = catResult[0].category_id;
    const precioFinal = precio !== undefined && precio !== null ? Number(precio) : 0;
    await db.query(
      `INSERT INTO productos
       (id, user_id, sku, nombre, descripcion, imagen, precio, stock, categoria_id, activo, codigo_barras)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        id,
        userId,
        sku || "",
        nombre || "",
        descripcion || "",
        imagen || null,
        precioFinal,
        stock || 0,
        categoria_id,
        activo === undefined ? 1 : activo,
        codigo_barras || "",
      ]
    );
    return res.json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Error al crear producto", error });
  }
};

exports.updateProducto = async (req, res) => {
  const { id } = req.params;
  const {
    sku,
    nombre,
    descripcion,
    imagen,
    precio,
    stock,
    categoria,
    activo,
    codigo_barras,
  } = req.body;
  try {
    const userId = req.user.user_id;
    if (!categoria)
      return res.status(400).json({ message: "No hay categoría para este producto" });
    const [catResult] = await db.query(
      "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
      [categoria, userId]
    );
    if (catResult.length === 0) {
      return res.status(400).json({
        message: "La categoría no existe. Crea la categoría primero.",
      });
    }
    const categoria_id = catResult[0].category_id;
    const precioFinal = precio !== undefined && precio !== null ? Number(precio) : 0;
    await db.query(
      `UPDATE productos
       SET sku = ?, nombre = ?, descripcion = ?, imagen = ?, precio = ?, stock = ?, categoria_id = ?, activo = ?, codigo_barras = ?
       WHERE id = ? AND user_id = ?`,
      [
        sku || "",
        nombre || "",
        descripcion || "",
        imagen || null,
        precioFinal,
        stock || 0,
        categoria_id,
        activo === undefined ? 1 : activo,
        codigo_barras || "",
        id,
        userId,
      ]
    );
    return res.json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Error al actualizar producto", error });
  }
};

exports.deleteProducto = async (req, res) => {
  const { id } = req.params;
  try {
    const userId = req.user.user_id;
    await db.query("DELETE FROM productos WHERE id = ? AND user_id = ?", [
      id,
      userId,
    ]);
    return res.json({ message: "OK" });
  } catch (error) {
    return res.status(500).json({ message: "Error al eliminar producto", error });
  }
};

// ============== EXPORTAR EXCEL (8 COLUMNAS) ==============
exports.exportExcel = async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [productos] = await db.query(
      `SELECT
         p.sku,
         p.nombre,
         p.descripcion,
         p.imagen,
         p.precio,
         p.activo,
         p.codigo_barras,
         pc.name AS categoria
       FROM productos p
       LEFT JOIN product_categories pc ON p.categoria_id = pc.category_id
       WHERE p.user_id = ?`,
      [userId]
    );

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet("Productos", {
      properties: { defaultRowHeight: 60 },
    });

    // Solo las columnas solicitadas
    worksheet.columns = [
      { header: "SKU",           key: "sku",           width: 12 },
      { header: "NOMBRE",        key: "nombre",        width: 20 },
      { header: "DESCRIPCION",   key: "descripcion",   width: 25 },
      { header: "IMAGEN",        key: "imagen_col",    width: 15 },
      { header: "PRECIO",        key: "precio",        width: 12 },
      { header: "ACTIVO",        key: "activo",        width: 8  },
      { header: "CODIGO_BARRAS", key: "codigo_barras", width: 20 },
      { header: "CATEGORIA",     key: "categoria",     width: 15 },
    ];
    worksheet.getRow(1).font = { bold: true };

    if (productos.length > 0) {
      for (const p of productos) {
        const activoTexto = p.activo ? "V" : "X";
        const row = worksheet.addRow({
          sku: p.sku,
          nombre: p.nombre,
          descripcion: p.descripcion,
          imagen_col: "",
          precio: p.precio,
          activo: activoTexto,
          codigo_barras: p.codigo_barras || "",
          categoria: p.categoria || "",
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
            extension,
          });
          const rowIndex = row.number;
          // Insertamos la imagen en la columna "IMAGEN" (col 4)
          worksheet.addImage(imageId, {
            tl: { col: 3, row: rowIndex - 1 },
            ext: { width: 60, height: 60 },
          });
        }
      }
    }

    // Bordes en toda la hoja
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
    res.setHeader(
      "Content-Type",
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
    );
    const buffer = await workbook.xlsx.writeBuffer();
    return res.send(buffer);
  } catch (error) {
    return res.status(500).json({ message: "Error al exportar Excel", error });
  }
};

// ========== IMPORTAR EXCEL CORREGIDO ==========
exports.importExcel = (req, res) => {
  const uploadExcel = multer({ storage: multer.memoryStorage() }).single("excel");
  uploadExcel(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ message: "Error al subir archivo Excel" });
    }
    try {
      const userId = req.user.user_id;
      if (!req.file) {
        return res.status(400).json({ message: "No se recibió ningún archivo Excel" });
      }
      // Categoría a la que se importan los productos (o "Impresoras" por defecto)
      const categoryName = req.body.categoryName || "Impresoras";
      let categoria_id;
      const [catRes] = await db.query(
        "SELECT category_id FROM product_categories WHERE name = ? AND user_id = ?",
        [categoryName, userId]
      );
      if (catRes.length === 0) {
        // Crear categoría si no existe
        const [result] = await db.query(
          "INSERT INTO product_categories (name, user_id) VALUES (?, ?)",
          [categoryName, userId]
        );
        categoria_id = result.insertId;
      } else {
        categoria_id = catRes[0].category_id;
      }

      const workbook = new ExcelJS.Workbook();
      await workbook.xlsx.load(req.file.buffer);
      const worksheet = workbook.worksheets[0];
      const rows = [];

      // El Excel tiene 7 columnas en este orden:
      // 1) ID (IGNORAR, el sistema genera su propio id)
      // 2) SKU
      // 3) Nombre
      // 4) Descripción
      // 5) Codigo Qr
      // 6) Stock
      // 7) Precio

      worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
        if (rowNumber === 1) return; // saltar encabezado
        const vals = row.values;

        // ID => vals[1] (ignorado)
        const rawSKU         = vals[2] || "";
        const rawNombre      = vals[3] || "";
        const rawDescripcion = vals[4] || "";
        const rawCodigo      = vals[5] || "";
        let   rawStock       = vals[6] || 0;
        let   rawPrecio      = vals[7] || 0;

        // Convertir stock a entero
        const finalStock = parseInt(String(rawStock).replace(/[^0-9]/g, ""), 10) || 0;

        // Convertir precio, quitando $, espacios, etc. Conservamos decimales
        const priceStr   = String(rawPrecio).replace(/[^0-9.]/g, "");
        const finalPrecio = parseFloat(priceStr) || 0;

        rows.push({
          sku: String(rawSKU).trim(),
          nombre: String(rawNombre).trim(),
          descripcion: String(rawDescripcion).trim(),
          codigo_barras: String(rawCodigo).replace(/[^0-9]/g, ""),
          stock: finalStock,
          precio: finalPrecio,
          activo: 0,     // Inactivo por defecto
          imagen: null,  // Se edita luego manualmente
        });
      });

      let insertCount = 0;
      for (const data of rows) {
        // Saltar si no hay nombre
        if (!data.nombre) continue;

        // Evitar duplicados por nombre
        const [dup] = await db.query(
          "SELECT * FROM productos WHERE LOWER(nombre) = ? AND user_id = ?",
          [data.nombre.toLowerCase(), userId]
        );
        if (dup.length > 0) {
          // Ya existe => saltar
          continue;
        }

        // Generar ID aleatorio
        const newId = generarIdCorto();
        // Si el SKU viene vacío en el Excel, generar uno aleatorio
        const finalSku = data.sku ? data.sku : generarIdCorto();

        await db.query(
          `INSERT INTO productos
           (id, user_id, sku, nombre, descripcion, imagen, precio, stock, categoria_id, activo, codigo_barras)
           VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
          [
            newId,
            userId,
            finalSku,
            data.nombre,
            data.descripcion,
            data.imagen,
            data.precio,
            data.stock,
            categoria_id,
            data.activo,
            data.codigo_barras,
          ]
        );
        insertCount++;
      }

      return res.json({ message: "OK", total: insertCount });
    } catch (error) {
      return res.status(500).json({ message: "Error al importar Excel", error });
    }
  });
};

module.exports = exports;
