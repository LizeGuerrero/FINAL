import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el hook useAuth
import AuthGestor from './AuthGestor'; // Importamos el componente para autenticación
import './styles/Navbar.css';

const Header = () => {
  const { isAuthenticated, logout, hasRole } = useAuth(); // Usamos el hook useAuth para obtener el estado de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [activeTab, setActiveTab] = useState<string>('home'); // Estado para la pestaña activa

  const toggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Llamamos a la función logout del contexto
  };

  const handleClick = (tab: string) => {
    setActiveTab(tab); // Actualiza la pestaña activa
  };

  return (
    <header className="navbar">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo" onClick={() => handleClick('home')} >
        
          <span className="site-name">Chiguiro</span>
          <img src="/main.png" alt="Logo" />
        </Link>

        {/* Toggle para menú responsive */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰ {/* Carácter Unicode para un ícono tipo "hamburguesa" */}
        </label>

        {/* Menú de navegación */}
        <nav className="main-navbar">
          <ul className="list">
          <li>
              <Link
                to="/"
                className={activeTab === 'home' ? 'current' : ''}
                onClick={() => handleClick('home')}
              >
                Home
              </Link>
            </li>
            {/* Esta ruta solo será visible si el usuario está autenticado */}
            {isAuthenticated && hasRole('admin') && (
              <li>
                <Link to="/admin">User Admin</Link>
              </li>
            )}
            {isAuthenticated && (
              <li>
                <Link
                  to="/GestorPeliculas"
                  className={activeTab === 'GestorPeliculas' ? 'current' : ''}
                  onClick={() => handleClick('GestorPeliculas')}
                >
                  Gestor Películas
                </Link>
              </li>
            )}
            <li>
              <Link
                to="/contact"
                className={activeTab === 'contact' ? 'current' : ''}
                onClick={() => handleClick('contact')}
              >
                Contáctanos
              </Link>
            </li>
            <li>
              <Link
                to="/about"
                className={activeTab === 'about' ? 'current' : ''}
                onClick={() => handleClick('about')}
              >
                Sobre Nosotros
              </Link>
            </li>

            {/* Mostrar el botón de login o logout basado en la autenticación */}
            {isAuthenticated ? (
              <li>
                <button className="login-btn" onClick={handleLogout}>Cerrar Sesión</button>
              </li>
            ) : (
              <li>
                <button className="login-btn" onClick={toggleAuthModal}>👤</button>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Mostrar el modal de autenticación si el estado es true */}
      {showAuthModal && <AuthGestor onClose={toggleAuthModal} />}
    </header>
  );
};

export default Header;
