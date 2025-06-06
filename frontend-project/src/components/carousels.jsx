import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import "./Carousel.css";
import pataFina from "./img/Pata fina.png";
import dogoAndCo from "./img/Maison pet banner.png";
import pelajeUrbano from "./img/pelaje urbano.png";

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='container carousel'>
      <Carousel.Item>
        <img
          src={pataFina}
          alt="Primera imagen"
          className="img-1"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={pelajeUrbano}
          alt="Segunda imagen"
          className="img-2"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src={dogoAndCo}
          alt="Tercera imagen"
          className="img-3"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
