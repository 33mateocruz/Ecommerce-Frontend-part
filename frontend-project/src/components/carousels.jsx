import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect}>
      <Carousel.Item>
        <img
          className="img-1"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2901.jpg"
          alt="Primera imagen"
        />
        <Carousel.Caption>
          <h3>Primera Imagen</h3>
          <p>Descripción de la primera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="img-2"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2901.jpg"
          alt="Segunda imagen"
        />
        <Carousel.Caption>
          <h3>Segunda Imagen</h3>
          <p>Descripción de la segunda imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="img-3"
          src="https://upload.wikimedia.org/wikipedia/commons/0/0b/2023-11-16_Gala_de_los_Latin_Grammy%2C_03_%28cropped%2901.jpg"
          alt="Tercera imagen"
        />
        <Carousel.Caption>
          <h3>Tercera Imagen</h3>
          <p>Descripción de la tercera imagen.</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
