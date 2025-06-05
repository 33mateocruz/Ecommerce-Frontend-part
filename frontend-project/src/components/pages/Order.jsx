import React from "react";
import { useCart } from "../../context/CartContext";
import { useNavigate } from "react-router-dom";
import "./Order.css";

const Order = () => {
  const { cartItems, removeFromCart, updateQuantity, getTotalPrice } =
    useCart();
  const navigate = useNavigate();

  const handleOrder = () => {
    if (cartItems.length === 0) {
      alert("Tu carrito está vacío");
      return;
    }
    alert("¡Gracias por tu compra! Tu orden ha sido procesada.");
    navigate("/shipment-tracking");
  };

  return (
    <div className="store-container">
      <header className="store-header">
        <h1>Maison Pet</h1>
        <nav className="store-navigation">
          <ul>
            <li onClick={() => navigate("/")}>Inicio</li>
            <li onClick={() => navigate("/")}>Comida</li>
            <li onClick={() => navigate("/")}>Juguetes</li>
            <li onClick={() => navigate("/")}>Accesorios</li>
            <li onClick={() => navigate("/")}>Cuidado</li>
            <li onClick={() => navigate("/")}>Ofertas</li>
          </ul>
        </nav>
        <div className="cart-info">
          <span>
            {cartItems.length} item(s) - ${getTotalPrice().toFixed(2)}
          </span>
          <button className="cart-button" onClick={() => navigate("/order")}>
            Shopping Cart
          </button>
        </div>
      </header>
      <section className="cart-section">
        <h2>Carrito de Compras</h2>
        {cartItems.length === 0 ? (
          <div className="empty-cart-container">
            <p className="empty-cart">Tu carrito está vacío</p>
            <button className="continue-shopping" onClick={() => navigate("/")}>
              Continuar Comprando
            </button>
          </div>
        ) : (
          <>
            <table className="cart-table">
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product Name</th>
                  <th>Model</th>
                  <th>Quantity</th>
                  <th>Unit Price</th>
                  <th>Total</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img src={item.image} alt={item.name} />
                    </td>
                    <td>{item.name}</td>
                    <td>Product {item.id}</td>
                    <td>
                      <input
                        type="number"
                        value={item.quantity}
                        min="1"
                        onChange={(e) =>
                          updateQuantity(item.id, parseInt(e.target.value))
                        }
                      />
                      <button
                        className="update-button"
                        onClick={() => updateQuantity(item.id, item.quantity)}
                      >
                        ⟳
                      </button>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        🗑️
                      </button>
                    </td>
                    <td>${item.price.toFixed(2)}</td>
                    <td>${(item.price * item.quantity).toFixed(2)}</td>
                    <td>
                      <button
                        className="remove-button"
                        onClick={() => removeFromCart(item.id)}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot>
                <tr>
                  <td colSpan="5" className="text-right">
                    <strong>Total:</strong>
                  </td>
                  <td colSpan="2">
                    <strong>${getTotalPrice().toFixed(2)}</strong>
                  </td>
                </tr>
              </tfoot>
            </table>
            <div className="cart-actions">
              <button
                className="continue-shopping"
                onClick={() => navigate("/")}
              >
                Continuar Comprando
              </button>
              <button className="order-button" onClick={handleOrder}>
                Ordenar Ahora
              </button>
            </div>
          </>
        )}
      </section>
    </div>
  );
};

export default Order;
