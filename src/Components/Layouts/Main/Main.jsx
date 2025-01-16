const Main = () => {
  return (
    <main className="flex flex-1 flex-col bg-gray-50">
      <section className="flex items-center justify-center h-full">
        <div className="text-center px-4 py-16 max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            Optimiza tu negocio con nuestras soluciones POS
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Gestiona tus ventas y operaciones fácilmente con TIC Americas.
          </p>
          <a
            href="#caracteristicas"
            className="bg-red-600 text-white px-6 py-3 rounded-lg shadow hover:bg-red-700 transition"
          >
            Conoce más
          </a>
        </div>
      </section>
    </main>
  );
};

export default Main;
