const express = require("express");
const bcrypt = require("bcrypt");
const db = require("../Config/db");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// Endpoint para registrar usuarios
router.post(
  "/signup",
  [
    check("email", "El correo electrónico no es válido").isEmail(),
    check("password", "La contraseña debe tener al menos 6 caracteres").isLength({ min: 6 }),
    check("nombre", "El nombre es obligatorio").notEmpty(),
    check("rol", "El rol es obligatorio").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { nombre, email, password, rol } = req.body;

      // Verificar si el usuario ya existe
      const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      if (existingUser.length > 0) {
        return res.status(400).json({ message: "El correo ya está registrado" });
      }

      // Encriptar la contraseña
      const saltRounds = 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Insertar el usuario en la base de datos
      await db.query("INSERT INTO users (nombre, email, password, rol) VALUES (?, ?, ?, ?)", 
        [nombre, email, hashedPassword, rol]);

      res.status(201).json({ message: "Usuario registrado exitosamente" });

    } catch (error) {
      console.error("Error en /signup:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
);

module.exports = router;
