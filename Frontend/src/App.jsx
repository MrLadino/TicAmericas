// Frontend/src/App.jsx
import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Components/Layouts/Header/Header";
import Footer from "./Components/Layouts/Footer/Footer";
import AppRoutes from "./Routes/Routes";

const App = () => {
  const location = useLocation();
  // Define las rutas en las que NO se muestra el header y el footer
  const hideHeaderFooter = ["/login", "/signup", "/programa"];
  const showHeader = !hideHeaderFooter.includes(location.pathname);
  const showFooter = !hideHeaderFooter.includes(location.pathname);

  return (
    <div className="flex flex-col min-h-screen">
      {showHeader && <Header />}
      <main className="flex-grow">
        <AppRoutes />
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default App;
