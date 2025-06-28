import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { agregarAlCarro } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./ProductCarousel.css";

export default function ProductCarousel() {
  const [productos, setProductos] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsToShow, setItemsToShow] = useState(3);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Carga productos
  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        const nombresVistos = new Set();
        const unicos = response.data.filter((prod) => {
          if (!nombresVistos.has(prod.name)) {
            nombresVistos.add(prod.name);
            return true;
          }
          return false;
        });
        const mezclados = unicos.sort(() => 0.5 - Math.random());
        const seleccionados = mezclados.slice(0, 5);
        setProductos(seleccionados);

        if (seleccionados.length < 3) {
          setItemsToShow(seleccionados.length);
        }
      })
      .catch((error) => {
        console.error("Error al cargar productos en el carrusel:", error);
      });
  }, []);

  // Ajustar itemsToShow según ancho ventana
  useEffect(() => {
    function updateItems() {
      const width = window.innerWidth;
      if (width < 480) setItemsToShow(1);
      else if (width < 768) setItemsToShow(2);
      else setItemsToShow(3);
    }
    updateItems();
    window.addEventListener("resize", updateItems);
    return () => window.removeEventListener("resize", updateItems);
  }, []);

  const maxIndex = Math.max(0, productos.length - itemsToShow);

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? maxIndex : currentIndex - 1);
  };

  const nextSlide = () => {
    setCurrentIndex(currentIndex === maxIndex ? 0 : currentIndex + 1);
  };

  const handleAddToCart = (producto) => {
    dispatch(agregarAlCarro({ ...producto, cantidad: 1 }));
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <>
      <div className="customSlider-section">
        <h1 className="customSlider-title">Productos seleccionados</h1>
        <div className="customSlider-container">
          {productos.length > itemsToShow && (
            <button
              onClick={prevSlide}
              className="customSlider-btn customSlider-leftBtn"
              aria-label="Anterior"
            >
              &#8592;
            </button>
          )}

          <div className="customSlider-window">
            <div
              className="customSlider-track"
              style={{
                transform: `translateX(-${(100 / itemsToShow) * currentIndex}%)`,
                justifyContent:
                  productos.length < itemsToShow ? "center" : "flex-start",
                gap: "1.5rem",
              }}
            >
              {productos.map((producto) => (
                <Card
                  key={producto.id}
                  className="customSlider-item card-item"
                  style={{ flex: `0 0 calc((100% / ${itemsToShow}) - 1.5rem)` }}
                >
                  <Card.Img
                    variant="top"
                    src={producto.image}
                    onClick={() => handleProductClick(producto.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <Card.Body>
                    <Card.Title>{producto.name}</Card.Title>
                    <Card.Text>${producto.price}</Card.Text>
                    <Button
                      variant="primary"
                      onClick={() => handleAddToCart(producto)}
                    >
                      Añadir al carrito
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>

          {productos.length > itemsToShow && (
            <button
              onClick={nextSlide}
              className="customSlider-btn customSlider-rightBtn"
              aria-label="Siguiente"
            >
              &#8594;
            </button>
          )}
        </div>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Producto agregado al carrito</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {selectedProduct && (
            <p>
              Has agregado "{selectedProduct.name}" al carrito exitosamente.
            </p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Seguir comprando
          </Button>
          <Button variant="primary" onClick={() => navigate("/carrito")}>
            Ir al carrito
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
