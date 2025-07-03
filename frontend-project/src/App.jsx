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
import AdminPage from "./components/pages/AdminPage.jsx";
import ProductSlider from "./components/ProductCarousel.jsx";
import SearchResults from "./components/SearchResults";
import ScrollToTop from "./components/ScrollToTop";
import SeleccionMetodoPago from "./components/pages/SeleccionMetodoPago";
import SeleccionDireccionHorario from "./components/pages/SeleccionDireccionHorario";
import PriceDashboard from "./components/PriceDashboard";

const App = () => {
  const [cart, setCart] = useState([]);
  const [filterCategory, setFilterCategory] = useState(null);

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

  const toggleFilter = () => {
    setFilterCategory((prev) => (prev === "1" ? null : "1"));
  };

  return (
    <Router>
      <ScrollToTop />
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
                  <ProductSlider />
                  <CardProducts
                    addToCart={addToCart}
                    filterCategory={filterCategory}
                  />
                  <ControlledCarousel />
                </>
              }
            />
            <Route
              path="/product/:id"
              element={<ProductDetail addToCart={addToCart} />}
            />
            <Route path="/register" element={<Register />} />
            <Route path="/search" element={<SearchResults />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/admin" element={<AdminPage />} />
            <Route
              path="/carrito"
              element={<Carrito cart={cart} removeFromCart={removeFromCart} />}
            />
            <Route path="/shipment" element={<Shipment />} />
            <Route path="/myprofile" element={<MyProfile />} />
            <Route
              path="/categoria/:categoriaId"
              element={<CardProducts addToCart={addToCart} />}
            />
            <Route path="/seleccion-pago" element={<SeleccionMetodoPago />} />
            <Route
              path="/seleccion-direccion-horario"
              element={<SeleccionDireccionHorario />}
            />
            <Route path="/dashboard-precios" element={<PriceDashboard />} />
          </Routes>
        </main>
      </div>
      <Footer />
    </Router>
  );
};

export default App;
