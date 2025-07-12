import React, { useState } from "react";
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
    description: "Backend dev, fullstack.",
    linkedin: "https://www.linkedin.com/in/mateo-cruz-b1836734a/",
    github: "https://github.com/33mateocruz",
  },
  {
    img: card5,
    text: "Ignacio",
    description: "Fullstack developer y entusiasta de la tecnología.",
    linkedin: "https://www.linkedin.com/in/ignaciofestari115/",
    github: "https://github.com/festari",
  },
  {
    img: card6,
    text: "Yuliana",
    description: "Frontend y project manager de Maison Pet.",
    linkedin: "https://www.linkedin.com/in/yuliana",
    github: "https://github.com/yuliana",
  },
];

const AcercaProyecto = () => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  return (
    <div style={{ padding: "2rem", maxWidth: 1000, margin: "0 auto" }}>
      <h1>Maison Pet: más que un proyecto académico</h1>
      <p style={{ marginBottom: "2rem" }}>
        Maison Pet no es solo una tienda online: es el resultado de un proceso de trabajo colaborativo, compromiso y crecimiento personal.
        Desde el comienzo, supimos organizarnos estratégicamente, confiando en el criterio individual y avanzando de forma paralela sin perder la visión común.
        La comunicación constante —en clase y por Discord— fue clave para resolver dudas, alinear objetivos y sostenernos como equipo.
      </p>
      <p style={{ marginBottom: "2rem" }}>
        Más allá del código y el diseño, construimos una experiencia compartida basada en el respeto, la responsabilidad y la voluntad de aprender.
        Afrontamos errores, adaptamos estrategias y priorizamos siempre la calidad y la colaboración.
        Lo que nos llevamos no es solo un sitio funcional, sino la certeza de haber creado algo genuino, juntos, desde cero.
      </p>

      <button
        onClick={() => setMostrarDetalles((prev) => !prev)}
        style={{
          background: "#01194f",
          color: "white",
          border: "none",
          borderRadius: "0.5rem",
          padding: "0.7rem 1.2rem",
          fontWeight: "bold",
          cursor: "pointer",
          marginBottom: "1.5rem",
        }}
      >
        {mostrarDetalles ? "Ocultar detalles del proyecto" : "Ver detalles del proyecto"}
      </button>

      {mostrarDetalles && (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            background: "#f9fafb",
            marginBottom: "2rem",
          }}
        >
          <h2>Características principales</h2>
          <ul>
            <li>Interfaz limpia y fácil de usar.</li>
            <li>Navegación rápida y clara.</li>
            <li>Componentes reutilizables y arquitectura modular.</li>
            <li>Integración con APIs para gestión de productos y usuarios.</li>
            <li>Carrito de compras y gestión de pedidos.</li>
          </ul>
          <h2>¿Por qué Maison Pet?</h2>
          <p>
            Maison Pet nace de la pasión por los animales y la tecnología,
            buscando crear un espacio donde los amantes de las mascotas puedan
            encontrar todo lo que necesitan de forma sencilla y segura.
          </p>
          <h2>Tecnologías utilizadas</h2>
          <ul>
            <li>React</li>
            <li>React Router</li>
            <li>Redux</li>
            <li>Bootstrap</li>
            <li>APIs REST</li>
          </ul>
          <p style={{ marginTop: "2rem", fontStyle: "italic" }}>
            ¡Gracias por visitar y confiar en Maison Pet!
          </p>
        </div>
      )}

      {/* Cards chicas */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(150px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {cards.map((card, idx) => (
          <div
            key={idx}
            onClick={() => setSelectedCard(card)}
            style={{
              background: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
              overflow: "hidden",
              textAlign: "center",
              cursor: "pointer",
            }}
          >
            <img
              src={card.img}
              alt={card.text}
              style={{ width: "100%", height: "120px", objectFit: "cover" }}
            />
            <div style={{ padding: "0.5rem" }}>
              <h4 style={{ margin: "0.5rem 0" }}>{card.text}</h4>
              <p style={{ fontSize: "0.9rem", color: "#555" }}>{card.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal pop-up */}
      {selectedCard && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.6)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
          onClick={() => setSelectedCard(null)} // para cerrar al hacer click afuera
        >
          <div
            onClick={(e) => e.stopPropagation()} // evitar que se cierre al hacer click dentro
            style={{
              background: "white",
              borderRadius: "0.5rem",
              boxShadow: "0 12px 25px rgba(0,0,0,0.25)",
              padding: "1.5rem",
              textAlign: "center",
              width: "300px",
              position: "relative",
            }}
          >
            <button
              onClick={() => setSelectedCard(null)}
              style={{
                position: "absolute",
                top: "0.5rem",
                right: "0.5rem",
                background: "transparent",
                border: "none",
                fontSize: "1.8rem",
                cursor: "pointer",
                color: "#333",
                fontWeight: "bold",
              }}
            >
              &times;
            </button>
            <img
              src={selectedCard.img}
              alt={selectedCard.text}
              style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "0.5rem", marginBottom: "1rem" }}
            />
            <h3>{selectedCard.text}</h3>
            <p>{selectedCard.description}</p>
            <div style={{ display: "flex", gap: "1rem", justifyContent: "center" }}>
              <a href={selectedCard.linkedin} target="_blank" rel="noreferrer" style={{ color: "#0077b5", fontWeight: "bold", textDecoration: "none" }}>
                LinkedIn
              </a>
              <a href={selectedCard.github} target="_blank" rel="noreferrer" style={{ color: "#333", fontWeight: "bold", textDecoration: "none" }}>
                GitHub
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AcercaProyecto;
