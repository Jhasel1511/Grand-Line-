import React from 'react';
import { Link } from 'react-router-dom';
import './Views.css';

const NotFoundView = () => {
  return (
    <div className="not-found-view">
      <div className="not-found-card">
        <div className="not-found-code">404</div>
        <h1 className="not-found-title">Página No Encontrada</h1>
        <p className="not-found-text">
          La ruta a la que intentas acceder no existe o ha sido movida.
        </p>
        <Link to="/" className="hero-btn-primary">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};

export default NotFoundView;
