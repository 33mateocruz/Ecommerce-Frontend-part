import React from "react";
import "./AboutUs.css";

import bannerabout from "../img/banner aboutu.png";

function AboutUs() {
  return (
    <div className="container-about-us">
      <div className="main-info-card">
        <img
          src={bannerabout}
          alt="Banner principal"
          className="main-banner"
        />
        <h2>Maison Pet</h2>
        <p>
          En Maison Pet, creemos que todos los animales merecen amor, cuidado
          y un hogar donde se sientan seguros. Nacimos como un proyecto sin
          fines de lucro con la misión de acercar productos de calidad para
          mascotas, promoviendo al mismo tiempo la adopción responsable y el
          bienestar animal. Nuestro equipo está formado por voluntarios
          apasionados que trabajan día a día para ofrecer asesoramiento,
          alimento balanceado, juguetes, accesorios y mucho más, siempre con
          un enfoque ético y solidario. Maison Pet no es solo una pet shop. Es
          una comunidad que defiende la vida animal con acciones reales y
          mucho corazón.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
