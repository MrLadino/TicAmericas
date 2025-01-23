import { useState } from 'react';
import logo from '../../../assets/Logo.png'; // Importación del logo

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulación de registro
    setTimeout(() => {  
      console.log('Registro exitoso:', { email, password });
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo de la empresa"
            className="w-20 h-20 mx-auto"
          />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Crear Cuenta</h2>
        <p className="text-center text-gray-500 mb-6">Ingresa tus datos para crear una cuenta.</p>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">Confirmar Contraseña</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Confirma tu contraseña"
              required
            />
          </div>
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Crear Cuenta'}
          </button>
        </form>
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">¿Ya tienes una cuenta?{' '}
            <a href="/login" className="text-red-500 hover:underline">Iniciar sesión</a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
