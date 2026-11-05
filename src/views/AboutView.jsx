import React from 'react';
import { Link } from 'react-router-dom';
import './Views.css';

const AboutView = () => {
  return (
    <div className="about-view">
      <div className="view-banner">
        <div className="view-banner-container">
          <span className="view-badge">Conócenos</span>
          <h1 className="view-title">Sobre <span className="title-gold">ReactAcademy</span></h1>
          <p className="view-subtitle">
            Formamos a los desarrolladores del mañana en las tecnologías frontend más demandadas del mercado.
          </p>
        </div>
      </div>

      <div className="about-content-container">
        <div className="about-grid">
          <div className="about-card">
            <div className="about-icon">🎯</div>
            <h3>Nuestra Misión</h3>
            <p>
              Brindar una educación práctica, accesible y de alta calidad para dominar React con proyectos reales y código limpio.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">🚀</div>
            <h3>Nuestra Visión</h3>
            <p>
              Ser la plataforma líder de aprendizaje interactivo en español para el ecosistema moderno de desarrollo web.
            </p>
          </div>

          <div className="about-card">
            <div className="about-icon">⭐</div>
            <h3>Nuestros Valores</h3>
            <p>
              Excelencia técnica, aprendizaje continuo, metodología enfocada en la práctica y soporte continuo a nuestra comunidad.
            </p>
          </div>
        </div>

        <div className="stats-section">
          <div className="stat-item">
            <h4 className="stat-number">+5,000</h4>
            <p className="stat-label">Estudiantes Capacitados</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">98%</h4>
            <p className="stat-label">Satisfacción Garantizada</p>
          </div>
          <div className="stat-item">
            <h4 className="stat-number">100%</h4>
            <p className="stat-label">Proyectos Prácticos</p>
          </div>
        </div>

        <div className="cta-box">
          <h2>¿Listo para impulsar tu carrera frontend?</h2>
          <p>Explora nuestras rutas y comienza a construir aplicaciones sorprendentes hoy mismo.</p>
          <Link to="/cursos" className="hero-btn-primary">
            Ver Cursos Disponibles
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutView;
