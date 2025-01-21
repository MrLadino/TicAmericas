import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../Context/AuthContext'; // Importa el hook de autenticación
import logo from '../../../assets/Logo.png'; // Importación del logo
import { Link } from 'react-router-dom'; // Importa Link

const Login = () => {
  const { login } = useAuth(); // Usar el método de login del contexto
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // Hook para redirigir

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Intentamos iniciar sesión
      const success = await login(email, password);
      if (success) {
        navigate('/home'); // Redirige al usuario a la página de inicio
      } else {
        // Puedes agregar una validación para mostrar un error si el login falla
        alert("Credenciales incorrectas");
      }
    } catch (error) {
      console.error('Error al iniciar sesión', error);
      alert("Hubo un problema al iniciar sesión");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        {/* Logo */}
        <div className="text-center mb-6">
          <img
            src={logo}
            alt="Logo de la empresa"
            className="w-20 h-20 mx-auto"
          />
        </div>
        {/* Título */}
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Bienvenido</h2>
        <p className="text-center text-gray-500 mb-6">
          Ingresa tus credenciales para continuar.
        </p>
        <form onSubmit={handleSubmit}>
          {/* Campo de correo */}
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
          {/* Campo de contraseña */}
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
          {/* Recordarme */}
          <div className="flex items-center justify-between mb-6">
            <label className="flex items-center text-sm text-gray-600">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="h-4 w-4 text-red-500 border-gray-300 rounded focus:ring-red-400"
              />
              <span className="ml-2">Recuérdame</span>
            </label>
            <a href="#recuperar" className="text-sm text-red-500 hover:underline">¿Olvidaste tu contraseña?</a>
          </div>
          {/* Botón de inicio */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${isLoading ? 'bg-red-400 cursor-not-allowed' : 'bg-red-500 hover:bg-red-600'}`}
            disabled={isLoading}
          >
            {isLoading ? 'Cargando...' : 'Iniciar sesión'}
          </button>
        </form>
        {/* Registro */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <Link to="/signup" className="text-red-500 hover:underline">Regístrate</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
