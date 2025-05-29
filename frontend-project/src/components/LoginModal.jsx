import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useNavigate } from "react-router-dom";

function LoginModal({ show, handleClose, onForgotPassword }) {
  const navigate = useNavigate();

  const handleRegisterClick = () => {
    handleClose(); // Close the login modal
    navigate("/register"); // Navigate to register page
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Iniciar Sesión</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control type="password" placeholder="Contraseña" />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100 mb-2">
            Iniciar Sesión
          </Button>
        </Form>

        <div className="d-flex justify-content-between">
          <Button variant="link" className="p-0" onClick={onForgotPassword}>
            ¿Olvidaste tu contraseña?
          </Button>
          <Button
            variant="link"
            className="p-0 text-decoration-none"
            onClick={handleRegisterClick}
          >
            Registrarse
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
