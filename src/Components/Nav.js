import { useState } from "react";
import {
  Button,
  Col,
  Container,
  Form,
  Nav,
  Navbar,
  Row,
} from "react-bootstrap";
import "bootstrap-icons/font/bootstrap-icons.css"; // Ensure you have this line to import Bootstrap Icons

function BasicExample() {
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Implement your search logic here
    console.log("Search submitted:", searchValue);
  };

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand
          href="/home"
          style={{ fontSize: "1.5rem", marginRight: "2rem" }}
        >
          Eye Care
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/home">Home</Nav.Link>
            <Nav.Link href="/shop">Shop</Nav.Link>
          </Nav>
          <Form inline onSubmit={handleSubmit}>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Control
                  type="text"
                  placeholder="Search"
                  className="mr-sm-1"
                  value={searchValue}
                  onChange={handleSearchChange}
                />
              </Col>
              <Col xs="auto">
                <Button type="submit" className="me-2">
                  Search
                </Button>
              </Col>
            </Row>
          </Form>
          <Nav className="align-items-center">
            <Nav.Link href="/cart" className="mx-3">
              <i className="bi bi-cart" style={{ fontSize: "1.5rem" }}></i>
            </Nav.Link>
            <Nav.Link href="/signup">
              <Button variant="dark" className="me-2">
                Sign Up
              </Button>
            </Nav.Link>
            <Nav.Link href="/signin">
              <Button variant="outline-secondary">Sign In</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default BasicExample;
