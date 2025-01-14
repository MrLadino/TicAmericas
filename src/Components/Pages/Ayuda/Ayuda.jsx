// import React from 'react';
// import perfil1 from "../../../assets/Perfil1.png";
// import perfil2 from "../../../assets/Perfil2.png";
// import perfil3 from "../../../assets/Perfil3.png";

const Ayuda = () => {
  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center text-[#000000] mb-8">Manual de Usuario</h1>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">Bienvenido a TIC Americas</h2>
        <p className="text-lg text-[#000000]">
          ¡Gracias por visitar TIC Americas! Este manual ha sido creado para guiarte a través de las diferentes funciones de nuestro sitio web, facilitando su uso. Aquí podrás encontrar instrucciones detalladas sobre cómo navegar por la plataforma, cómo crear, editar y eliminar productos, actualizar tu perfil, y muchas otras características esenciales para aprovechar al máximo nuestros servicios. Sigue leyendo y descubre todo lo que nuestro sitio tiene para ofrecerte.
        </p>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">1. Iniciar Programa</h2>
        <p className="text-lg text-[#000000]">
          En esta sección podrás gestionar el funcionamiento principal de TIC Americas, como establecer horarios de operación y modo de funcionamiento continuo.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">1.1 Establecer Horarios de Operación</h3>
          <p className="text-lg text-[#000000]">Configura los días y horas en los que la tienda estará disponible para compras.</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">1.2 Modo de Funcionamiento Continuo</h3>
          <p className="text-lg text-[#000000]">Permite activar un modo de operación que mantenga el sitio disponible 24/7.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">2. Login (Iniciar Sesión)</h2>
        <p className="text-lg text-[#000000]">
          Para acceder a tu cuenta, dirígete a la página de login. Aquí deberás ingresar tu correo electrónico y contraseña. Si aún no tienes una cuenta, puedes registrarte en la sección de Signup.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">2.1 Campos de Login</h3>
          <p className="text-lg text-[#000000]">Se requiere que ingreses tu correo electrónico y contraseña. Si olvidaste tu contraseña, hay una opción para restablecerla.</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">2.2 Botón de Iniciar Sesión</h3>
          <p className="text-lg text-[#000000]">Una vez ingresados tus datos, presiona el botón Iniciar Sesión para acceder a tu cuenta.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">3. Signup (Registro)</h2>
        <p className="text-lg text-[#000000]">
          Si no tienes una cuenta, puedes crear una fácilmente en la sección de Signup. Deberás ingresar tu correo electrónico, crear una contraseña y confirmar tu contraseña.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">3.1 Campos de Registro</h3>
          <p className="text-lg text-[#000000]">Debes ingresar tu correo electrónico, contraseña, y confirmar la contraseña.</p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">3.2 Botón de Registro</h3>
          <p className="text-lg text-[#000000]">Después de completar los campos, presiona el botón Crear Cuenta para completar el registro.</p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">4. Gestión de Productos</h2>
        <p className="text-lg text-[#000000]">
          La sección de productos permite administrar los productos de tu tienda, organizándolos por categorías, añadiendo nuevos productos, y realizando búsquedas rápidas.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">4.1 Categorías de Productos</h3>
          <p className="text-lg text-[#000000]">
            Puedes filtrar los productos según su categoría. Usa el menú desplegable para seleccionar una categoría específica. Si deseas agregar una nueva categoría, haz clic en el botón <strong>Agregar Categoría</strong>, ingresa el nombre de la nueva categoría en el cuadro emergente, y confirma.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">4.2 Búsqueda de Categorías</h3>
          <p className="text-lg text-[#000000]">
            Utiliza la barra de búsqueda para encontrar categorías rápidamente. Los términos buscados recientemente aparecerán como sugerencias en un menú desplegable.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">4.3 Agregar Productos</h3>
          <p className="text-lg text-[#000000]">
            Para añadir un nuevo producto, haz clic en el botón <strong>Agregar Producto</strong>. Aparecerá un modal donde podrás ingresar los detalles del producto:
          </p>
          <ul className="list-disc pl-6 text-lg text-[#000000]">
            <li>Nombre del producto</li>
            <li>Descripción</li>
            <li>Precio</li>
            <li>Imagen del producto (opcional)</li>
            <li>Categoría</li>
          </ul>
          <p className="text-lg text-[#000000] mt-2">
            Una vez completados los campos, presiona <strong>Guardar</strong> para añadir el producto a la lista.
          </p>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">4.4 Visualización de Productos</h3>
          <p className="text-lg text-[#000000]">
            Los productos se muestran en una tabla que incluye su imagen, nombre, descripción y precio. Al pasar el cursor sobre las filas de la tabla, se resaltará el producto correspondiente.
          </p>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">5. Cerrar Sesión</h2>
        <p className="text-lg text-[#000000]">
          Para cerrar sesión, simplemente haz clic en el botón Cerrar sesión en la parte superior derecha de la página. Esto garantizará que tu cuenta quede protegida y nadie más pueda acceder a ella.
        </p>
      </section>
    </div>
  );
};

export default Ayuda;
