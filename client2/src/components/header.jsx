import { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthGestor from './AuthGestor'; // Importamos el nuevo componente
import './header.css';
import hamster from '../assets/logo-Hamster.png';

const Header = () => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const toggleAuthModal = () => {
    setShowAuthModal((prev) => !prev);
  };

  return (
    <header className="main-header">
      <div className="container-header">
        {/* Logo */}
        <Link to="/" className="logo">
          <img src={hamster} alt="Hamster Piensa" className="hamster-icon" />
          <span className="site-name">Hamster Piensa</span>
        </Link>

        {/* Toggle para menú responsive va en una cajita*/}
        <input type="checkbox" id="menu-toggle" className="menu-toggle" />
        <label htmlFor="menu-toggle" className="menu-icon">
          ☰ {/* Carácter Unicode para un ícono tipo "hamburguesa" */}
        </label>

        {/* Menú de navegación */}
        <nav className="main-navbar">
          <ul className="nav-list">
            <li>
              <Link to="/GestorPeliculas">Películas</Link>
              <ul className="dropdown">
                <li><Link to="/">Acción</Link></li>
                <li><Link to="/">Comedia</Link></li>
                <li><Link to="/">Drama</Link></li>
              </ul>
            </li>
            {/* <li><Link to="/reviews">Reseñas</Link></li>*/}
            <li><Link to="/contact">Contáctanos</Link></li>
            <li><Link to="/about">Sobre Nosotros</Link></li>
            <li>
              <button className="login-btn" onClick={toggleAuthModal}>👤
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Componente AuthGestor */}
      {showAuthModal && <AuthGestor onClose={toggleAuthModal} />}
    </header>
  );
};

export default Header;