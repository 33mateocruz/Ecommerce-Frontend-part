import "./NavegationBar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import logo from "../components/img/logo.png";
import login from "../components/img/gente-pic.png";
import cart from "../components/img/carro-de-la-compra.png";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // Para manejar clicks en dropdown title (que es link)
  const handleDropdownClick = (e) => {
    // Evita que al clickear en el texto se abra el dropdown
    e.stopPropagation();
  };

  return (
    <>
      <Navbar expand={false} className="bg-body-tertiary">
        <Container fluid>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Navbar.Brand>
              <img className="logo-nav" src={logo} alt="maison pet logo" />
            </Navbar.Brand>
          </Link>

          {/* Buscador en pantallas medianas o grandes */}
          <Form
            className="d-none d-md-flex align-items-center rounded shadow-sm bg-white px-0.5 mx-auto"
            style={{ gap: "0.5rem", maxWidth: "400px", flexGrow: 1 }}
          >
            <Form.Control
              type="search"
              placeholder="Buscar productos..."
              className="border-0"
              style={{ boxShadow: "none" }}
              aria-label="Buscar"
            />
            <Button variant="dark" className="custom-dark">
              Buscar
            </Button>
          </Form>

          <Link to="/carrito" style={{ textDecoration: "none" }}>
            <Button variant="outline-0" className="ms-2 buttom-shop">
              <img src={cart} alt="carro de compra" className="logo" />
            </Button>
          </Link>
          <Link to="/register" style={{ textDecoration: "none" }}>
            <Button variant="outline-0" className="ms-2 buttom-login">
              <img src={login} alt="log in" className="logo" />
            </Button>
          </Link>

          <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={handleShow} />

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
            <Offcanvas.Body>
              {/* Buscador en pantallas chicas */}
              <Form
                className="d-block d-md-none mb-3"
                style={{ display: "flex", gap: "0.5rem" }}
              >
                <Form.Control
                  type="search"
                  placeholder="Buscar productos..."
                  className="border-0"
                  style={{ boxShadow: "none" }}
                  aria-label="Buscar"
                />
                <Button variant="dark">Buscar</Button>
              </Form>

              <Nav
                className="justify-content-end flex-grow-1 pe-3 categories"
                navbarScroll
              >
                <Link to="/" className="nav-link" onClick={handleClose}>
                  Home
                </Link>
                <Link to="/about-us" className="nav-link" onClick={handleClose}>
                  About Us
                </Link>
                <Link
                  to="/myprofile"
                  className="nav-link"
                  onClick={handleClose}
                >
                  My Profile
                </Link>

                <div className="nav-separator">Categorías</div>

                {/* Comida con dropdown */}
                <NavDropdown
                  id="dropdown-comida"
                  title={
                    <Link
                      to="/categoria/comida"
                      onClick={(e) => {
                        e.preventDefault(); // para evitar que abra dropdown al clickear texto
                        window.location.href = "/categoria/comida"; // navegamos
                      }}
                      className="dropdown-link"
                      onMouseDown={handleDropdownClick}
                    >
                      Comida
                    </Link>
                  }
                  className="dropdown-nav"
                  drop="end"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/comida/perros"
                    onClick={handleClose}
                  >
                    Perros
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/comida/gatos"
                    onClick={handleClose}
                  >
                    Gatos
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Juguetes con dropdown */}
                <NavDropdown
                  id="dropdown-juguetes"
                  title={
                    <Link
                      to="/categoria/juguetes"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/categoria/juguetes";
                      }}
                      className="dropdown-link"
                      onMouseDown={handleDropdownClick}
                    >
                      Juguetes
                    </Link>
                  }
                  className="dropdown-nav"
                  drop="end"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/juguetes/perros"
                    onClick={handleClose}
                  >
                    Perros
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/juguetes/gatos"
                    onClick={handleClose}
                  >
                    Gatos
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown
                  id="dropdown-ropa"
                  title={
                    <Link
                      to="/categoria/ropa"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/categoria/ropa";
                      }}
                      className="dropdown-link"
                      onMouseDown={handleDropdownClick}
                    >
                      Ropa
                    </Link>
                  }
                  className="dropdown-nav"
                  drop="end"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/ropa/perros"
                    onClick={handleClose}
                  >
                    Perros
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/categoria/ropa/gatos"
                    onClick={handleClose}
                  >
                    Gatos
                  </NavDropdown.Item>
                </NavDropdown>

                {/* Servicios con dropdown */}
                <NavDropdown
                  id="dropdown-servicios"
                  title={
                    <Link
                      to="/servicios"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href = "/servicios";
                      }}
                      className="dropdown-link"
                      onMouseDown={handleDropdownClick}
                    >
                      Servicios
                    </Link>
                  }
                  className="dropdown-nav"
                  drop="end"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/servicios/duchas"
                    onClick={handleClose}
                  >
                    Duchas
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/servicios/esquilado"
                    onClick={handleClose}
                  >
                    Esquilado
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to="/servicios/entrenamiento"
                    onClick={handleClose}
                  >
                    Entrenamiento
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
