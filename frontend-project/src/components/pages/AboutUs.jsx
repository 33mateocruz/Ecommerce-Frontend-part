import React, { useState } from "react";
import "./AboutUs.css";

import mainBanner from "../img/logo.png";
import bannerabout from "../img/banner aboutu.png";
import card1 from "../img/Cuadro_-_Miss_Fortune_Base.webp";
import card2 from "../img/Cuadro_-_Shaco_Base.webp";
import card3 from "../img/Cuadro_-_Yasuo_Base.webp";
import card4 from "../img/Gwen_0.jpg";
import card5 from "../img/Nasus_0.jpg";
import card6 from "../img/Neeko_0.jpg";

const cards = [
  {
    img: card1,
    text: "Belen",
    description: "Diseñadora y amante de los animales.",
    linkedin: "https://www.linkedin.com/in/belen",
    github: "https://github.com/belen",
  },
  {
    img: card2,
    text: "Nicolas",
    description: "Desarrollador Frontend apasionado por React.",
    linkedin: "https://www.linkedin.com/in/nicolas",
    github: "https://github.com/nicolas",
  },
  {
    img: card3,
    text: "Joaquin",
    description: "Fullstack Developer y gamer.",
    linkedin: "https://www.linkedin.com/in/joaquin",
    github: "https://github.com/joaquin",
  },
  {
    img: card4,
    text: "Mateo",
    description: "UX/UI Designer con ojo artístico.",
    linkedin: "https://www.linkedin.com/in/mateo",
    github: "https://github.com/mateo",
  },
  {
    img: card5,
    text: "Ignacio",
    description: "Backend Developer y fan de las APIs.",
    linkedin: "https://www.linkedin.com/in/ignacio",
    github: "https://github.com/ignacio",
  },
  {
    img: card6,
    text: "Yuliana",
    description: "Frontend y project manager de Maison Pet.",
    linkedin: "https://www.linkedin.com/in/yuliana",
    github: "https://github.com/yuliana",
  },
];

function AboutUs() {
  const [selectedCard, setSelectedCard] = useState(null);
  const [isDescriptionOpen, setIsDescriptionOpen] = useState(false);

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleClosePopout = () => {
    setSelectedCard(null);
  };

  const toggleDescription = () => {
    setIsDescriptionOpen((prev) => !prev);
  };

  return (
    <div className="container-about-us">
      <div className="main-info-card">
        <img
          src={bannerabout}
          alt="Banner principal"
          onClick={toggleDescription}
          className="dropdown-image"
        />
        <h2>Maison Pet</h2>
        {isDescriptionOpen && (
          <p>
            En Maison Pet, creemos que todos los animales merecen amor, cuidado
            y un hogar donde se sientan seguros. Nacimos como un proyecto sin
            fines de lucro con la misión de acercar productos de calidad para
            mascotas, promoviendo al mismo tiempo la adopción responsable y el
            bienestar animal. Nuestro equipo está formado por voluntarios
            apasionados que trabajan día a día para ofrecer asesoramiento,
            alimento balanceado, juguetes, accesorios y mucho más, siempre con
            un enfoque ético y solidario. Maison Pet no es solo una pet shop. Es
            una comunidad que defiende la vida animal con acciones reales y mucho
            corazón.
          </p>
        )}
      </div>

      <div className="cards-and-popout">
        <div className="cards-grid">
          {cards.map((card, idx) => (
            <div
              className="card"
              key={idx}
              onClick={() => handleCardClick(card)}
            >
              <img
                src={card.img}
                alt={`Card ${idx + 1}`}
                className="card-img-top"
              />
              <div className="card-body">
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          ))}
        </div>

        {selectedCard && (
          <div className="popout-card">
            <button className="close-button" onClick={handleClosePopout}>
              &times;
            </button>
            <img src={selectedCard.img} alt={selectedCard.text} />
            <h3>{selectedCard.text}</h3>
            <p>{selectedCard.description}</p>
            <div className="modal-links">
              <a
                href={selectedCard.linkedin}
                target="_blank"
                rel="noreferrer"
              >
                LinkedIn
              </a>
              <a href={selectedCard.github} target="_blank" rel="noreferrer">
                GitHub
              </a>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AboutUs;
