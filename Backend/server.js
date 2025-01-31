const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./Config/db"); // Se importa la conexión desde db.js
const { verifyToken, verifyAdmin } = require("./Middlewares/authMiddleware");

dotenv.config();

// Configurar el servidor Express
const app = express();
const router = express.Router();

app.use(express.json());

// Habilitar CORS
app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
}));

// **Registro de usuario**
router.post("/signup", async (req, res) => {
    const { name, email, password, role } = req.body;

    if (!name || !email || !password) {
        return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios" });
    }

    try {
        const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: "El usuario ya está registrado" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
        const values = [name, email, hashedPassword, role || "usuario"];

        await db.query(sql, values);
        res.status(201).json({ message: "Usuario registrado exitosamente" });
    } catch (error) {
        console.error("Error en el registro:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Login de usuario**
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email y contraseña son obligatorios" });
    }

    try {
        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
        if (user.length === 0) {
            return res.status(400).json({ message: "Usuario no encontrado" });
        }

        const validPassword = await bcrypt.compare(password, user[0].password);
        if (!validPassword) {
            return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        const token = jwt.sign(
            { user_id: user[0].user_id, email: user[0].email, role: user[0].role },
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
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
    try {
        const [users] = await db.query("SELECT user_id, name, email, role FROM users");
        res.json(users);
    } catch (error) {
        console.error("Error al obtener usuarios:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// **Actualizar usuario**
router.put("/:id", verifyToken, async (req, res) => {
    const { name, email, role } = req.body;
    const userId = req.params.id;

    if (!name && !email && !role) {
        return res.status(400).json({ message: "Debe proporcionar al menos un campo para actualizar" });
    }

    try {
        const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

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
router.delete("/:id", verifyToken, async (req, res) => {
    const userId = req.params.id;

    try {
        const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
        if (user.length === 0) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
        res.status(200).json({ message: "Usuario eliminado exitosamente" });
    } catch (error) {
        console.error("Error al eliminar usuario:", error);
        res.status(500).json({ message: "Error en el servidor" });
    }
});

// Usar las rutas en la API
app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
