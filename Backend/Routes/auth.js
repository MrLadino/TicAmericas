// Backend/routes/auth.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../Config/db");
const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son obligatorios." });
  }
  try {
    // Buscar usuario por correo
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    // Comparar contraseñas
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Generar token JWT con expiración extendida (365 días)
    const token = jwt.sign(
      { user_id: user[0].user_id, email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "365d" }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        user_id: user[0].user_id,
        name: user[0].name,
        email: user[0].email,
        role: user[0].role,
        phone: user[0].phone,
        profile_photo: user[0].profile_photo,
      },
    });
  } catch (error) {
    console.error("Error en el login:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

module.exports = router;
