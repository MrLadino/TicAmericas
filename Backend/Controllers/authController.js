import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import db from "../Config/db.js";
import dotenv from "dotenv";
import { sendMail } from "../utils/emailSender.js";
import crypto from "crypto";

dotenv.config();

const ADMIN_CODE = process.env.ADMIN_CODE || "TicUser001";

/**
 * REGISTRO DE USUARIO
 */
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, adminCode } = req.body;
    console.log("🔑 [REGISTER] adminCode recibido:", adminCode);

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Nombre, email, contraseña y rol son obligatorios." });
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido." });
    }

    // Verificar si ya existe un usuario con ese email
    const [[existingUser]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser) {
      return res.status(400).json({ message: "El correo ya está registrado." });
    }

    // Si se registra como admin, se exige que el código sea EXACTO
    if (role === "admin") {
      if (!adminCode || adminCode.trim() !== ADMIN_CODE.trim()) {
        try {
          await sendMail({
            to: process.env.EMAIL_USER,
            subject: "Solicitud de Registro como Admin",
            html: `<p>El usuario <strong>${email}</strong> ha solicitado registrarse como administrador.</p>
                   <p>El código de autorización requerido es <strong>${ADMIN_CODE}</strong>.</p>`,
          });
        } catch (emailErr) {
          console.error("Error enviando correo de solicitud:", emailErr);
        }
        return res.status(400).json({
          message: "Código de autorización incorrecto. Se ha enviado la solicitud al administrador.",
        });
      }
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insertar el nuevo usuario en la base de datos
    const insertUserQuery = "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)";
    const [result] = await db.query(insertUserQuery, [name, email, hashedPassword, role]);

    // Generar token con expiración de 30 días
    const token = jwt.sign(
      { user_id: result.insertId, email, role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(201).json({ message: "✅ Usuario registrado exitosamente.", token });
  } catch (error) {
    console.error("❌ Error en registerUser:", error);
    res.status(500).json({ message: "Error al registrar el usuario." });
  }
};

/**
 * LOGIN
 */
export const login = async (req, res) => {
  try {
    const { email, password, rememberMe, adminCode, role } = req.body;
    console.log("🔑 [LOGIN] adminCode recibido:", adminCode);

    if (!email || !password || !role) {
      return res.status(400).json({ message: "Correo, contraseña y rol son obligatorios." });
    }

    // Buscar el usuario en DB
    const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }

    const user = rows[0];
    // Comparar contraseñas
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }

    // Verificar que el rol que ingresa el usuario coincida con el que está en la DB
    if (user.role !== role) {
      return res.status(403).json({
        message: "Rol incorrecto. Tu cuenta está registrada como " + user.role,
      });
    }

    // Si el usuario es admin, exigir código de admin
    if (user.role === "admin") {
      if (!adminCode || adminCode.trim() !== ADMIN_CODE.trim()) {
        return res.status(400).json({ message: "Código de administración incorrecto." });
      }
    }

    // Generar token (30 días)
    const token = jwt.sign(
      { user_id: user.user_id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "30d" }
    );

    res.status(200).json({
      message: "Login exitoso",
      token,
      user: {
        user_id: user.user_id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        profile_photo: user.profile_photo,
      },
    });
  } catch (error) {
    console.error("❌ Error en login:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

/**
 * OLVIDÉ MI CONTRASEÑA
 */
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({ message: "El correo es obligatorio." });
    }
    const [rows] = await db.query("SELECT user_id, email FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "No existe un usuario con ese correo." });
    }
    const user = rows[0];

    const token = crypto.randomBytes(20).toString("hex");
    const expires = new Date(Date.now() + 60 * 60 * 1000);

    await db.query(
      "INSERT INTO password_resets (user_id, token, expires_at) VALUES (?, ?, ?)",
      [user.user_id, token, expires]
    );

    const resetLink = `http://localhost:5173/reset-password?token=${token}`;
    await sendMail({
      to: email,
      subject: "Restablecer Contraseña - TIC Americas",
      html: `<p>Has solicitado restablecer tu contraseña. Haz clic en el siguiente enlace o pégalo en tu navegador:</p>
             <p><a href="${resetLink}">${resetLink}</a></p>
             <p>Este enlace expira en 1 hora.</p>`,
    });

    res.json({ message: "Se ha enviado un correo con instrucciones para restablecer tu contraseña." });
  } catch (error) {
    console.error("Error en forgotPassword:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};

/**
 * RESETEAR CONTRASEÑA
 */
export const resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    if (!token || !newPassword) {
      return res.status(400).json({ message: "Token y nueva contraseña son obligatorios." });
    }
    const [rows] = await db.query("SELECT * FROM password_resets WHERE token = ?", [token]);
    if (rows.length === 0) {
      return res.status(400).json({ message: "Token inválido o inexistente." });
    }
    const resetRecord = rows[0];
    if (new Date(resetRecord.expires_at) < new Date()) {
      return res.status(400).json({ message: "El token ha expirado." });
    }

    const hashed = await bcrypt.hash(newPassword, 10);
    await db.query("UPDATE users SET password = ? WHERE user_id = ?", [hashed, resetRecord.user_id]);
    await db.query("DELETE FROM password_resets WHERE id = ?", [resetRecord.id]);

    res.json({ message: "Contraseña restablecida con éxito." });
  } catch (error) {
    console.error("Error en resetPassword:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
};
