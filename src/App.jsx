import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './Context/AuthContext'; // Asegúrate de que esta importación esté correcta
import { AuthProvider } from './Context/AuthContext';
import Header from './Components/Layouts/Header/Header';
import Footer from './Components/Layouts/Footer/Footer';
import Home from './Components/Pages/Home/Home';
import Login from './Components/Pages/Login/Login';
import IniciarPrograma from './Components/Pages/IniciarPrograma/IniciarPrograma';
import Productos from './Components/Pages/Productos/Productos';
import Profile from './Components/Pages/Profile/Profile';
import SignUp from './Components/Pages/SignUp/SignUp';
import Ayuda from './Components/Pages/Ayuda/Ayuda';

const App = () => {
  const { authenticated } = useAuth();
  const location = useLocation();

  return (
    <AuthProvider>
      {/* Contenedor principal con estilos flexbox */}
      <div className="flex flex-col min-h-screen">
        {/* Header visible excepto en login y signup */}
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Header />}

        {/* Contenido principal */}
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={!authenticated ? <Navigate to="/login" /> : <Navigate to="/home" />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/home" element={authenticated ? <Home /> : <Navigate to="/login" />} />
            <Route
              path="/iniciarPrograma"
              element={authenticated ? <IniciarPrograma /> : <Navigate to="/login" />}
            />
            <Route
              path="/productos"
              element={authenticated ? <Productos /> : <Navigate to="/login" />}
            />
            <Route
              path="/profile"
              element={authenticated ? <Profile /> : <Navigate to="/login" />}
            />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/ayuda" element={authenticated ? <Ayuda /> : <Navigate to="/login" />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </Routes>
        </main>

        {/* Footer visible excepto en login y signup */}
        {location.pathname !== '/login' && location.pathname !== '/signup' && <Footer />}
      </div>
    </AuthProvider>
  );
};

export default App;
