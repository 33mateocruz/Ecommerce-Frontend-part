import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

function Cards() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("Productos cargados:", response.data);
        const nombresVistos = new Set();
        const productosUnicos = response.data.filter((producto) => {
          if (!nombresVistos.has(producto.name)) {
            nombresVistos.add(producto.name);
            return true;
          }
          return false;
        });

        setProductos(productosUnicos); // ✅ Se muestran todos los productos únicos
      })
      .catch((error) => {
        console.error("Error al cargar productos desde la API:", error);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToCart = (producto) => {
    dispatch(addToCart({ ...producto, quantity: 1 }));
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      <div className="cards-container">
        {productos.map((producto) => (
          <Card key={producto.id} className="card-item">
            <Card.Img
              variant="top"
              src={producto.image}
              onClick={() => handleProductClick(producto.id)}
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

export default Cards;
