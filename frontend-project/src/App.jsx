import "./App.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import Footer from "./components/Footer.jsx";
import NavBar from "./components/navegationBar.jsx";
import ControlledCarousel from "./components/carousels.jsx"

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <NavBar />
      <main className="flex-grow-1">
        {}
        <div className="container py-4">
        </div>
        <ControlledCarousel />
      </main>
      <Footer />
    </div>
  );
}

export default App;
