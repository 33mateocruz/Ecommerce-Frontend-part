import React, { useState } from "react";
import "./ProductCarousel.css";

const products = [
  {
    id: 1,
    title: "No Plans For Today Tee",
    price: "$25.00",
    image:
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    title: "Boneless Hoodie",
    price: "$45.00",
    image:
      "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    title: "Cream Polo Sweat",
    price: "$35.00",
    image:
      "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=400&h=300&fit=crop",
  },
  {
    id: 4,
    title: "Sporty Jacket",
    price: "$60.00",
    image:
      "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=400&h=300&fit=crop",
  },
  {
    id: 5,
    title: "Elegant Dress",
    price: "$80.00",
    image:
      "https://images.unsplash.com/photo-1521334884684-d80222895322?w=400&h=300&fit=crop",
  },
];

export default function ProductCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsToShow = 3;

  const maxIndex = products.length - itemsToShow;

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  return (
    <div className="customSlider-container">
      <button
        onClick={prevSlide}
        className="customSlider-btn customSlider-leftBtn"
        aria-label="Anterior"
      >
        &#8592;
      </button>

      <div className="customSlider-window">
        <div
          className="customSlider-track"
          style={{ transform: `translateX(-${(100 / itemsToShow) * currentIndex}%)` }}
        >
          {products.map((product) => (
            <div className="customSlider-item" key={product.id}>
              <img src={product.image} alt={product.title} />
              <h3>{product.title}</h3>
              <p className="customSlider-price">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={nextSlide}
        className="customSlider-btn customSlider-rightBtn"
        aria-label="Siguiente"
      >
        &#8594;
      </button>
    </div>
  );
}
