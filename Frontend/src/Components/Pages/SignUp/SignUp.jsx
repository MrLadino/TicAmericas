import { useState } from "react";
import logo from "../../../assets/Logo.png"; // Importación del logo

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState(""); // Estado para el rol
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminNotified, setIsAdminNotified] = useState(false); // Notificación para admin
  const [error, setError] = useState(""); // Estado para manejar errores

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validar que las contraseñas coincidan
    if (password !== confirmPassword) {
      setError("Las contraseñas no coinciden. Por favor, inténtalo de nuevo.");
      setConfirmPassword(""); // Vaciar el campo de confirmación
      return;
    }

    setError(""); // Limpiar el mensaje de error previo
    setIsLoading(true);

    if (role === "admin") {
      setIsAdminNotified(true);
      setTimeout(() => {
        console.log("Registro solicitado como admin:", { email, role });
        setIsLoading(false);
      }, 2000);
    } else {
      // Simulación de registro estándar
      setTimeout(() => {
        console.log("Registro exitoso:", { email, password });
        setIsLoading(false);
      }, 2000);
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
          Crear Cuenta
        </h2>
        <p className="text-center text-gray-500 mb-6">
          Ingresa tus datos para crear una cuenta.
        </p>
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
          {/* Confirmar contraseña */}
          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-semibold text-gray-700"
            >
              Confirmar Contraseña
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-3 border ${
                error
                  ? "border-red-500 focus:ring-red-500"
                  : "border-gray-300 focus:ring-red-500"
              } rounded-lg focus:outline-none`}
              placeholder="Confirma tu contraseña"
              required
            />
            {/* Mensaje de error */}
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
          </div>
          {/* Selección de rol */}
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
              <option value="usuario">Usuario</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* Notificación para admin */}
          {isAdminNotified && role === "admin" && (
            <div className="mb-4 text-center text-sm text-red-600">
              Gracias por tu registro como administrador. Por favor, espera
              mientras verificamos tu correo. Nuestro equipo de soporte se
              pondrá en contacto contigo.
            </div>
          )}
          {/* Botón de crear cuenta */}
          <button
            type="submit"
            className={`w-full py-3 rounded-lg text-white font-semibold transition ${
              isLoading
                ? "bg-red-400 cursor-not-allowed"
                : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={isLoading}
          >
            {isLoading ? "Cargando..." : "Crear Cuenta"}
          </button>
        </form>
        {/* Enlace para iniciar sesión */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600">
            ¿Ya tienes una cuenta?{" "}
            <a href="/login" className="text-red-500 hover:underline">
              Iniciar sesión
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
