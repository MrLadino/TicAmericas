const mongoose = require("mongoose");
const bcrypt = require("bcrypt"); // Para encriptar contraseñas

const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "El email es obligatorio"], // Mensaje de error personalizado
    unique: true,
    trim: true,
    lowercase: true,
    match: [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
      "Por favor, ingresa un email válido",
    ], // Validación de formato de email
  },
  password: {
    type: String,
    required: [true, "La contraseña es obligatoria"], // Mensaje de error personalizado
    minlength: [6, "La contraseña debe tener al menos 6 caracteres"], // Longitud mínima
  },
}, {
  timestamps: true, // Agrega campos createdAt y updatedAt automáticamente
});

// Middleware para encriptar la contraseña antes de guardar o actualizar
UserSchema.pre("save", async function (next) {
  try {
    // Si la contraseña no fue modificada, pasar al siguiente middleware
    if (!this.isModified("password")) return next();

    // Generar un salt y encriptar la contraseña
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);

    next();
  } catch (error) {
    next(error); // Pasar cualquier error al middleware de manejo de errores
  }
});

// Método para comparar contraseñas ingresadas con la almacenada
UserSchema.methods.matchPassword = async function (enteredPassword) {
  try {
    return await bcrypt.compare(enteredPassword, this.password);
  } catch (error) {
    throw new Error("Error al comparar contraseñas");
  }
};

// Capturar errores de índice único (como el email) y transformarlos
UserSchema.post("save", function (error, doc, next) {
  if (error.name === "MongoServerError" && error.code === 11000) {
    next(new Error("El email ya está registrado"));
  } else {
    next(error); // Pasar otros errores al middleware de manejo de errores
  }
});

module.exports = mongoose.model("User", UserSchema);
