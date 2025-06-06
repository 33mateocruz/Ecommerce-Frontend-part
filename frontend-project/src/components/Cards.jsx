import React, { useEffect, useState } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import "./Cards.css";

function Cards() {
  const [productos, setProductos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get("http://localhost:3000/products")
      .then((response) => {
        console.log("Productos cargados:", response.data);
        setProductos(response.data);
      })
      .catch((error) => {
        console.error("Error al cargar productos desde la API:", error);
      });
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div
      style={{
        display: "flex",
        flexWrap: "wrap",
        gap: "1.5rem",
        justifyContent: "center",
      }}
      className="container cards-container"
    >
      {productos.map((producto) => (
        <Card
          key={producto.id}
          style={{ width: "19rem", cursor: "pointer" }}
          onClick={() => handleProductClick(producto.id)}
        >
          <Card.Img
            variant="top"
            src={
              producto.image ||
              "https://purina.com.uy/sites/default/files/styles/webp/public/2022-09/ADULTOS%20PERROS%20MINIS%20Y%20PEQUEN%CC%83OS-dog-chow-frente.jpeg.webp?itok=UwtgKL2x"
            }
            alt={producto.name}
          />
          <Card.Body>
            <Card.Title>{producto.name}</Card.Title>
            <Card.Text>{producto.description}</Card.Text>
            {/* Puedes agregar más info si quieres: */}
            {/* <Card.Text>Precio: ${producto.price}</Card.Text> */}
            <Button className="buttom-cards">Ver más</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default Cards;
