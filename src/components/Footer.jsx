import React from 'react';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer id="nosotros" className="footer">
      <div className="footer-container">
        <p className="footer-copyright">
          © {currentYear} <span className="footer-brand">ReactAcademy</span>. Taller 02 — React Fundamentos.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
