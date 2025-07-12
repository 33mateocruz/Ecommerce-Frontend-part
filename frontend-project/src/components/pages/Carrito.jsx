import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { eliminarDelCarro, actualizarCantidad } from "../../store/cartSlice";
import { useNavigate } from "react-router-dom";
import { Container, Alert, Button } from "react-bootstrap";
import arrowIcon from "../../components/img/arrow-return-left.svg";
import "./Carrito.css"; 

function Carrito() {
  const articulos = useSelector((state) => state.carro.articulos || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((store) => store.auth);

  const handleCheckout = () => {
    if (articulos.length === 0) {
      alert("El carrito está vacío. Agrega productos antes de finalizar la compra.");
      return;
    }
    if (token === null) {
      alert("Necesitas loguearte para poder comprar un producto!");
      navigate("/register");
    } else {
      navigate("/seleccion-pago");
    }
  };

  return (
    <Container className="cart-container my-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Button
          onClick={() => navigate(-1)}
          className="cart-btn d-flex align-items-center rounded-pill shadow-sm"
        >
          <img
            src={arrowIcon}
            alt="Volver"
            style={{ width: "20px", height: "20px", marginRight: "8px" }}
          />
          Volver
        </Button>

        <h1 className="cart-title mb-0 fw-bold">
          Carrito de Compras
        </h1>

        <div style={{ width: "100px" }}></div>
      </div>

      {articulos.length === 0 ? (
        <Alert variant="info" className="text-center shadow-sm">
          El carrito está vacío.
        </Alert>
      ) : (
        <>
          <div className="table-responsive shadow-sm rounded-3">
            <table className="cart-table text-center align-middle mb-0">
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
                        className="cart-product-img"
                      />
                    </td>
                    <td className="fw-semibold">{item.name || "Producto"}</td>
                    <td>
                      <div className="quantity-controls d-flex align-items-center justify-content-center">
                        <Button
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
                          className="cart-btn-quantity rounded-circle px-2"
                        >
                          −
                        </Button>
                        <span
                          className="cart-quantity-text"
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
                          size="sm"
                          onClick={() =>
                            dispatch(
                              actualizarCantidad({
                                id: item.id,
                                cantidad: (item.cantidad || 1) + 1,
                              })
                            )
                          }
                          className="cart-btn-quantity rounded-circle px-2"
                        >
                          +
                        </Button>
                      </div>
                    </td>
                    <td>
                      <Button
                        size="sm"
                        onClick={() => dispatch(eliminarDelCarro(item.id))}
                        className="cart-btn-remove rounded-circle"
                        title="Eliminar"
                      >
                        🗑
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="d-flex justify-content-end mt-4">
            <Button
              onClick={handleCheckout}
              className="cart-btn-primary rounded-pill px-4 py-2 fw-bold shadow"
            >
              Finalizar Compra
            </Button>
          </div>
        </>
      )}
    </Container>
  );
}

export default Carrito;
