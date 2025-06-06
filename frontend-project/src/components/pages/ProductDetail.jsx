import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ProductDetail.css";

const ProductDetail = ({ addToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `http://localhost:3000/products/${id}`
        );
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        setError("No se pudo cargar el producto.");
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(product, quantity);
    navigate("/carrito");
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail-container">
      <div className="product-detail-content">
        <div className="product-image-section">
          {/* Imagen fija */}
          <img
            src="/img/comida de perro.jpg"
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

          {product.features && (
            <div className="product-features">
              <h3>Características:</h3>
              <ul>
                {product.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="product-actions">
            <div className="quantity-selector">
              <label htmlFor="quantity">Cantidad:</label>
              <input
                type="number"
                id="quantity"
                min="1"
                max={product.stock}
                value={quantity}
                onChange={(e) => {
                  const val = parseInt(e.target.value);
                  if (val >= 1 && val <= product.stock) setQuantity(val);
                }}
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
