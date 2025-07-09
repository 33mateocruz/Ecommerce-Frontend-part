import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import "./Cards.css";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

function SearchResults() {
  const query = useQuery().get("query") || "";
  const [productos, setProductos] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);

    axios
      .get(
        `http://localhost:3000/products/search?query=${encodeURIComponent(
          query
        )}`
      )
      .then((res) => {
        setProductos(res.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error al buscar productos:", error);
        setLoading(false);
      });
  }, [query]);

  return (
    <div className="container mt-4 Container-cards">
      <h3 className="fw-bold Title">Resultados para: "{query}"</h3>
      <div className="container linea-separadora mb-4"></div>

      {loading ? (
        <p>Cargando productos...</p>
      ) : productos.length === 0 ? (
        <p>No se encontraron productos con esa palabra 😿</p>
      ) : (
        <div className="container cards-container">
          {productos.map((producto) => (
            <Card key={producto.id} className="card-item mb-4">
              <Card.Img
                variant="top"
                src={producto.image}
                onClick={() => navigate(`/product/${producto.id}`)}
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
                  onClick={() => navigate(`/product/${producto.id}`)}
                >
                  Ver más
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
