import { useState } from "react";
import logo from "../../../assets/Logo.png"; // Importación del logo
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // Estado para el rol
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminNotified, setIsAdminNotified] = useState(false); // Notificación para admin
  const [error, setError] = useState(""); // Estado para manejar errores
  const [successMessage, setSuccessMessage] = useState(""); // Estado para el mensaje de éxito

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      return;
    }

    setError(""); // Limpiar el mensaje de error previo
    setIsLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/signup", {
        email,
        password,
        name: email.split("@")[0], // Se toma la parte antes del '@' como nombre
        role, 
      });

      setIsLoading(false);
      setSuccessMessage(response.data.message);
      setError(""); // Limpiar errores

      // Si es admin, muestra la notificación
      if (role === "admin") {
        setIsAdminNotified(true);
      }
    } catch (error) {
      setIsLoading(false);
      if (error.response) {
        setError(error.response.data.message || "Hubo un error en el registro.");
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
        <h2 className="text-2xl font-bold text-center mb-4 text-gray-800">Crear Cuenta</h2>
        <p className="text-center text-gray-500 mb-6">Ingresa tus datos para registrarte.</p>
        <form onSubmit={handleSubmit}>
          {/* Correo electrónico */}
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="tucorreo@ejemplo.com"
              required
            />
          </div>

          {/* Contraseña */}
          <div className="mb-4">
            <label htmlFor="password" className="block text-sm font-semibold text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
              placeholder="Ingresa tu contraseña"
              required
            />
          </div>

          {/* Confirmar Contraseña */}
          <div className="mb-4">
            <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700">
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border ${
                error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-red-500"
              } rounded-lg focus:outline-none`}
              placeholder="Confirma tu contraseña"
              required
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
          </div>

          {/* Seleccionar Rol */}
          <div className="mb-4">
            <label htmlFor="role" className="block text-sm font-semibold text-gray-700">
              Rol
            </label>
            <select
              id="role"
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

          {/* Notificación si es Admin */}
          {isAdminNotified && role === "admin" && (
            <div className="mb-4 text-center text-sm text-red-500">
              Este rol requiere autorización. Serás notificado cuando se apruebe.
            </div>
          )}

          {/* Mensaje de éxito */}
          {successMessage && (
            <div className="mb-4 text-center text-sm text-green-500">{successMessage}</div>
          )}

          {/* Botón de Crear Cuenta */}
          <div className="mb-4">
            <button
              type="submit"
              className="w-full bg-red-500 text-white p-3 rounded-lg font-semibold hover:bg-red-600 focus:outline-none"
              disabled={isLoading}
            >
              {isLoading ? "Cargando..." : "Crear Cuenta"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
