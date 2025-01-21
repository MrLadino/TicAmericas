import axios from 'axios';

// Función para validar el correo con la API de EmailValidation.io
const validateEmail = async (email) => {
  const apiKey = 'ema_live_TQR5RqsIV8FZOpjYjqr1t1Up8x4joEqPjsrUKIlg'; // Tu clave API
  const baseUrl = 'https://api.emailvalidation.io/v1/info'; // URL base de la API
  const url = `${baseUrl}?apikey=${apiKey}&email=${email}`; // URL completa con parámetros

  try {
    const response = await axios.get(url);
    const data = response.data;

    // Validar el estado y la razón
    if (data.state === 'deliverable' && data.reason === 'valid_mailbox') {
      return { valid: true, message: 'Correo válido' };
    } else {
      return { valid: false, message: data.reason || 'Correo no válido' };
    }
  } catch (error) {
    console.error('Error de validación:', {
      message: error.message,
      code: error.code,
      config: error.config,
    });
    return { valid: false, message: 'Error al validar el correo' };
  }
};

export default validateEmail;
