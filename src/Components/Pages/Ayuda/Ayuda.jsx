// src/Components/Pages/Ayuda/Ayuda.jsx
import React from 'react';
import home1 from "../../../assets/Home1.png";
import home2 from "../../../assets/Home2.png";
import home3 from "../../../assets/Home3.png";
import productos1 from "../../../assets/Productos1.png";
import productos2 from "../../../assets/Productos2.png";
import nosotros1 from "../../../assets/Nosotros1.png";
import nosotros2 from "../../../assets/Nosotros2.png";
import perfil1 from "../../../assets/Perfil1.png";
import perfil2 from "../../../assets/Perfil2.png";
import perfil3 from "../../../assets/Perfil3.png";

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
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">1. Inicio</h2>
        <p className="text-lg text-[#000000]">
          La página de inicio es el punto de partida para explorar todos nuestros servicios. Desde aquí, podrás acceder fácilmente a las diferentes secciones del sitio, incluyendo productos, tu perfil, y más. También encontrarás un resumen de las ofertas y novedades de TIC Americas. Al estar en la página de inicio, tendrás una visión clara y organizada de lo que ofrecemos y cómo acceder a ello.
        </p>
        <div className="flex justify-center mt-4">
          <div className="bg-[#f5f5f5] p-6 rounded-lg w-full">
            <div className="flex justify-between gap-4">
              <img src={home1} alt="Imagen 1" className="w-1/4 rounded-lg" />
              <img src={home2} alt="Imagen 2" className="w-1/4 rounded-lg" />
              <img src={home3} alt="Imagen 3" className="w-1/4 rounded-lg" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#000000]">1.1 Información sobre la Página de Inicio</h3>
              <p className="text-lg text-[#000000]">Aquí encontrarás un resumen general de lo que puedes hacer en el sitio.</p>
              <div className="mt-4">
                <img src={home1} alt="Imagen ilustrativa 1" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">2. Nosotros</h2>
        <p className="text-lg text-[#000000]">
          En la sección "Nosotros", podrás conocer más sobre TIC Americas, nuestra misión, visión, y los valores que guían nuestro trabajo. Conocerás el equipo que hace posible esta plataforma y cómo nos esforzamos por ofrecer un servicio excepcional a todos nuestros usuarios. Además, encontrarás información de contacto, nuestros métodos de trabajo y cómo nos aseguramos de estar siempre a la vanguardia en tecnología y servicio al cliente.
        </p>
        <div className="flex justify-center mt-4">
          <div className="bg-[#f5f5f5] p-6 rounded-lg w-full">
            <div className="flex justify-between gap-4">
              <img src={nosotros1} alt="Imagen 1" className="w-1/4 rounded-lg" />
              <img src={nosotros2} alt="Imagen 2" className="w-1/4 rounded-lg" />
            </div>
            <div className="mt-6">
              <h3 className="text-xl font-semibold text-[#000000]">2.1 Conoce Más sobre TIC Americas</h3>
              <p className="text-lg text-[#000000]">Aquí podrás obtener detalles sobre la historia, misión y visión de nuestra empresa.</p>
              <div className="mt-4">
                <img src={nosotros1} alt="Imagen ilustrativa 2" className="w-full rounded-lg" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">3. Productos</h2>
        <p className="text-lg text-[#000000]">
          En la sección de productos, podrás ver una amplia variedad de artículos que ofrecemos. Desde productos electrónicos hasta artículos de uso diario, siempre estamos actualizando nuestro catálogo con lo mejor del mercado. Cada producto tiene una descripción detallada, imágenes, y opciones para realizar compras de forma sencilla. También encontrarás ofertas especiales y promociones que te permitirán obtener más por tu dinero.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">3.1 Agregar Categoría</h3>
          <p className="text-lg text-[#000000]">Aquí podrás agregar nuevas categorías de productos para organizar mejor nuestro catálogo.</p>
          <div className="mt-4">
            <img src={productos1} alt="Imagen Agregar Categoría" className="w-full rounded-lg" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">3.2 Agregar Producto</h3>
          <p className="text-lg text-[#000000]">Desde esta opción podrás añadir nuevos productos a la tienda.</p>
          <div className="mt-4">
            <img src={productos2} alt="Imagen Agregar Producto" className="w-full rounded-lg" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">3.3 Filtrar Productos por Categoría</h3>
          <p className="text-lg text-[#000000]">Filtra los productos de acuerdo con la categoría para facilitar la búsqueda.</p>
          <div className="mt-4">
            <img src={productos1} alt="Imagen Filtrar Productos" className="w-full rounded-lg" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">4. Perfil</h2>
        <p className="text-lg text-[#000000]">
          En la sección "Perfil", puedes gestionar toda tu información personal. Desde allí, puedes actualizar tu nombre, correo electrónico, foto de perfil, y más. También es posible cambiar la contraseña y gestionar tus preferencias de notificaciones. Asegúrate de mantener tu perfil actualizado para disfrutar de una experiencia más personalizada y asegurarte de recibir información relevante.
        </p>
        <div className="mt-4">
          <h3 className="text-xl font-semibold text-[#000000]">4.1 Cambiar Foto de Perfil</h3>
          <p className="text-lg text-[#000000]">Aquí podrás subir o cambiar tu foto de perfil para personalizar tu cuenta.</p>
          <div className="mt-4">
            <img src={perfil1} alt="Imagen Cambiar Foto" className="w-full rounded-lg" />
          </div>
        </div>
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-[#000000]">4.2 Actualizar Datos de Perfil o Empresa</h3>
          <p className="text-lg text-[#000000]">Puedes actualizar tu información personal o los datos relacionados con la empresa a la que estás asociado.</p>
          <div className="mt-4">
            <img src={perfil2} alt="Imagen Actualizar Datos" className="w-full rounded-lg" />
          </div>
        </div>
      </section>

      <section className="mb-12">
        <h2 className="text-3xl font-semibold text-[#000000] mb-4">5. Log Out</h2>
        <p className="text-lg text-[#000000]">
          Para cerrar sesión, simplemente haz clic en el botón "Log Out" ubicado en la parte superior derecha de la página. Esto te desconectará de tu cuenta de manera segura, asegurando que tu información personal se mantenga protegida. Asegúrate de cerrar sesión cuando termines de usar el sitio, especialmente si estás utilizando un dispositivo público o compartido.
        </p>
      </section>
    </div>
  );
};

export default Ayuda;
