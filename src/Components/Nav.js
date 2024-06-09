import { Container, Navbar, Nav, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../App.css"; // Import the CSS file

function NavigationBar() {
  return (
    <Navbar
      expand="lg"
      className="bg-body-tertiary fixed-top"
      style={{ backgroundColor: "#f8f9fa" }}
    >
      <Container>
        <Navbar.Brand as={NavLink} to="/home">
          Eye Care
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/home">
              Home
            </Nav.Link>
            <Nav.Link as={NavLink} to="/shop">
              Shop
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search product..."
              className="me-2"
              aria-label="Search"
            />
            <Button variant="outline-secondary" className="me-2">
              Search
            </Button>
          </Form>
          <Nav className="d-flex align-items-center">
            <NavLink to="/cart" className="mx-3">
              <i className="bi bi-bag" style={{ fontSize: "1.2rem" }}></i>
            </NavLink>
            <div className="mx-3">
              <NavLink to="/signup">
                <Button variant="dark" className="me-2">
                  Sign Up
                </Button>
              </NavLink>
            </div>
            <div className="mx-3">
              <NavLink to="/signin">
                <Button variant="outline-secondary">Sign In</Button>
              </NavLink>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
