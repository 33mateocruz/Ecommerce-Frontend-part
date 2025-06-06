import React from "react";
import "./AboutUs.css";

const cards = [
  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 1",
  },
  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 2",
  },
  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 3",
  },
  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 4",
  },
  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 5",
  },

  {
    img: "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg",
    text: "Texto de la tarjeta 6",
  },
];

function AboutUs() {
  return (
    <div className="container my-5">
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="card mb-3">
            <img
              src="https://blog.veterinariadelbosque.com/wp-content/uploads/2020/11/perro-corriendo.jpg"
              className="card-img-top"
              alt="..."
            />
            <div className="card-body text-center">
              <h2 className="card-title">Maison Pet</h2>
              <p className="card-text">
                This is a wider card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </p>
            </div>
          </div>
        </div>
      </div>
      {/* 6 tarjetas abajo en 2 filas de 3 */}
      <div className="row">
        {cards.map((card, idx) => (
          <div
            className="col-md-4 mb-4 d-flex justify-content-center"
            key={idx}
          >
            <div className="card" style={{ width: "18rem" }}>
              <img
                src={card.img}
                className="card-img-top"
                alt={`Card ${idx + 1}`}
              />
              <div className="card-body">
                <p className="card-text">{card.text}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default AboutUs;
