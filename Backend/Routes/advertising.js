// Backend/Routes/advertising.js
const express = require("express");
const router = express.Router();
const db = require("../Config/db");
const { verifyToken } = require("../Middlewares/authMiddleware");

// Obtener todas las categorías del usuario
router.get("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [rows] = await db.query(
      "SELECT category_id, user_id, name FROM advertising_categories WHERE user_id = ?",
      [userId]
    );
    res.json(rows);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ message: "Error al obtener categorías" });
  }
});

// Crear una nueva categoría
router.post("/", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Falta el nombre de la categoría" });
    }
    await db.query(
      "INSERT INTO advertising_categories (user_id, name) VALUES (?, ?)",
      [userId, name]
    );
    res.status(201).json({ message: "Categoría creada con éxito" });
  } catch (error) {
    console.error("Error al crear categoría:", error);
    res.status(500).json({ message: "Error al crear categoría" });
  }
});

// Editar categoría
router.put("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;
    const { name } = req.body;

    const [result] = await db.query(
      "UPDATE advertising_categories SET name = ? WHERE category_id = ? AND user_id = ?",
      [name, id, userId]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Categoría no encontrada o no pertenece al usuario" });
    }
    res.status(200).json({ message: "Categoría actualizada con éxito" });
  } catch (error) {
    console.error("Error al actualizar categoría:", error);
    res.status(500).json({ message: "Error al actualizar categoría" });
  }
});

// Eliminar categoría
router.delete("/:id", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const { id } = req.params;

    const [result] = await db.query(
      "DELETE FROM advertising_categories WHERE category_id = ? AND user_id = ?",
      [id, userId]
    );
    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ message: "Categoría no encontrada o no pertenece al usuario" });
    }
    res.status(200).json({ message: "Categoría eliminada con éxito" });
  } catch (error) {
    console.error("Error al eliminar categoría:", error);
    res.status(500).json({ message: "Error al eliminar categoría" });
  }
});

module.exports = router;
