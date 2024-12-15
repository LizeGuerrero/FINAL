import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext'; // Importamos el hook useAuth
import AuthGestor from './AuthGestor'; // Importamos el componente para autenticación
import './header.css';


const Header = () => {
  const { isAuthenticated, logout } = useAuth(); // Usamos el hook useAuth para obtener el estado de autenticación
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  const handleLogout = () => {
    logout(); // Llamamos a la función logout del contexto
  };

  return (
    <header className="main-header">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo">

          <span className="site-name">Hamster Piensa</span>
        </Link>

        {/* Toggle para menú responsive */}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰ {/* Carácter Unicode para un ícono tipo "hamburguesa" */}
        </label>

        {/* Menú de navegación */}
        <nav className="main-navbar">
          <ul className="nav-list">
            {/* Esta ruta solo será visible si el usuario está autenticado */}
            {isAuthenticated && (
              <li>
                <Link to="/GestorPeliculas">Películas</Link>
                <ul className="dropdown">
                  <li><Link to="/">Acción</Link></li>
                  <li><Link to="/">Comedia</Link></li>
                  <li><Link to="/">Drama</Link></li>
                </ul>
              </li>
            )}
            <li><Link to="/contact">Contáctanos</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>

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
