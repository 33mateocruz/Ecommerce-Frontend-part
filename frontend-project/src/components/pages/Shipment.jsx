import React from "react";
import { Container, Card, ProgressBar, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Shipment() {
  const progress = 60;
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    navigate("/shipment");
  };

  return (
    <Container className="my-5">
      <Row className="justify-content-center">
        <Col md={8}>
          <Card>
            <Card.Body>
              <Card.Title>Seguimiento de tu envío</Card.Title>
              <Card.Text>
                ¡Gracias por tu compra! Tu pedido está en camino.
              </Card.Text>
              <ProgressBar
                now={progress}
                label={`${progress}%`}
                className="mb-4"
              />
              <ul>
                <li>Pedido recibido</li>
                <li>Preparando tu paquete</li>
                <li>En camino</li>
                <li>Pendiente de entrega</li>
              </ul>
              <Card.Text className="mt-3">
                <strong>Dirección de entrega:</strong> Calle Falsa 123,
                Ciudad, País
              </Card.Text>
              <Card.Text>
                <strong>Número de seguimiento:</strong> +8347347
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Shipment;
