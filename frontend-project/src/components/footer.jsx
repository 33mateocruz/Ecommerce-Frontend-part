import React from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import "bootstrap/dist/css/bootstrap.min.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <h5 className="footer-title">Maison Pet 🐾</h5>

        <p className="footer-text">
          Amor, cuidado y calidad para tus mascotas. Siempre a tu lado. 🐶🐱
        </p>

        <Link to="/about-us" className="footer-button">
          Sobre Nosotros
        </Link>

        <div className="footer-legal">
          © 2025 Maison Pet. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
