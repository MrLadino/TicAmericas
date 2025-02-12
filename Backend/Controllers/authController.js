import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import db from '../Config/db.js';
import dotenv from 'dotenv';

dotenv.config();

// **Registrar un usuario**
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validaciones básicas
    if (!name || !email || !password) {
      return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios." });
    }

    // Validación de formato de email
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido." });
    }

    // Verificar si el correo ya existe
    const [[existingUser]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(password, 10);
    const userRole = role || 'usuario'; // Si no se envía, asignamos 'usuario'

    // Insertar usuario en la base de datos
    const insertUserQuery = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(insertUserQuery, [name, email, hashedPassword, userRole]);

    // Generar JWT
    const token = jwt.sign(
      { user_id: result.insertId, email, role: userRole },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.status(201).json({ 
      message: "✅ Usuario registrado exitosamente.", 
      token 
    });

  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
};
