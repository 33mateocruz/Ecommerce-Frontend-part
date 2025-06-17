import React from "react";
import { Container, Table, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  eliminarDelCarro,
  finalizarCompra,
  actualizarCantidad,
} from "../../store/cartSlice";
import arrowIcon from "../../components/img/arrow-return-left.svg";

function Carrito() {
  const articulos = useSelector((state) => state.carro.articulos || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (articulos.length === 0) {
      alert(
        "El carrito está vacío. Agrega productos antes de finalizar la compra."
      );
      return;
    }

    dispatch(finalizarCompra(articulos));

    alert("¡Gracias por tu compra!");
    navigate("/shipment");
  };

  return (
    <Container className="my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          variant="outline-primary"
          onClick={() => navigate(-1)}
          className="d-flex align-items-center"
        >
          <img
            src={arrowIcon}
            alt="Volver"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Volver
        </Button>
        <h1 className="mb-0">Carrito de Compras</h1>
        <div style={{ width: "100px" }}></div> {}
      </div>
      {articulos.length === 0 ? (
        <Alert variant="info">El carrito está vacío.</Alert>
      ) : (
        <>
          <Table striped bordered hover responsive className="text-center">
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
              {articulos.map((item, index) => (
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
                  <td>
                    <div className="d-flex align-items-center justify-content-center">
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() => {
                          if ((item.cantidad || 1) > 1) {
                            dispatch(
                              actualizarCantidad({
                                id: item.id,
                                cantidad: (item.cantidad || 1) - 1,
                              })
                            );
                          }
                        }}
                        style={{ marginRight: "5px" }}
                      >
                        -
                      </Button>
                      <span style={{ minWidth: "30px", textAlign: "center" }}>
                        {item.cantidad || 1}
                      </span>
                      <Button
                        variant="outline-secondary"
                        size="sm"
                        onClick={() =>
                          dispatch(
                            actualizarCantidad({
                              id: item.id,
                              cantidad: (item.cantidad || 1) + 1,
                            })
                          )
                        }
                        style={{ marginLeft: "5px" }}
                      >
                        +
                      </Button>
                    </div>
                  </td>
                  <td className="text-center">
                    <Button
                      variant="btn btn-outline-info"
                      size="sm"
                      onClick={() => dispatch(eliminarDelCarro(item.id))}
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
