import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/navegationBar.jsx";
import Order from "./pages/Order.js";
import ProductDetail from "./pages/ProductDetail.js";
import ShipmentTracking from "./pages/Shipmnet-tacking.jsx";
import Register from "./pages/Register.js";
import { CartProvider } from "./context/CartContext";
import AboutUs from "./pages/AboutUs.js";
import Home from "./pages/Home.jsx";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/order" element={<Order />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/shipment-tracking" element={<ShipmentTracking />} />
              <Route path="/register" element={<Register />} />
              <Route path="/about-us" element={<AboutUs />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
