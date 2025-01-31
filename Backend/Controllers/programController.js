const db = require('./Config/db');

// **Iniciar un programa**
exports.startProgram = async (req, res) => {
    const { duration, mode } = req.body;

    if (!duration || !mode) {
        return res.status(400).json({ message: "Duración y modo son obligatorios" });
    }

    try {
        const query = 'INSERT INTO programs (duration, mode) VALUES (?, ?)';
        const [result] = await db.query(query, [duration, mode]);
        res.status(201).json({ message: 'Programa iniciado exitosamente', id: result.insertId });
    } catch (error) {
        console.error("Error al iniciar programa:", error);
        res.status(500).json({ error: error.message });
    }
};

// **Obtener programas activos**
exports.getActivePrograms = async (req, res) => {
    try {
        const query = 'SELECT * FROM programs WHERE active = 1';
        const [programs] = await db.query(query);
        res.json(programs);
    } catch (error) {
        console.error("Error al obtener programas activos:", error);
        res.status(500).json({ error: error.message });
    }
};
