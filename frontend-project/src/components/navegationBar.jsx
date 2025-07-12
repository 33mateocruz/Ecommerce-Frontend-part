import "./NavegationBar.css";
import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link, useNavigate } from "react-router-dom";
import logo from "../components/img/logo.png";
import login from "../components/img/gente-pic.png";
import cart from "../components/img/carro-de-la-compra.png";

function NavBar() {
  const [show, setShow] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLogged, setIsLogged] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user"); // o token o lo que uses
    setIsLogged(!!user);
  }, []);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim() !== "") {
      navigate(`/search?query=${encodeURIComponent(searchTerm)}`);
      setSearchTerm(""); // limpia el input
      setShow(false); // cierra el menú en mobile si está abierto
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user"); // limpiás la sesión
    setIsLogged(false);
    navigate("/");
  };

  return (
    <>
      <Navbar
        expand={false}
        className="bg-body-tertiary sticky-top custom-navbar"
      >
        <Container fluid>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img className="logo-nav" src={logo} alt="maison pet logo" />
            </Navbar.Brand>
          </Link>

          {/* Buscador para escritorio */}
          <Form
            onSubmit={handleSearch}
            className="d-none d-md-flex align-items-center rounded shadow-sm bg-white px-0.5 mx-auto"
            style={{ gap: "0.5rem", maxWidth: "400px", flexGrow: 1 }}
          >
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="border-0"
              style={{ boxShadow: "none" }}
              aria-label="Buscar"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Button variant="dark" className="custom-dark" type="submit">
              Buscar
            </Button>
          </Form>

          <Link to="/carrito" style={{ textDecoration: "none" }}>
            <Button variant="outline-0" className="ms-2 buttom-shop">
              <img src={cart} alt="carro de compra" className="logo" />
            </Button>
          </Link>

          {isLogged ? (
            <Button
              variant="outline-0"
              className="ms-2 buttom-login"
              onClick={handleLogout}
              style={{ color: "red", fontWeight: "bold" }}
            >
              Cerrar sesión
            </Button>
          ) : (
            <Link to="/register" style={{ textDecoration: "none" }}>
              <Button variant="outline-0" className="ms-2 buttom-login">
                <img src={login} alt="log in" className="logo" />
              </Button>
            </Link>
          )}

          {/* Botón de menú para mobile */}
          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

          {/* Menú offcanvas para mobile */}
          <Offcanvas
            show={show}
            onHide={handleClose}
            id="offcanvasNavbar"
            aria-labelledby="offcanvasNavbarLabel"
            placement="end"
          >
            <Offcanvas.Header closeButton>
              <Offcanvas.Title id="offcanvasNavbarLabel">
                <div className="nav-title"> Menú 🐱</div>
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body
              style={{
                display: "flex",
                flexDirection: "column",
                height: "100%",
              }}
            >
              {/* Buscador en mobile */}
              <Form
                onSubmit={handleSearch}
                className="d-block d-md-none mb-3"
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Buscar productos..."
                  className="border-0"
                  style={{ boxShadow: "none" }}
                  aria-label="Buscar"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                <Button variant="dark" type="submit">
                  Buscar
                </Button>
              </Form>

              <Nav className="flex-grow-1 pe-3 categories" navbarScroll>
                <Link to="/" className="nav-link" onClick={handleClose}>
                  Home
                </Link>
                <Link to="/about-us" className="nav-link" onClick={handleClose}>
                  About Us
                </Link>
                <Link
                  to="/acerca-proyecto"
                  className="nav-link"
                  onClick={handleClose}
                >
                  Acerca de este proyecto
                </Link>
                <Link
                  to="/myprofile"
                  className="nav-link"
                  onClick={handleClose}
                >
                  My Profile
                </Link>

                {isLogged ? (
                  <Nav.Link
                    onClick={() => {
                      handleLogout();
                      handleClose();
                    }}
                    style={{
                      color: "red",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Cerrar sesión
                  </Nav.Link>
                ) : (
                  <Link
                    to="/register"
                    className="nav-link"
                    onClick={handleClose}
                  >
                    Registrarse
                  </Link>
                )}
              </Nav>
              <div
                style={{
                  borderTop: "1px solid #e5e7eb",
                  paddingTop: "1rem",
                  marginTop: "auto",
                }}
              >
                <a
                  href="/dashboard-precios"
                  className="nav-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={handleClose}
                  style={{
                    color: "#2563eb",
                    fontWeight: "600",
                    display: "block",
                    textAlign: "center",
                  }}
                >
                  📊 Productos Destacados
                </a>
              </div>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
