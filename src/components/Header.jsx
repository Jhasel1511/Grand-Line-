import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo" onClick={closeMenu}>
          <span className="logo-highlight">React</span>Academy
        </Link>

        <button 
          className={`menu-toggle ${isMenuOpen ? 'open' : ''}`}
          onClick={toggleMenu}
          aria-label="Abrir menú de navegación"
        >
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
          <span className="hamburger-bar"></span>
        </button>

        <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
          <NavLink 
            to="/" 
            end
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            Inicio
          </NavLink>
          <NavLink 
            to="/cursos" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            Cursos
          </NavLink>
          <NavLink 
            to="/nosotros" 
            className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            Nosotros
          </NavLink>
          <NavLink 
            to="/login" 
            className={({ isActive }) => `nav-link nav-link-login ${isActive ? 'active' : ''}`} 
            onClick={closeMenu}
          >
            Iniciar Sesión
          </NavLink>
        </nav>
      </div>
    </header>
  );
};

export default Header;

