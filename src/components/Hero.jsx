import React from 'react';
import { Link } from 'react-router-dom';
import './Hero.css';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-background-glow"></div>
      <div className="hero-container">
        <h1 className="hero-title">
          Aprende <span className="hero-title-highlight">React</span> desde cero
        </h1>
        <p className="hero-subtitle">
          Domina la librería más popular del frontend con proyectos prácticos y reales.
        </p>
        <div className="hero-actions">
          <Link to="/cursos" className="hero-btn-primary">
            Ver Cursos
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;

