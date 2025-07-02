import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Container, Card, ProgressBar, Row, Col } from "react-bootstrap";
import "../pages/Shipment.css";

function Shipment() {
  const comprasDeArticulos = useSelector(
    (state) => state.carro.comprasDeArticulos || []
  );

  const total = comprasDeArticulos.reduce(
    (acc, producto) => acc + producto.price * (producto.cantidad || 1),
    0
  );

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
              <ProgressBar now={60} label={`60%`} className="mb-4" />
              <ul style={{ listStylePosition: "inside" }}>
                <li>Pedido realizado 🛒✅</li>
                <li>Pedido recibido 📦✅</li>
                <li>Despachado 🚚✅</li>
                <li>En tránsito 📍</li>
                <li>Entregado 🏠</li>
              </ul>
              <Card.Text className="mt-3">
                <strong>Detalles del producto comprado:</strong>
              </Card.Text>
              <ul style={{ listStylePosition: "inside" }}>
                {Array.isArray(comprasDeArticulos) &&
                comprasDeArticulos.length > 0 ? (
                  comprasDeArticulos.map((producto) => (
                    <li key={producto.id}>
                      {producto.name} - $ {producto.price} (Cantidad:{" "}
                      {producto.cantidad})
                    </li>
                  ))
                ) : (
                  <li>No hay productos comprados.</li>
                )}
              </ul>
              {comprasDeArticulos.length > 0 && (
                <div className="mt-3">
                  <strong>Total del pedido: $ {total.toFixed(2)}</strong>
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Shipment;
