import React, { useState } from "react";

const AcercaProyecto = () => {
  const [mostrarDetalles, setMostrarDetalles] = useState(false);

  return (
    <div style={{ padding: "2rem", maxWidth: 700, margin: "0 auto" }}>
      <h1>Maison Pet: más que un proyecto académico</h1>
      <p
        style={{
          fontWeight: "bold",
          fontSize: "1.1rem",
          marginBottom: "1.5rem",
        }}
      ></p>
      <p style={{ marginBottom: "2rem" }}>
        Maison Pet no es solo una tienda online: es el resultado de un proceso
        de trabajo colaborativo, compromiso y crecimiento personal. Desde el
        comienzo, supimos organizarnos estratégicamente, confiando en el
        criterio individual y avanzando de forma paralela sin perder la visión
        común. La comunicación constante —en clase y por Discord— fue clave para
        resolver dudas, alinear objetivos y sostenernos como equipo.
      </p>
      <p style={{ marginBottom: "2rem" }}>
        Más allá del código y el diseño, construimos una experiencia compartida
        basada en el respeto, la responsabilidad y la voluntad de aprender.
        Afrontamos errores, adaptamos estrategias y priorizamos siempre la
        calidad y la colaboración. Lo que nos llevamos no es solo un sitio
        funcional, sino la certeza de haber creado algo genuino, juntos, desde
        cero.
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
        {mostrarDetalles
          ? "Ocultar detalles del proyecto"
          : "Ver detalles del proyecto"}
      </button>

      {mostrarDetalles && (
        <div
          style={{
            border: "1px solid #e5e7eb",
            borderRadius: "0.5rem",
            padding: "1.5rem",
            background: "#f9fafb",
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
    </div>
  );
};

export default AcercaProyecto;
