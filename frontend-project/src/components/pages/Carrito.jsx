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
      alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
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
          className="d-flex align-items-center rounded-pill shadow-sm"
        >
          <img
            src={arrowIcon}
            alt="Volver"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Volver
        </Button>
        <h1 className="mb-0 text-primary fw-bold">Carrito de Compras</h1>
        <div style={{ width: "100px" }}></div>
      </div>

      {articulos.length === 0 ? (
        <Alert variant="info" className="text-center shadow-sm">
          El carrito está vacío.
        </Alert>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded-3">
            <Table striped bordered hover className="text-center align-middle mb-0">
              <thead className="table-light">
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
                          width: "100px",
                          height: "100px",
                          objectFit: "contain",
                          borderRadius: "8px",
                          boxShadow: "0 2px 6px rgba(0,0,0,0.1)",
                        }}
                      />
                    </td>
                    <td className="fw-semibold">{item.name || "Producto"}</td>
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
                          className="rounded-circle px-2"
                        >
                          −
                        </Button>
                        <span
                          style={{
                            minWidth: "30px",
                            textAlign: "center",
                            fontWeight: "500",
                            margin: "0 10px",
                          }}
                        >
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
                          className="rounded-circle px-2"
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => dispatch(eliminarDelCarro(item.id))}
                        className="rounded-circle"
                        title="Eliminar"
                      >
                        🗑
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          <div className="d-flex justify-content-end mt-4">
            <Button
              variant="primary"
              className="rounded-pill px-4 py-2 fw-bold shadow"
              onClick={handleCheckout}
            >
              Finalizar compra
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;
