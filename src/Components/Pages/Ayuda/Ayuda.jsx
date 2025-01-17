const Ayuda = () => {
  return (
    <div className="container mx-auto p-8 bg-gray-50 rounded-xl shadow-xl">
      <h1 className="text-5xl font-extrabold text-center text-[#000000] mb-10">Manual de Usuario - TIC Americas</h1>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">Bienvenido a TIC Americas</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          ¡Gracias por elegir TIC Americas! Este manual está diseñado para guiarte de manera sencilla y completa por todas las funcionalidades de nuestro sitio web, optimizando tu experiencia. Aquí podrás descubrir cómo aprovechar cada característica de nuestra plataforma, desde la gestión de productos, pasando por las configuraciones de horarios de operación, hasta el uso de nuestro sistema de lectura de códigos de barras para una experiencia de compra dinámica y eficiente. Sigue leyendo para familiarizarte con todos los aspectos que te ayudarán a sacar el máximo provecho de TIC Americas.
        </p>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">1. Lector Estático</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          El Lector Estático es una herramienta esencial para administrar los horarios y el funcionamiento de tu tienda de manera flexible. A través de esta sección, podrás establecer la operación de tu plataforma, ya sea en un horario específico o de manera continua, sin interrupciones. Todo esto se adapta a las necesidades de tu negocio, asegurando que puedas gestionar el tiempo de manera eficiente.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">1.1 Configuración de Horarios de Operación</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Esta opción te permite definir los días y horas en que tu tienda estará disponible para los clientes. Puedes configurar horarios específicos para días laborales, fines de semana o establecer horarios personalizados para eventos especiales. La flexibilidad que ofrecemos te permite adaptarte a cualquier tipo de operación, ya sea para un funcionamiento limitado o para estar disponible todo el día.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">1.2 Modo de Funcionamiento Continuo</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Si tu tienda requiere estar disponible sin interrupciones, el modo 24/7 es perfecto para ti. Activando esta opción, podrás garantizar que tu plataforma esté siempre en funcionamiento, permitiendo a los clientes realizar compras en cualquier momento, sin restricciones de horario. Este modo es ideal para negocios que operan globalmente o para aquellos que desean ofrecer disponibilidad continua a sus usuarios.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">1.3 Configuración de Duración de Operación</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Si prefieres que tu tienda esté operativa solo por un período determinado, puedes establecer una duración específica para la operación. Ya sea por horas o días, este ajuste te permitirá controlar con precisión cuándo comienza y termina el funcionamiento del sistema, lo que te da un control absoluto sobre el tiempo de actividad de tu tienda.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">2. Caja - Lector Dinámico de Códigos</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          La sección de la Caja permite el uso del lector dinámico de códigos de barras o QR. Al escanear un código, la plataforma mostrará automáticamente la tarjeta con los detalles del producto en la pantalla. Este sistema ofrece una experiencia más fluida y ágil tanto para los vendedores como para los clientes, al reducir el tiempo de búsqueda y facilitar el proceso de compra.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">2.1 Lector de Códigos de Barras</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            El lector de códigos de barras es una herramienta rápida y eficiente para identificar productos dentro del sistema. Cada vez que escaneas el código de un producto, la plataforma lo identifica automáticamente y cambia el slider por una tarjeta con la información del producto: nombre, descripción, precio, y más. Esto mejora la eficiencia en el proceso de ventas y ayuda a proporcionar una experiencia de compra sin fricciones.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">3. Login (Iniciar Sesión)</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          El acceso a tu cuenta es seguro y sencillo. A través de la página de login, podrás ingresar a tu cuenta con tu correo electrónico y contraseña. Si aún no tienes una cuenta, podrás crearla en la sección de Signup. Este proceso garantiza que tu información esté protegida y solo tú tengas acceso a tus datos.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">3.1 Campos de Login</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Para iniciar sesión, debes ingresar tu correo electrónico y contraseña. Asegúrate de que tus datos sean correctos. Si has olvidado tu contraseña, puedes hacer clic en el enlace de Olvidé mi contraseña para restablecerla de manera rápida y segura.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">3.2 Botón de Iniciar Sesión</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Una vez que hayas ingresado correctamente tus datos, haz clic en el botón Iniciar Sesión para acceder a tu cuenta y comenzar a utilizar la plataforma.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">4. Signup (Registro)</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          Si aún no tienes una cuenta, puedes registrarte rápidamente en la sección de Signup. Solo necesitas ingresar tu correo electrónico, crear una contraseña segura y confirmarla. Una vez registrado, podrás acceder a todas las funciones de TIC Americas y gestionar tu tienda de manera sencilla.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">4.1 Campos de Registro</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            En la sección de registro, deberás ingresar tu correo electrónico, crear una contraseña segura (con al menos 8 caracteres, incluyendo números y símbolos), y confirmar la contraseña para evitar errores. Este proceso es rápido y seguro, y te permitirá acceder a la plataforma de manera inmediata.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">4.2 Botón de Registro</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Al completar los campos de registro, haz clic en el botón Crear Cuenta. Esto te permitirá registrarte y acceder al panel de control de tu tienda.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">5. Gestión de Productos</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          La gestión de productos es una de las funciones principales de TIC Americas. Aquí podrás agregar, editar, eliminar y organizar tus productos en diferentes categorías. La plataforma permite una administración eficiente, asegurando que puedas gestionar tu inventario de manera ágil.
        </p>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">5.1 Categorías de Productos</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Organiza tus productos en categorías para facilitar su búsqueda y orden. Puedes crear nuevas categorías según las necesidades de tu tienda y filtrarlas para visualizar productos relacionados. Este sistema mejora la navegación dentro de la plataforma.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">5.2 Agregar Productos</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Agregar un nuevo producto es fácil y rápido. Solo necesitas ingresar los detalles del producto, como nombre, precio, descripción y foto. Una vez guardado, el producto estará disponible en tu tienda online para que los clientes lo compren.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">5.3 Editar Productos</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Para editar un producto, accede a la sección de productos y selecciona el que deseas modificar. Podrás cambiar su nombre, precio, descripción, imágenes y otros detalles importantes. Los cambios se guardarán de forma inmediata, asegurando que tu inventario esté siempre actualizado.
          </p>
        </div>
        <div className="mt-8">
          <h3 className="text-2xl font-semibold text-[#000000]">5.4 Eliminar Productos</h3>
          <p className="text-lg text-[#000000] leading-relaxed">
            Si deseas eliminar un producto, solo debes seleccionarlo y hacer clic en el botón de eliminar. Se te pedirá una confirmación para asegurarte de que realmente deseas eliminarlo. Este paso es irreversible, por lo que es importante tener cuidado al eliminar productos.
          </p>
        </div>
      </section>

      <section className="mb-16">
        <h2 className="text-4xl font-semibold text-[#000000] mb-6">6. Cierre de Sesión</h2>
        <p className="text-lg text-[#000000] leading-relaxed">
          Cuando hayas terminado de utilizar la plataforma, es importante cerrar sesión para garantizar que tu cuenta esté protegida. Haz clic en el botón de Cerrar Sesión para salir de tu cuenta de manera segura. Esto evitará que otras personas accedan a tu información personal y empresarial.
        </p>
      </section>
    </div>
  );
};

export default Ayuda;
