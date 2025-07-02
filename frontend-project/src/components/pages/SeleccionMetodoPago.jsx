import React, { useState } from "react";
import {
  Container,
  Button,
  Form,
  Card,
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Image,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import mercadoPagoLogo from "../img/mercado_pago-logo.png";

const tarjetasDisponibles = [
  {
    nombre: "Visa",
    valor: "visa",
    imagen: "https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png",
  },
  {
    nombre: "MasterCard",
    valor: "mastercard",
    imagen:
      "https://upload.wikimedia.org/wikipedia/commons/0/04/Mastercard-logo.png",
  },
  {
    nombre: "American Express",
    valor: "amex",
    imagen:
      "https://e7.pngegg.com/pngimages/711/297/png-clipart-logo-american-express-payment-computer-icons-brand-american-express-blue-text-thumbnail.png",
  },
];

const metodosPago = [
  {
    key: "tarjeta",
    label: "Tarjeta de crédito/débito",
    icon: "💳",
  },
  {
    key: "mercadopago",
    label: "MercadoPago",
    iconImg: mercadoPagoLogo,
  },
  {
    key: "efectivo",
    label: "Efectivo",
    icon: "💵",
  },
];

function SeleccionMetodoPago() {
  const [metodo, setMetodo] = useState("");
  const [tarjeta, setTarjeta] = useState({
    tipo: "",
    numero: "",
    nombre: "",
    vencimiento: "",
    cvv: "",
  });
  const [acuerdoEfectivo, setAcuerdoEfectivo] = useState(false);
  const navigate = useNavigate();

  const handleContinuar = () => {
    if (!metodo) {
      alert("Por favor, selecciona un método de pago.");
      return;
    }
    if (metodo === "tarjeta") {
      if (
        !tarjeta.tipo ||
        !tarjeta.numero ||
        !tarjeta.nombre ||
        !tarjeta.vencimiento ||
        !tarjeta.cvv
      ) {
        alert(
          "Por favor, completa todos los datos de la tarjeta y selecciona el tipo."
        );
        return;
      }
    }
    if (metodo === "efectivo" && !acuerdoEfectivo) {
      alert("Debes aceptar el acuerdo para continuar.");
      return;
    }
    navigate("/seleccion-direccion-horario");
  };
  const handleNumeroTarjeta = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setTarjeta({ ...tarjeta, numero: value });
  };
  const handleCVV = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, "");
    setTarjeta({ ...tarjeta, cvv: value });
  };

  return (
    <Container className="my-5">
      <Card className="p-4 shadow-sm">
        <h2 className="mb-4">Selecciona el método de pago</h2>
        <Row className="mb-4">
          {metodosPago.map((m) => (
            <Col xs={12} md={4} className="mb-2" key={m.key}>
              <Button
                variant={metodo === m.key ? "primary" : "outline-secondary"}
                className="w-100 py-3 d-flex align-items-center justify-content-center"
                style={{
                  fontSize: "1.1rem",
                  fontWeight: metodo === m.key ? "bold" : "normal",
                }}
                onClick={() => setMetodo(m.key)}
              >
                {m.iconImg ? (
                  <img
                    src={m.iconImg}
                    alt={m.label}
                    style={{
                      width: 60,
                      height: 32,
                      marginRight: 14,
                      objectFit: "contain",
                      background: "white",
                      borderRadius: 4,
                      padding: 2,
                    }}
                  />
                ) : (
                  <span style={{ fontSize: "1.5rem", marginRight: 10 }}>
                    {m.icon}
                  </span>
                )}
                {m.label}
              </Button>
            </Col>
          ))}
        </Row>
        {metodo === "tarjeta" && (
          <Form className="mt-4">
            <Row>
              <Col md={6} className="mb-3 d-flex align-items-end">
                <div style={{ width: "100%" }}>
                  <Form.Label>Tipo de tarjeta</Form.Label>
                  <DropdownButton
                    id="dropdown-tipo-tarjeta"
                    title={
                      tarjeta.tipo
                        ? tarjetasDisponibles.find(
                            (t) => t.valor === tarjeta.tipo
                          ).nombre
                        : "Selecciona tipo de tarjeta"
                    }
                    onSelect={(valor) =>
                      setTarjeta({ ...tarjeta, tipo: valor })
                    }
                    variant="outline-secondary"
                  >
                    {tarjetasDisponibles.map((t) => (
                      <Dropdown.Item eventKey={t.valor} key={t.valor}>
                        <Image
                          src={t.imagen}
                          alt={t.nombre}
                          style={{ width: 32, marginRight: 8 }}
                        />
                        {t.nombre}
                      </Dropdown.Item>
                    ))}
                  </DropdownButton>
                </div>
                {tarjeta.tipo && (
                  <div className="ms-3 mb-2 d-flex align-items-center">
                    <Image
                      src={
                        tarjetasDisponibles.find(
                          (t) => t.valor === tarjeta.tipo
                        ).imagen
                      }
                      alt={tarjeta.tipo}
                      style={{ width: 48 }}
                    />
                  </div>
                )}
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Número de tarjeta</Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-numero">
                      Solo se aceptan números
                    </Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    maxLength={19}
                    placeholder="0000 0000 0000 0000"
                    value={tarjeta.numero}
                    onChange={handleNumeroTarjeta}
                    onFocus={(e) => e.target.select()}
                  />
                </OverlayTrigger>
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>Nombre en la tarjeta</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Como figura en la tarjeta"
                  value={tarjeta.nombre}
                  onChange={(e) =>
                    setTarjeta({ ...tarjeta, nombre: e.target.value })
                  }
                />
              </Col>
            </Row>
            <Row>
              <Col md={6} className="mb-3">
                <Form.Label>Vencimiento</Form.Label>
                <Form.Control
                  type="text"
                  maxLength={5}
                  placeholder="MM/AA"
                  value={tarjeta.vencimiento}
                  onChange={(e) =>
                    setTarjeta({ ...tarjeta, vencimiento: e.target.value })
                  }
                />
              </Col>
              <Col md={6} className="mb-3">
                <Form.Label>CVV</Form.Label>
                <OverlayTrigger
                  placement="top"
                  overlay={
                    <Tooltip id="tooltip-cvv">Solo se aceptan números</Tooltip>
                  }
                >
                  <Form.Control
                    type="text"
                    maxLength={4}
                    placeholder="CVV"
                    value={tarjeta.cvv}
                    onChange={handleCVV}
                    onFocus={(e) => e.target.select()}
                  />
                </OverlayTrigger>
              </Col>
            </Row>
          </Form>
        )}
        {metodo === "mercadopago" && (
          <div className="text-center mt-4">
            <p>Escanea el siguiente QR con MercadoPago para continuar:</p>
            <img
              src="https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=MercadoPago"
              alt="QR MercadoPago"
              style={{ width: "200px", height: "200px" }}
            />
            <div className="mt-3">
              <img
                src={mercadoPagoLogo}
                alt="Logo MercadoPago"
                style={{ width: "140px", maxWidth: "100%" }}
              />
            </div>
          </div>
        )}
        {metodo === "efectivo" && (
          <div className="mt-4 text-secondary" style={{ fontSize: "0.95rem" }}>
            <p>Se le cobrará en puerta al momento de la entrega.</p>
            <Form.Check
              type="checkbox"
              id="acuerdo-efectivo"
              label="Estoy de acuerdo"
              checked={acuerdoEfectivo}
              onChange={(e) => setAcuerdoEfectivo(e.target.checked)}
              className="mt-2"
            />
          </div>
        )}
        <div className="d-flex justify-content-end mt-4">
          <Button onClick={handleContinuar} variant="primary">
            Continuar
          </Button>
        </div>
      </Card>
    </Container>
  );
}

export default SeleccionMetodoPago;
