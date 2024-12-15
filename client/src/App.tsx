import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider, PrivateRoute } from './context/AuthContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import GestorPeliculas from './pages/GestorPeliculas';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';


const App: React.FC = () => {
  return (
    <AuthProvider>
      <Router>
        <Navbar />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          
          {/* Ruta protegida para todos los usuarios autenticados */}
          <Route 
            path="/gestorpeliculas" 
            element={
              <PrivateRoute>
                <GestorPeliculas />
              </PrivateRoute>
            } 
          />
          
          {/* Ruta protegida solo para administradores */}
          <Route 
            path="/admin" 
            element={
              <PrivateRoute requiredRole="admin">
                <Dashboard />
              </PrivateRoute>
            } 
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
};

export default App;
