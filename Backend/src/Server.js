const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('../Routes/authRoutes'); // Importar las rutas de auth

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Rutas de autenticación
app.use('/api/auth', authRoutes);

const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});


const app = require('./app');

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});
