import "./NavegationBar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import { href, Link } from "react-router-dom";
import logo from "../components/img/logo.png";
import login from "../components/img/gente-pic.png";
import cart from "../components/img/carro-de-la-compra.png";

function NavBar() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary">
          <Container fluid>
            <Link to="/" style={{ textDecoration: "none" }}>
              <Navbar.Brand>
                <img className="logo-nav" src={logo} alt="maison pet logo" />
              </Navbar.Brand>
            </Link>

            {/* Buscador visible solo en pantallas medianas o grandes */}
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
              <Button variant="dark">Buscar</Button>
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

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú 🐱
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {/* Buscador solo visible en pantallas chicas */}
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
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Link to="/" className="nav-link">
                    Home
                  </Link>
                  <Link to="/about-us" className="nav-link">About Us</Link>
                   <Link to="/about-us" className="nav-link">My profile</Link>
                  <NavDropdown
                    title="Categories"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Food</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">Toys</NavDropdown.Item>
                    <NavDropdown.Item href="#action5">Clothes</NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Services
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default NavBar;
