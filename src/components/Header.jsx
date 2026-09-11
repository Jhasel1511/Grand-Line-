import React, { useState } from 'react';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="header">
      <div className="header-container">
        <a href="#hero" className="logo">
          <span className="logo-highlight">React</span>Academy
        </a>

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
          <a href="#hero" className="nav-link" onClick={() => setIsMenuOpen(false)}>Inicio</a>
          <a href="#cursos" className="nav-link" onClick={() => setIsMenuOpen(false)}>Cursos</a>
          <a href="#nosotros" className="nav-link" onClick={() => setIsMenuOpen(false)}>Nosotros</a>
        </nav>
      </div>
    </header>
  );
};

export default Header;
