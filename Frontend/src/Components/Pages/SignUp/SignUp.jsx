import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../assets/Logo.png";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState("");
  const [adminCode, setAdminCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMessage("");

    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden.");
      return;
    }

    // Si rol es admin, exige que se ingrese un código
    if (role === "admin" && adminCode.trim() === "") {
      setError("Debes ingresar el código de autorización para admin.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        name: email.split("@")[0],
        role,
        adminCode: role === "admin" ? adminCode : undefined,
      });

      setIsLoading(false);
      setSuccessMessage(response.data.message);

      // Espera 5 segundos y redirige a login
      setTimeout(() => {
        navigate("/login");
      }, 5000);
    } catch (err) {
      setIsLoading(false);
      if (err.response) {
        setError(err.response.data.message || "Error en el registro.");
      } else {
        setError("Error de conexión con el servidor.");
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <div className="text-center mb-6">
          <img src={logo} alt="Logo de la empresa" className="w-20 h-20 mx-auto" />
        </div>
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">
          Crear Cuenta
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Ingresa tus datos para registrarte.
        </p>

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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Confirm Password */}
          <div className="mb-4">
            <label className="block text-sm font-semibold text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Repite tu contraseña"
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
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              required
            >
              <option value="">Selecciona un rol</option>
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {/* Código Admin */}
          {role === "admin" && (
            <div className="mb-4">
              <label className="block text-sm font-semibold text-gray-700">
                Código de Autorización (Admin)
              </label>
              <input
                type="text"
                value={adminCode}
                onChange={(e) => setAdminCode(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                placeholder="Ingresa el código de autorización"
                required
              />
              <p className="text-xs text-gray-500 mt-1">
                Si no lo tienes, se enviará una solicitud al administrador.
              </p>
            </div>
          )}

          {/* Mensajes */}
          {error && (
            <p className="text-red-500 text-sm mb-4 text-center">{error}</p>
          )}
          {successMessage && (
            <p className="text-green-500 text-sm mb-4 text-center">
              {successMessage}
            </p>
          )}

          {/* Botón */}
          <div className="mb-4">
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 focus:outline-none"
            >
              {isLoading ? "Cargando..." : "Crear Cuenta"}
            </button>
          </div>
        </form>

        {/* ¿Ya tienes cuenta? */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <span
              onClick={() => navigate("/login")}
              className="text-red-500 hover:underline cursor-pointer"
            >
              Inicia sesión
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
