const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const requestAdminRole = async (req, res) => {
  const { email, name } = req.body;

  try {
    const msg = {
      to: process.env.ADMIN_EMAIL, // Correo del administrador
      from: process.env.SYSTEM_EMAIL, // Correo configurado en SendGrid
      subject: 'Solicitud de rol de administrador',
      text: `El usuario ${name} (${email}) ha solicitado el rol de administrador.`,
    };

    await sgMail.send(msg);
    res.status(200).json({ message: 'Solicitud enviada correctamente.' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al enviar la solicitud.' });
  }
};

module.exports = { requestAdminRole };
