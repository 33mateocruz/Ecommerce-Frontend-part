import "./NavegationBar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Link } from "react-router-dom";
import logo from "../components/img/logo.png";
import login from "../components/img/gente-pic.png";
import cart from "../components/img/carro-de-la-compra.png";

function NavBar() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
                <Link to="/myprofile" className="nav-link" onClick={handleClose}>
                  My Profile
                </Link>
              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </Container>
      </Navbar>
    </>
  );
}

export default NavBar;
