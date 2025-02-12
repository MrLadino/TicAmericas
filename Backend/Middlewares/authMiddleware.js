const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const verifyToken = (req, res, next) => {
  let token = req.header("Authorization");

  console.log("🔍 Token recibido en backend:", token); // Para depuración

  if (!token) {
    return res.status(401).json({ message: "Acceso denegado. Token requerido en el encabezado 'Authorization'." });
  }

  if (token.startsWith("Bearer ")) {
    token = token.slice(7).trim();
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded.user_id) {
      return res.status(401).json({ message: "Token inválido: Falta 'user_id' en el payload." });
    }

    req.user = {
      user_id: decoded.user_id,
      email: decoded.email || "",
      role: decoded.role || "usuario",
    };

    console.log("✅ Usuario autenticado:", req.user);
    next();
  } catch (error) {
    console.error("❌ Token inválido:", error.message);
    return res.status(403).json({ message: "Token inválido o expirado. Por favor, inicia sesión nuevamente." });
  }
};

const verifyAdmin = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return res.status(403).json({ message: "Acceso denegado. Se requieren permisos de administrador." });
  }
  next();
};

module.exports = { verifyToken, verifyAdmin };
