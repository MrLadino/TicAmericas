const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../Routes/user'); // Asegúrate de que la ruta sea correcta

// Función para crear un nuevo usuario
const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Validaciones básicas
    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Todos los campos son requeridos" });
    }

    // Validación de correo electrónico
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Correo electrónico inválido" });
    }

    // Verificar si el correo electrónico ya existe
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "El correo electrónico ya está en uso" });
    }

    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    // Guardar el usuario en la base de datos
    await newUser.save();

    // Generar JWT
    const token = jwt.sign({ userId: newUser._id, role: newUser.role }, 'tu_secreto', { expiresIn: '1h' });

    res.status(201).json({ message: "Usuario creado exitosamente", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message || "Error al crear el usuario" });
  }
};

module.exports = {
  registerUser,
};
