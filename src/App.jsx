// src/App.jsx
import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import AppRoutes from "./Routes/Routes";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        {/* Header */}
        <Header />

        {/* Main Content */}
        <main className="flex-grow">
          <AppRoutes /> {/* Usa las rutas desde el archivo routes.js */}
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;
