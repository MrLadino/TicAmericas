const db = require('../Config/db');  // Conexión a la base de datos

// Obtener todos los usuarios
const getUsers = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM users');
        res.status(200).json(rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
};

// Obtener un usuario por ID
const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const [rows] = await db.query('SELECT * FROM users WHERE id = ?', [id]);
        if (rows.length > 0) {
            res.status(200).json(rows[0]);
        } else {
            res.status(404).json({ message: 'Usuario no encontrado' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al obtener el usuario' });
    }
};

// Crear un nuevo usuario
const createUser = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const [result] = await db.query(
            'INSERT INTO users (name, email, password) VALUES (?, ?, ?)', 
            [name, email, password]
        );
        res.status(201).json({ message: 'Usuario creado con éxito', userId: result.insertId });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

module.exports = { getUsers, getUserById, createUser };
