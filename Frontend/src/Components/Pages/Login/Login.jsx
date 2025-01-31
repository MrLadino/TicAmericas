import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import logo from "../../../assets/Logo.png"; // Reemplaza con la ruta correcta del logo

const Login = () => {
  const { login } = useAuth(); // Hook para acceder al contexto de autenticación
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [role, setRole] = useState(""); // Estado para el rol seleccionado
  const [adminPassword, setAdminPassword] = useState(""); // Estado para la contraseña de admin
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const success = await login(email, password);
      console.log("Inicio de sesión exitoso:", success);
      if (success) {
        navigate("/home"); // Redirige al usuario a la página de inicio
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error.message);
      alert(error.message);
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
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Bienvenido
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Ingresa tus credenciales para continuar.
        </p>
        {/* Formulario */}
        <form onSubmit={handleSubmit}>
          {/* Campo de correo electrónico */}
          <div className="mb-4">
            <label
              htmlFor="email"
              className="block text-sm font-semibold text-gray-700"
            >
              Correo electrónico
            </label>
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
            <label
              htmlFor="password"
              className="block text-sm font-semibold text-gray-700"
            >
              Contraseña
            </label>
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
          {/* Menú desplegable para seleccionar el rol */}
          <div className="mb-4">
            <label
              htmlFor="role"
              className="block text-sm font-semibold text-gray-700"
            >
              Rol
            </label>
            <select
              id="role"
              name="role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="admin">Admin</option>
              <option value="usuario">Usuario</option>
            </select>
          </div>
          {/* Campo de contraseña de admin (solo si se selecciona admin) */}
          {role === "admin" && (
            <div className="mb-4">
              <label
                htmlFor="adminPassword"
                className="block text-sm font-semibold text-gray-700"
              >
                Contraseña de Admin
              </label>
              <input
                type="password"
                id="adminPassword"
                name="adminPassword"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ingresa la contraseña de admin"
                required={role === "admin"}
              />
            </div>
          )}
          {/* Checkbox de recordar */}
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
            <a href="#recuperar" className="text-sm text-red-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </a>
          </div>
          {/* Botón de inicio de sesión */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>
        {/* Enlace para registrarse */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿No tienes una cuenta?{" "}
            <Link to="/signup" className="text-red-500 hover:underline">
              Regístrate
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
