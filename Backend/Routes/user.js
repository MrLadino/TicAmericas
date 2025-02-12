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

    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Correo electrónico inválido" });
    }

    try {
        const [[existingUser]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

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
        const [[user]] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (!user) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { user_id: user.user_id, email: user.email, role: user.role },
            process.env.JWT_SECRET,
            { expiresIn: "1h" }
        );

        res.status(200).json({ 
            message: "Login exitoso", 
            token,
            user: { 
                user_id: user.user_id, 
                name: user.name, 
                email: user.email, 
                role: user.role 
            }
        });
    } catch (error) {
        console.error("Error en el login:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Obtener todos los usuarios (solo admins)**
router.get('/', verifyToken, verifyAdmin, async (req, res) => {
    try {
        const [users] = await db.query(
            "SELECT user_id, name, email, role, phone, description, profile_photo FROM users"
        );
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Actualizar información del perfil y empresa**
router.put('/update-profile', verifyToken, async (req, res) => {
    const { 
        user_id, name, email, phone, description, profile_photo, 
        company_id, company_name, companyLocation, companyPhone 
    } = req.body;

    if (req.user.user_id !== parseInt(user_id) && req.user.role !== 'admin') {
        return res.status(403).json({ message: "No tienes permiso para modificar este perfil" });
    }

    try {
        // Actualizar usuario
        await db.query(
            `UPDATE users 
            SET name = COALESCE(?, name), 
                email = COALESCE(?, email), 
                phone = COALESCE(?, phone), 
                description = COALESCE(?, description), 
                profile_photo = COALESCE(?, profile_photo)
            WHERE user_id = ?`,
            [name, email, phone, description, profile_photo, user_id]
        );

        // Actualizar empresa (si se proporciona una empresa)
        if (company_id && company_name) {
            await db.query(
                `UPDATE companies 
                SET name = COALESCE(?, name),
                    location = COALESCE(?, location),
                    phone = COALESCE(?, phone),
                    photo = COALESCE(?, photo)
                WHERE company_id = ?`,
                [company_name, companyLocation, companyPhone, profile_photo, company_id]
            );
        }

        res.status(200).json({ message: "Perfil actualizado correctamente" });
    } catch (error) {
        console.error("Error al actualizar perfil:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Eliminar usuario (solo admins o el propio usuario)**
router.delete('/:id', verifyToken, async (req, res) => {
    const userId = req.params.id;

    try {
        const [[user]] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        // Solo el propio usuario o un admin pueden eliminar la cuenta
        if (req.user.role !== 'admin' && req.user.user_id !== parseInt(userId)) {
            return res.status(403).json({ message: "No tienes permiso para eliminar este usuario" });
        }

        // Primero eliminar la empresa asociada
        await db.query("DELETE FROM companies WHERE user_id = ?", [userId]);

        // Luego eliminar el usuario
        await db.query("DELETE FROM users WHERE user_id = ?", [userId]);

        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

module.exports = router;
