import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useNavigate } from "react-router-dom";
import Comida from "./img/comida de perro.jpg";
import "./Cards.css";

const productos = [
  {
    id: 1,
    nombre: "Filet Mignon Canino",
    descripcion: "Croquetas premium con res Angus.",
    imagen: Comida,
  },
  {
    id: 2,
    nombre: "Delicias de Pato",
    descripcion: "Snack natural de pato.",
    imagen: Comida,
  },
  {
    id: 3,
    nombre: "Galletas Relax",
    descripcion: "Con lavanda y manzanilla.",
    imagen: Comida,
  },
  {
    id: 4,
    nombre: "Menú Urbano",
    descripcion: "Nutrición para perros de ciudad.",
    imagen: Comida,
  },
  {
    id: 5,
    nombre: "Bocados de Cordero",
    descripcion: "Con romero y aceite de oliva.",
    imagen: Comida,
  },
  {
    id: 6,
    nombre: "Fórmula Vital",
    descripcion: "Fortalece defensas y pelaje.",
    imagen: Comida,
  },
  {
    id: 7,
    nombre: "Salmón Selecto",
    descripcion: "Rico en Omega 3.",
    imagen: Comida,
  },
  {
    id: 8,
    nombre: "Crocantes de Pollo",
    descripcion: "Con vegetales frescos.",
    imagen: Comida,
  },
  {
    id: 9,
    nombre: "Mini Bocaditos",
    descripcion: "Ideal para razas pequeñas.",
    imagen: Comida,
  },
  {
    id: 10,
    nombre: "Snacks Digestivos",
    descripcion: "Con prebióticos naturales.",
    imagen: Comida,
  },
  {
    id: 11,
    nombre: "Super Mix Gourmet",
    descripcion: "Mezcla balanceada de sabores.",
    imagen: Comida,
  },
  {
    id: 12,
    nombre: "Energía Natural",
    descripcion: "Para perros activos.",
    imagen: Comida,
  },
];

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
