import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { agregarAlCarro } from "../../store/cartSlice";
import axios from "axios";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import arrowIcon from "../../components/img/arrow-return-left.svg";
import "./ProductDetail.css";

const ProductDetail = () => {
  const { id } = useParams(); //id del producto
  const navigate = useNavigate(); //navegacion
  const dispatch = useDispatch(); //hace que funcione la accion

  //cantidad orifinal del producto
  const [producto, setProducto] = useState(null);
  const [cantidad, setCantidad] = useState(1);
  //error y carga del producto
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  //modal de producto agregado
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios
      .get(`http://localhost:3000/products/${id}`)
      .then((response) => {
        setProducto(response.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Error al cargar el producto");
        setLoading(false);
      });
  }, [id]);

  const handleAddToCart = () => {
    dispatch(agregarAlCarro({ ...producto, cantidad }));
    setSelectedProduct(producto);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          className="d-flex align-items-center"
        >
          <img
            src={arrowIcon}
            alt="Volver"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Volver
        </Button>
        <h1 className="mb-0">Detalles del Producto</h1>
        <div style={{ width: "100px" }}></div>
      </div>
      <div className="product-detail-container">
        <div className="product-image">
          <img src={producto.image} alt={producto.name} />
        </div>
        <div className="product-info">
          <h2>{producto.name}</h2>
          <p className="description">{producto.description}</p>
          <p className="price">
            <strong>Precio:</strong> ${producto.price}
          </p>
          <div className="quantity-selector">
            <label>Cantidad:</label>
            <div className="d-flex align-items-center">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setCantidad((prev) => Math.max(1, prev - 1))}
                style={{ marginRight: "10px" }}
              >
                -
              </Button>
              <input
                type="number"
                min="1"
                value={cantidad}
                onChange={(e) =>
                  setCantidad(Math.max(1, parseInt(e.target.value) || 1))
                }
                style={{ width: "60px", textAlign: "center" }}
              />
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setCantidad((prev) => prev + 1)}
                style={{ marginLeft: "10px" }}
              >
                +
              </Button>
            </div>
          </div>
          <Button variant="primary" onClick={handleAddToCart}>
            Añadir al carrito
          </Button>
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
    </Container>
  );
};

export default ProductDetail;
