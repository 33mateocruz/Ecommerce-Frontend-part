import React, { useState } from "react";
import { Container, Button, Form, Card, Row, Col } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { finalizarCompra } from "../../store/cartSlice";

// datos hardcodeadeos que vendrian del usuario, aun no implementado
const datosPredefinidos = {
  direccion: "Calle Falsa 123, Ciudad, País",
  horario: "09:00 - 12:00",
};

function SeleccionDireccionHorario() {
  const [direccion, setDireccion] = useState("");
  const [horario, setHorario] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const articulos = useSelector((state) => state.carro.articulos || []);

  const usarPredefinidos = () => {
    setDireccion(datosPredefinidos.direccion);
    setHorario(datosPredefinidos.horario);
  };

  const handleContinuar = () => {
    if (!direccion || !horario) {
      alert("Por favor, completa la dirección y el horario de entrega.");
      return;
    }
    dispatch(finalizarCompra(articulos));
    navigate("/shipment");
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Dirección y horario de entrega</h2>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Dirección de entrega</Form.Label>
            <Form.Control
              type="text"
              value={direccion}
              onChange={(e) => setDireccion(e.target.value)}
              placeholder="Introduce la dirección"
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Horario de entrega</Form.Label>
            <Form.Control
              type="text"
              value={horario}
              onChange={(e) => setHorario(e.target.value)}
              placeholder="Ej: 09:00 - 12:00"
            />
          </Form.Group>
        </Form>
        <Row className="mt-3">
          <Col>
            <Button variant="secondary" onClick={usarPredefinidos}>
              Usar datos predefinidos
            </Button>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={handleContinuar}>
              Continuar
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
}

export default SeleccionDireccionHorario;
