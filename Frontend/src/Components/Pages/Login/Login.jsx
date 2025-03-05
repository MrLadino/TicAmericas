import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../../../Context/AuthContext";
import logo from "../../../assets/Logo.png";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState("");
  const [adminPassword, setAdminPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (role === "admin" && adminPassword.trim() === "") {
      alert("Debes ingresar la contraseña de admin.");
      setIsLoading(false);
      return;
    }

    try {
      const success = await login(
        email,
        password,
        rememberMe,
        role === "admin" ? adminPassword : null
      );
      if (success) navigate("/home");
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
        <div className="text-center mb-6">
          <img src={logo} alt="Logo de la empresa" className="w-20 h-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center text-gray-800">Bienvenido</h2>
        <p className="text-center text-gray-500 mb-6">Ingresa tus credenciales para continuar.</p>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Rol */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Rol
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {role === "admin" && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Contraseña de Admin
              </label>
              <input
                type="password"
                value={adminPassword}
                onChange={(e) => setAdminPassword(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500"
                placeholder="Contraseña de admin"
                required
              />
            </div>
          )}

          {/* Recuérdame y ¿Olvidaste tu contraseña? */}
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
            <Link to="/forgot-password" className="text-sm text-red-500 hover:underline">
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isLoading ? "bg-red-400 cursor-not-allowed" : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Iniciar sesión"}
          </button>
        </form>

        {/* ¿No tienes cuenta? */}
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
