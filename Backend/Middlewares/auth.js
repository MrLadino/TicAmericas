const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

dotenv.config();

// Middleware para verificar tokens
const verifyToken = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado, token requerido" });
    }

    try {
        const verified = jwt.verify(token.replace("Bearer ", ""), process.env.JWT_SECRET);
        req.user = verified;
        next();
    } catch (error) {
        res.status(400).json({ message: "Token inválido" });
    }
};

// Middleware para verificar si el usuario es admin
const verifyAdmin = (req, res, next) => {
    if (req.user.role !== 'admin') {
        return res.status(403).json({ message: "No tienes permisos para realizar esta acción" });
    }
    next();
};

module.exports = { verifyToken, verifyAdmin };
