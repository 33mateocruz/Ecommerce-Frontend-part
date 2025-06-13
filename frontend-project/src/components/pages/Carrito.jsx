import React from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCart } from "../../store/cartSlice";

function Carrito() {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    alert("¡Gracias por tu compra!");
    navigate("/shipment");
  };

  return (
    <Container className="my-5">
      <h1 className="mb-4">Carrito de Compras</h1>
      {cart.length === 0 ? (
        <Alert variant="info">El carrito está vacío.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>#</th>
                <th>Imagen</th>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item, index) => (
                <tr key={item.id || index}>
                  <td>{index + 1}</td>
                  <td>
                    <img
                      src={item.image}
                      alt={item.name}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "contain",
                        borderRadius: "8px",
                        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
                      }}
                    />
                  </td>
                  <td>{item.name || "Producto"}</td>
                  <td>{item.quantity || 1}</td>
                  <td>
                    <Button
                      variant="btn btn-outline-info"
                      size="sm"
                      onClick={() => dispatch(removeFromCart(item.id))}
                    >
                      🗑
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <div className="d-flex justify-content-end">
            <Button variant="primary" onClick={handleCheckout}>
              Finalizar compra
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;
