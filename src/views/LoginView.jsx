import React, { useState } from 'react';
import './Views.css';

const LoginView = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  // El botón permanece deshabilitado si alguno de los campos está vacío o si el formulario ya fue enviado
  const isButtonDisabled = email.trim() === '' || password.trim() === '' || isSubmitted;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() && password.trim() && !isSubmitted) {
      setIsSubmitted(true);
    }
  };

  const handleReset = () => {
    setEmail('');
    setPassword('');
    setIsSubmitted(false);
  };

  return (
    <div className="login-view">
      <div className="login-card">
        <div className="login-header">
          <div className="login-icon">🔒</div>
          <h1 className="login-title">Iniciar <span className="title-gold">Sesión</span></h1>
          <p className="login-subtitle">Accede a tu cuenta en ReactAcademy</p>
        </div>

        {isSubmitted && (
          <div className="login-alert-success">
            <span className="alert-icon">✅</span>
            <div>
              <strong>¡Formulario enviado con éxito!</strong>
              <p>Los campos han sido deshabilitados correctamente.</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Correo Electrónico</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="correo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSubmitted}
              autoComplete="email"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              disabled={isSubmitted}
              autoComplete="current-password"
              required
            />
          </div>

          <button
            type="submit"
            className="login-submit-btn"
            disabled={isButtonDisabled}
          >
            {isSubmitted ? 'Sesión Iniciada' : 'Iniciar Sesión'}
          </button>
        </form>

        {isSubmitted && (
          <button type="button" onClick={handleReset} className="reset-demo-btn">
            Probar formulario de nuevo
          </button>
        )}
      </div>
    </div>
  );
};

export default LoginView;
