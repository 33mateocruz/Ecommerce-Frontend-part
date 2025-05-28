import "./NavegationBar.css";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Offcanvas from "react-bootstrap/Offcanvas";
import logo from "../components/img/logo.png";
import login from "../components/img/gente-pic.png";
import cart from "../components/img/carro-de-la-compra.png";
import LoginModal from "./LoginModal"; 

function NavBar() {
  const [showLogin, setShowLogin] = useState(false);

  const handleLoginOpen = () => setShowLogin(true);
  const handleLoginClose = () => setShowLogin(false);

  return (
    <>
      {[false].map((expand) => (
        <Navbar key={expand} expand={expand} className="bg-body-tertiary mb-3">
          <Container fluid>
            <Navbar.Brand href="#">
              <img className="logo-nav" src={logo} alt="maison pet logo" />
            </Navbar.Brand>

            <Form
              className="d-flex align-items-center rounded shadow-sm bg-white px-0.5 mx-auto"
              style={{ gap: "0.5rem", width: "20%" }}
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

            <Button variant="outline-0" className="ms-2 buttom-shop">
              <img src={cart} alt="carro de compra" className="logo" />
            </Button>

            <Button
              variant="outline-0"
              className="ms-2 buttom-login"
              onClick={handleLoginOpen}
            >
              <img src={login} alt="log in" className="logo" />
            </Button>

            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />

            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  Menú
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  <Nav.Link href="#home">Home</Nav.Link>
                  <Nav.Link href="#link">Link</Nav.Link>
                  <NavDropdown
                    title="Dropdown"
                    id={`offcanvasNavbarDropdown-expand-${expand}`}
                  >
                    <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                    <NavDropdown.Item href="#action4">
                      Another action
                    </NavDropdown.Item>
                    <NavDropdown.Divider />
                    <NavDropdown.Item href="#action5">
                      Something else
                    </NavDropdown.Item>
                  </NavDropdown>
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}

      {/* Login Modal Integration */}
      <LoginModal show={showLogin} handleClose={handleLoginClose} />
    </>
  );
}

export default NavBar;
