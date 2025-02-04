import express from 'express';
import { User } from '../Routes/user';
import { verifyToken } from '../middleware/auth';
const router = express.Router();

router.get('/profile', verifyToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los datos del perfil' });
  }
});

router.put('/profile', verifyToken, async (req, res) => {
  const { name, email, description, phone, companyInfo } = req.body;
  try {
    const user = await User.findById(req.user.id);
    if (!user) return res.status(404).json({ message: 'Usuario no encontrado' });

    user.name = name || user.name;
    user.email = email || user.email;
    user.description = description || user.description;
    user.phone = phone || user.phone;
    user.companyInfo = companyInfo || user.companyInfo;

    await user.save();
    res.json({ message: 'Datos actualizados con éxito', user });
  } catch (error) {
    res.status(500).json({ message: 'Error al actualizar los datos del perfil' });
  }
});

export default router;
