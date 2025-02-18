// server.js
const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const cors = require("cors");
const db = require("./Config/db"); // Conexión a la BD
const path = require("path");
const multer = require("multer");
const fs = require("fs");
const { verifyToken, verifyAdmin } = require("./Middlewares/authMiddleware");

dotenv.config();

const app = express();
const router = express.Router();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Asegurarse de que la carpeta "uploads" exista
const uploadDir = path.join(__dirname, "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Hacer pública la carpeta "uploads"
app.use("/uploads", express.static(uploadDir));

// Configuración de Multer para subida de imágenes (para el endpoint /upload)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Formato de archivo no permitido"), false);
  }
};
const upload = multer({ storage, fileFilter });

// ===================== AUTENTICACIÓN ===================== //
router.post("/signup", async (req, res) => {
  const { name, email, password, role } = req.body;
  if (!name || !email || !password) {
    return res.status(400).json({ message: "Nombre, email y contraseña son obligatorios." });
  }
  try {
    const [existingUser] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "El usuario ya está registrado." });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const sql = `INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)`;
    const values = [name, email, hashedPassword, role || "usuario"];
    await db.query(sql, values);
    res.status(201).json({ message: "Usuario registrado exitosamente." });
  } catch (error) {
    console.error("Error en el registro:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: "Email y contraseña son obligatorios." });
  }
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: "Usuario no encontrado." });
    }
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: "Contraseña incorrecta." });
    }
    const token = jwt.sign(
      { user_id: user[0].user_id, email: user[0].email, role: user[0].role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
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

// ===================== PERFIL DEL USUARIO ===================== //
router.get("/profile", verifyToken, async (req, res) => {
  try {
    const userId = req.user.user_id;
    const [result] = await db.query(
      `SELECT 
          u.user_id, u.name, u.email, u.role, u.phone, u.profile_photo, u.description,
          c.name AS companyName, c.description AS companyDescription, 
          c.location AS companyLocation, c.phone AS companyPhone, c.photo AS companyPhoto
       FROM users u 
       LEFT JOIN companies c ON u.user_id = c.user_id 
       WHERE u.user_id = ?`,
      [userId]
    );
    if (result.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    res.status(200).json(result[0]);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.put("/profile", verifyToken, async (req, res) => {
  const {
    name,
    email,
    description,
    phone,
    profile_photo,
    companyName,
    companyDescription,
    companyLocation,
    companyPhone,
    companyPhoto,
  } = req.body;
  const userId = req.user.user_id;
  try {
    await db.query(
      `UPDATE users SET name = ?, email = ?, description = ?, phone = ?, profile_photo = ?
       WHERE user_id = ?`,
      [name, email, description, phone, profile_photo, userId]
    );
    const [existingCompany] = await db.query("SELECT * FROM companies WHERE user_id = ?", [userId]);
    if (existingCompany.length > 0) {
      await db.query(
        `UPDATE companies 
         SET name = ?, description = ?, location = ?, phone = ?, photo = ?
         WHERE user_id = ?`,
        [companyName, companyDescription, companyLocation, companyPhone, companyPhoto, userId]
      );
    } else {
      await db.query(
        `INSERT INTO companies (user_id, name, description, location, phone, photo)
         VALUES (?, ?, ?, ?, ?, ?)`,
        [userId, companyName, companyDescription, companyLocation, companyPhone, companyPhoto]
      );
    }
    res.status(200).json({ message: "Perfil y empresa actualizados exitosamente." });
  } catch (error) {
    console.error("Error al actualizar perfil:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.post("/upload", verifyToken, upload.single("file"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "No se subió ninguna imagen." });
  }
  const imageUrl = `http://localhost:5000/uploads/${req.file.filename}`;
  const userId = req.user.user_id;
  try {
    await db.query("UPDATE users SET profile_photo = ? WHERE user_id = ?", [imageUrl, userId]);
    res.status(200).json({ message: "Imagen subida correctamente", fileUrl: imageUrl });
  } catch (error) {
    console.error("Error al subir la imagen:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

// ===================== PUBLICIDAD (ADVERTISING) ===================== //
const advertisingRoutes = require("./Routes/advertising");
app.use("/api/advertising", advertisingRoutes);

// ===================== PRODUCTOS ===================== //
const productosRoutes = require("./Routes/productos");
app.use("/api/productos", productosRoutes);

// ===================== ADMINISTRACIÓN (USUARIOS) ===================== //
router.get("/", verifyToken, verifyAdmin, async (req, res) => {
  try {
    const [users] = await db.query("SELECT user_id, name, email, role FROM users");
    res.json(users);
  } catch (error) {
    console.error("Error al obtener usuarios:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

router.delete("/:id", verifyToken, verifyAdmin, async (req, res) => {
  const userId = req.params.id;
  if (req.user.user_id == userId) {
    return res.status(403).json({ message: "No puedes eliminar tu propia cuenta." });
  }
  try {
    const [user] = await db.query("SELECT * FROM users WHERE user_id = ?", [userId]);
    if (user.length === 0) {
      return res.status(404).json({ message: "Usuario no encontrado." });
    }
    await db.query("DELETE FROM users WHERE user_id = ?", [userId]);
    res.status(200).json({ message: "Usuario eliminado exitosamente." });
  } catch (error) {
    console.error("Error al eliminar usuario:", error);
    res.status(500).json({ message: "Error en el servidor." });
  }
});

app.use("/api", router);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en el puerto ${PORT}`);
});
