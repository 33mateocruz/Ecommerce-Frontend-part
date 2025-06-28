import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { agregarAlCarro } from "../store/cartSlice";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import Pagination from "react-bootstrap/Pagination";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

const categoriasMapeadas = {
  1: "Alimentos",
  3: "Accesorios",
  7: "Ropa",
  8: "Juguetes",
};

function Cards({ addToCart }) {
  const [productos, setProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("all");
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [pagina, setPagina] = useState(1);
  const productosPorPagina = 8;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((res) => {
        setProductos(res.data);
        const categoriasUnicas = Array.from(
          new Set(res.data.map((p) => p.category))
        );
        setCategorias(categoriasUnicas);
      })
      .catch((err) => console.error("Error cargando productos:", err));
  }, []);

  const productosFiltrados =
    categoriaSeleccionada === "all"
      ? productos
      : productos.filter((p) => String(p.category) === categoriaSeleccionada);

  const totalPaginas = Math.ceil(
    productosFiltrados.length / productosPorPagina
  );

  const productosPaginaActual = productosFiltrados.slice(
    (pagina - 1) * productosPorPagina,
    pagina * productosPorPagina
  );

  const handleAddToCart = (producto) => {
    dispatch(agregarAlCarro({ ...producto, cantidad: 1 }));
    setSelectedProduct(producto);
    setShowModal(true);
    if (addToCart) addToCart(producto, 1);
  };

  const handleChangePage = (num) => {
    if (num >= 1 && num <= totalPaginas) {
      setPagina(num);
    }
  };

  const handleCategoryChange = (e) => {
    setCategoriaSeleccionada(e.target.value);
    setPagina(1);
  };

  const handleProductClick = (id) => navigate(`/product/${id}`);

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  return (
    <>
      
      <div className="container Container-cards">
        <div className="container linea-separadora"></div>
        <div className="container py-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h3 className="mb-0 fw-bold Title">Productos</h3>
            <select
              className="form-select form-select-sm w-auto"
              value={categoriaSeleccionada}
              onChange={handleCategoryChange}
            >
              <option value="all">Todas las categorías</option>

              {categorias.map((catId) => (
                <option key={catId} value={String(catId)}>
                  {categoriasMapeadas[catId] || `Categoría ${catId}`}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="container cards-container">
          {productosPaginaActual.length > 0 ? (
            productosPaginaActual.map((producto) => (
              <Card key={producto.id} className="card-item mb-4">
                <Card.Img
                  variant="top"
                  src={producto.image}
                  onClick={() => handleProductClick(producto.id)}
                  style={{
                    cursor: "pointer",
                    height: "200px",
                    objectFit: "cover",
                  }}
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
            ))
          ) : (
            <p className="text-center">No hay productos en esta categoría.</p>
          )}
        </div>
        <Pagination className="justify-content-center my-4">
          <Pagination.First
            onClick={() => handleChangePage(1)}
            disabled={pagina === 1}
          />
          <Pagination.Prev
            onClick={() => handleChangePage(pagina - 1)}
            disabled={pagina === 1}
          />
          {[...Array(totalPaginas)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={pagina === idx + 1}
              onClick={() => handleChangePage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handleChangePage(pagina + 1)}
            disabled={pagina === totalPaginas}
          />
          <Pagination.Last
            onClick={() => handleChangePage(totalPaginas)}
            disabled={pagina === totalPaginas}
          />
        </Pagination>
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
        </Modal>{" "}
      </div>
    </>
  );
}

export default Cards;
