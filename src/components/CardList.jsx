import React from 'react';
import Card from './Card';
import { coursesData } from '../data/courses';
import './CardList.css';

const CardList = () => {
  return (
    <section id="cursos" className="card-list-section">
      <div className="card-list-container">
        <div className="section-header">
          <h2 className="section-title">Nuestros Cursos</h2>
          <p className="section-subtitle">Elige el camino que mejor se adapte a ti</p>
        </div>

        <div className="courses-grid">
          {coursesData.map((course) => (
            <Card
              key={course.id}
              title={course.title}
              description={course.description}
              level={course.level}
              badgeColor={course.badgeColor}
              goldenIcon={course.goldenIcon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CardList;
