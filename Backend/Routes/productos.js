// Backend/Routes/productos.js

const express = require("express");
const router = express.Router();
const productosController = require("../Controllers/productosController");
const { verifyToken, verifyAdmin } = require("../Middlewares/authMiddleware");

// CATEGORÍAS
router.get("/categorias", verifyToken, productosController.getCategorias);
router.post("/categorias", verifyToken, productosController.createCategoria);
router.put("/categorias/:id", verifyToken, productosController.updateCategoria);
router.delete("/categorias/:id", verifyToken, productosController.deleteCategoria);

// EXCEL
router.get("/export-excel", verifyToken, productosController.exportExcel);
router.post("/import-excel", verifyToken, productosController.importExcel);

// PRODUCTOS
router.get("/", verifyToken, productosController.getProductos);
router.get("/:id", verifyToken, productosController.getProductoById);
router.post("/", verifyToken, productosController.createProducto);
router.put("/:id", verifyToken, productosController.updateProducto);
router.delete("/:id", verifyToken, productosController.deleteProducto);

module.exports = router;
