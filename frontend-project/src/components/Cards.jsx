import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Comida from "./img/comida de perro.jpg";
import "./Cards.css";



function CardProducts() {
  const navigate = useNavigate();

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
          <Card.Img variant="top" src={producto.imagen} />
          <Card.Body>
            <Card.Title>{producto.nombre}</Card.Title>
            <Card.Text>{producto.descripcion}</Card.Text>
            <Button className="buttom-cards">Ver más</Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
}

export default CardProducts;
