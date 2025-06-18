import React from "react";
import "./Hero.css";

const Hero = () => {
  const handleScroll = () => {
    const currentPosition = window.scrollY;
    const targetPosition = currentPosition + 400;

    window.scrollTo({
      top: targetPosition,
      behavior: "smooth",
    });
  };

  return (
    <div className="hero-container">
      <div className="hero-content">
        <p className="welcome-text">BIENVENIDO A</p>
        <h1 className="main-title">MAISON PET</h1>
        <p className="description">
          En Maison Pet, creemos que todos los animales merecen amor, cuidado y un hogar donde se sientan seguros.
        </p>
        <button className="button-banner" onClick={handleScroll}>
          Ver más
        </button>
      </div>

      <div className="circle-image">
        <img
          src="https://img.freepik.com/fotos-premium/tazon-comida-perros-que-tiene-comida-perros-el_854727-122783.jpg"
          alt="Elegant Cravings"
          className="hero-image"
        />
      </div>
    </div>
  );
};

export default Hero;
