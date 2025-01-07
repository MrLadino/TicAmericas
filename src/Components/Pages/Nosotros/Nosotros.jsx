// src/Components/Pages/Nosotros/Nosotros.jsx
import React from 'react';

const Nosotros = () => {
  return (
    <section className="container mx-auto p-6 text-center bg-gray-50 min-h-screen">
      {/* Título */}
      <h2 className="text-4xl font-bold text-red-600 mb-6">Nosotros</h2>

      {/* Introducción */}
      <p className="mt-4 text-lg text-gray-700 w-4/5 mx-auto">
        En TIC Americas, nuestra misión es ofrecer soluciones tecnológicas que impacten de manera positiva en el mundo. Creemos en la innovación, el trabajo en equipo y el compromiso con la excelencia.
      </p>

      {/* Historia */}
      <div className="mt-12 bg-white shadow-lg rounded-lg p-8 w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nuestra Historia</h3>
        <p className="text-gray-700">
          Desde nuestros humildes inicios en 2010, hemos crecido hasta convertirnos en una referencia en el desarrollo de tecnologías avanzadas. 
          Comenzamos como un pequeño equipo de entusiastas y ahora somos una familia global comprometida con la creación de soluciones que transforman vidas.
        </p>
      </div>

      {/* Misión y Visión */}
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 w-4/5 mx-auto">
        {/* Misión */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-600 mb-2">Nuestra Misión</h3>
          <p className="text-gray-700">
            Crear herramientas tecnológicas accesibles que simplifiquen procesos, fomenten la innovación y generen un impacto positivo en las comunidades.
          </p>
        </div>
        {/* Visión */}
        <div className="bg-gray-100 shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold text-red-600 mb-2">Nuestra Visión</h3>
          <p className="text-gray-700">
            Ser líderes en el desarrollo de soluciones tecnológicas, promoviendo un futuro más conectado, sostenible y eficiente.
          </p>
        </div>
      </div>

      {/* Valores */}
      <div className="mt-12 w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Nuestros Valores</h3>
        <ul className="list-disc list-inside text-gray-700 text-left">
          <li>Innovación: Siempre buscamos nuevas formas de resolver problemas.</li>
          <li>Compromiso: Trabajamos con pasión para superar expectativas.</li>
          <li>Colaboración: Creemos en el poder del trabajo en equipo.</li>
          <li>Sostenibilidad: Nos esforzamos por un impacto positivo en el medio ambiente y la sociedad.</li>
          <li>Excelencia: Nos aseguramos de que cada detalle cuente.</li>
        </ul>
      </div>

      {/* Testimonios */}
      <div className="mt-12 py-8 bg-gray-100 rounded-lg shadow-md w-4/5 md:w-3/4 lg:w-2/3 mx-auto">
        <h3 className="text-2xl font-semibold text-gray-800 mb-4">Lo que dicen de nosotros</h3>
        <div className="flex flex-col md:flex-row gap-6">
          <blockquote className="flex-1 bg-white p-6 shadow-md rounded-lg">
            <p className="text-gray-700">
              "TIC Americas ha sido un aliado clave en nuestro crecimiento. Sus soluciones son innovadoras y fáciles de implementar."
            </p>
            <footer className="mt-4 text-sm text-gray-500">- Clara Gómez, Directora de Operaciones</footer>
          </blockquote>
          <blockquote className="flex-1 bg-white p-6 shadow-md rounded-lg">
            <p className="text-gray-700">
              "No solo ofrecen tecnología, sino un servicio humano excepcional. Recomiendo trabajar con ellos al 100%."
            </p>
            <footer className="mt-4 text-sm text-gray-500">- Juan Pérez, CEO de Innovatech</footer>
          </blockquote>
        </div>
      </div>

      {/* Espaciado antes del footer */}
      <div className="my-16" />
    </section>
  );
};

export default Nosotros;
