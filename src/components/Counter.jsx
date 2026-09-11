import React, { useState } from 'react';
import './Counter.css';

const Counter = () => {
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(prev => prev - 1);
    }
  };

  return (
    <section className="counter-section">
      <div className="counter-container">
        <h2 className="counter-title">Cuántos estudiantes van a inscribirse?</h2>
        <p className="counter-subtitle">Usa los botones para ajustar el número</p>

        <div className="counter-box">
          <button
            className="counter-btn decrement-btn"
            onClick={handleDecrement}
            disabled={count === 0}
            aria-label="Disminuir estudiantes"
          >
            -
          </button>

          <span className="counter-value">{count}</span>

          <button
            className="counter-btn increment-btn"
            onClick={handleIncrement}
            aria-label="Aumentar estudiantes"
          >
            +
          </button>
        </div>

        <p className="counter-label">Estudiantes inscritos</p>
      </div>
    </section>
  );
};

export default Counter;
