import React from 'react';
import './Card.css';

const Card = ({ title, description, level, badgeColor, goldenIcon }) => {
  return (
    <div className="course-card">
      <div className="card-icon-wrapper" dangerouslySetInnerHTML={{ __html: goldenIcon }}></div>
      <h3 className="card-title">{title}</h3>
      <p className="card-description">{description}</p>
      <div className="card-footer">
        <span 
          className="card-badge" 
          style={{ backgroundColor: badgeColor || '#e63946' }}
        >
          {level}
        </span>
      </div>
    </div>
  );
};

export default Card;
