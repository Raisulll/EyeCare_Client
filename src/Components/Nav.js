import React, { useState, useEffect } from "react";
import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";
import "bootstrap-icons/font/bootstrap-icons.css";

function NavigationBar() {
  const [user, setUser] = useState(localStorage.getItem("user"));
  const navigate = useNavigate();

  useEffect(() => {
    const handleStorageChange = () => {
      setUser(localStorage.getItem("user"));
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/signin");
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary fixed-top custom-navbar">
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
            {user && (
              <NavLink to="/cart" className="mx-3">
                <i className="bi bi-bag" style={{ fontSize: "1.2rem" }}></i>
              </NavLink>
            )}
            {!user && (
              <div className="mx-3">
                <NavLink to="/signup">
                  <Button variant="outline-secondary">
                    Sign up
                  </Button>
                </NavLink>
              </div>
            )}
            {user ? (
              <NavDropdown
                title={
                  <i
                    className="bi bi-person-circle"
                    style={{ fontSize: "1.5rem" }}
                  ></i>
                }
                id="basic-nav-dropdown"
                align="end"
                menuVariant="dark"
                className="no-arrow"
              >
                <NavDropdown.Item as={NavLink} to="/profile">
                  <i className="bi bi-person me-2"></i>View Profile
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/PatientEditProfile">
                  <i className="bi bi-pencil-square me-2"></i>Edit Profile
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={handleLogout}
                  style={{ cursor: "pointer" }}
                >
                  <i className="bi bi-box-arrow-right me-2"></i>Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <div className="mx-3">
                <NavLink to="/signin">
                  <Button variant="outline-secondary">Sign In</Button>
                </NavLink>
              </div>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavigationBar;
