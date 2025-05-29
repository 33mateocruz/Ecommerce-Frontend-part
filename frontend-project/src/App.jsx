import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Footer from "./components/Footer.jsx";
import NavBar from "./components/navegationBar.jsx";
import ControlledCarousel from "./components/carousels.jsx";
import CardProducts from "./components/Cards.jsx";
import Order from "./components/pages/Order.jsx";
import ProductDetail from "./components/pages/ProductDetail.jsx";
import ShipmentTracking from "./components/pages/Shipmnet-tacking.jsx";
import Register from "./components/pages/Register.jsx";
import { CartProvider } from "./context/CartContext";

const App = () => {
  return (
    <CartProvider>
      <Router>
        <div className="d-flex flex-column min-vh-100">
          <NavBar />
          <main className="flex-grow-1">
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <div className="container py-4"></div>
                    <ControlledCarousel />
                    <CardProducts />
                  </>
                }
              />
              <Route path="/order" element={<Order />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/shipment-tracking" element={<ShipmentTracking />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </CartProvider>
  );
};

export default App;
