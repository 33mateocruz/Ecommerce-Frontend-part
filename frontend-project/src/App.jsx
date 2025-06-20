import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/footer.jsx";
import NavBar from "./components/navegationBar.jsx";
import ControlledCarousel from "./components/carousels.jsx";
import CardProducts from "./components/Cards.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import Register from "./components/pages/Register.jsx";
import AboutUs from "./components/pages/AboutUs";
import Carrito from "./components/pages/Carrito.jsx";
import Shipment from "./components/pages/Shipment.jsx";
import MyProfile from "./components/pages/MyProfile.jsx";
import React, { useState } from "react";
import Hero from "./components/Hero.jsx";

const App = () => {
  const [cart, setCart] = useState([]);

  const addToCart = (product, quantity) => {
    setCart((prevCart) => {
      const existing = prevCart.find((item) => item.id === product.id);
      if (existing) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  return (
    <Router>
      <div className="d-flex flex-column min-vh-100">
        <NavBar cart={cart} />
        <main className="flex-grow-1">
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Hero />
                  <div className="container py-4"></div>
                  <ControlledCarousel />
                  <CardProducts addToCart={addToCart} />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route
              path="/carrito"
              element={<Carrito cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/myprofile" element={<MyProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
