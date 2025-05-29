import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

function ResetPasswordModal({ show, handleClose }) {
  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Restablecer Contraseña</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="resetEmail">
            <Form.Label>Correo electrónico</Form.Label>
            <Form.Control type="email" placeholder="Ingresa tu correo" />
          </Form.Group>
          <Button variant="primary" type="submit" className="w-100">
            Enviar enlace de restablecimiento
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default ResetPasswordModal;
