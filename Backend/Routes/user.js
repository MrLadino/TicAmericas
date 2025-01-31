const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../Config/db');
const dotenv = require('dotenv');
const { verifyToken, verifyAdmin } = require('../Middlewares/authMiddleware');

dotenv.config();
const router = express.Router();

// **Registro de usuario**
router.post('/signup', async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    // Validación del formato del correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo electrónico inválido" });
    }

    try {
        // Verificar si el usuario ya existe
        const [[existingUser]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        // Encriptar contraseña
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insertar usuario
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, role || 'usuario'];

        await db.query(sql, values);
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Login de usuario**
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    try {
        // Verificar si el usuario existe
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        // Comparar contraseñas
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        // Crear token JWT
        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ message: "Login exitoso", token });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Obtener todos los usuarios (solo admins)**
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const [users] = await db.query("SELECT user_id, name, email, role FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Actualizar usuario**
router.put('/:id', verifyToken, async (req, res) => {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    if (!name && !email && !role) {
        return res.status(400).json({ message: "Debe proporcionar al menos uno de los campos para actualizar" });
    }

    try {
        // Verificar si el usuario existe
        const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Actualizar los campos proporcionados
        const updateQuery = `
            UPDATE users
            SET name = COALESCE(?, name),
                email = COALESCE(?, email),
                role = COALESCE(?, role)
            WHERE user_id = ?
        `;
        const values = [name, email, role, userId];

        await db.query(updateQuery, values);
        res.status(200).json({ message: "Usuario actualizado exitosamente" });
    } catch (error) {
        console.error("Error al actualizar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Eliminar usuario**
router.delete('/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;

    try {
        // Verificar si el usuario existe
        const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Eliminar el usuario
        await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
