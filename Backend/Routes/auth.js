const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Config/db");
const { check, validationResult } = require("express-validator");

const router = express.Router();

// LOGIN
router.post(
  "/login",
  [
    check("email", "El correo electrónico no es válido").isEmail(),
    check("password", "La contraseña es obligatoria").notEmpty(),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password } = req.body;

      // Buscar usuario en la base de datos
      const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
      if (rows.length === 0) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      const user = rows[0];

      // Comparar contraseñas
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        return res.status(401).json({ message: "Correo o contraseña incorrectos" });
      }

      // Generar token JWT
      const token = jwt.sign(
        { userId: user.user_id, role: user.role },
        process.env.JWT_SECRET || "secret", // Usa una variable de entorno para mayor seguridad
        { expiresIn: "1h" }
      );

      res.json({ message: "Login exitoso", token, user });
    } catch (error) {
      console.error("Error en /login:", error);
      res.status(500).json({ message: "Error en el servidor" });
    }
  }
);

module.exports = router;
