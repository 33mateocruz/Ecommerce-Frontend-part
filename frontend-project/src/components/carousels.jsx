import React, { useState } from 'react';
import { Carousel } from 'react-bootstrap';
import "./Carousel.css"
import pataFina from "./img/pata fina.png"
import dogoAndCo from "./img/dogo and co.png"
import pelajeUrbano from "./img/pelaje urbanoo.png"

function ControlledCarousel() {
  const [index, setIndex] = useState(0);

  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  return (
    <Carousel activeIndex={index} onSelect={handleSelect} className='container carousel'>
      <Carousel.Item>
        <img
          className="img-1"
          src={pataFina}
          alt="Primera imagen"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="img-2"
          src={pelajeUrbano}
          alt="Segunda imagen"
        />
      </Carousel.Item>

      <Carousel.Item>
        <img
          className="img-3"
          src={dogoAndCo}
          alt="Tercera imagen"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ControlledCarousel;
