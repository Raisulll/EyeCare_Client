import { Container, Row, Col, Card, Button, Form } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../App.css"; // Import the CSS file

function SignUp() {
  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Sign up to Eye Care
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control type="text" placeholder="John Doe" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="test@example.com" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control type="text" placeholder="Phone Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formDateOfBirth">
                  <Form.Label>Date of Birth</Form.Label>
                  <Form.Control type="date" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="District"
                    className="mb-2"
                  />
                  <Form.Control
                    type="text"
                    placeholder="Area"
                    className="mb-2"
                  />
                  <Form.Control type="text" placeholder="Road Number" />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGender">
                  <Form.Label>Gender</Form.Label>
                  <Form.Control as="select">
                    <option>Male</option>
                    <option>Female</option>
                  </Form.Control>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Your Password" />
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
            <div className="text-center mt-3 bottommrgn">
              <span>Already have an account? </span>
              <NavLink to="/signin" className="auth-link">
                Sign In
              </NavLink>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignUp;
