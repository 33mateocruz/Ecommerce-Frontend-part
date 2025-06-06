import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ProductDetail.css";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);

  const product = {
    id: parseInt(id),
    name: "Filet Mignon Canino",
    description:
      "Croquetas premium con res Angus. Ideal para perros de todas las razas. Contiene proteínas de alta calidad y nutrientes esenciales para mantener a tu mascota saludable y feliz.",
    price: 122.0,
    image: "/img/comida de perro.jpg",
    features: [
      "Alta calidad en proteínas",
      "Sin colorantes artificiales",
      "Rico en vitaminas y minerales",
      "Apto para todas las razas",
    ],
    stock: 10,
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/carrito");
  };

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image-section">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />
        </div>

        <div className="product-info-section">
          <h1 className="product-title">{product.name}</h1>
          <p className="product-description">{product.description}</p>

          <div className="product-price">
            <span className="price-label">Precio:</span>
            <span className="price-value">${product.price.toFixed(2)}</span>
          </div>

          <div className="product-features">
            <h3>Características:</h3>
            <ul>
              {product.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value))}
              />
            </div>
            <button className="add-to-cart-button" onClick={handleAddToCart}>
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
