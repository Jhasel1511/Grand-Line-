import React from 'react';
import CardList from '../components/CardList';
import Counter from '../components/Counter';
import './Views.css';

const CoursesView = () => {
  return (
    <div className="courses-view">
      <div className="view-banner">
        <div className="view-banner-container">
          <span className="view-badge">Catálogo Completo</span>
          <h1 className="view-title">Explora Nuestros <span className="title-gold">Cursos</span></h1>
          <p className="view-subtitle">
            Aprende paso a paso con rutas especializadas desde los fundamentos de React hasta patrones avanzados.
          </p>
        </div>
      </div>
      <CardList />
      <Counter />
    </div>
  );
};

export default CoursesView;
