import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../App.css";

function SignIn() {
  return (
    <Container
      className="d-flex justify-content-center align-items-center signin-container"
      style={{ height: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Sign in to Eye Care
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="test@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Your Password" />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <NavLink to="/signup" className="signin-link sign-up-link">
                  Sign Up
                </NavLink>
              </div>
              <div className="text-center mt-3">
                <span>Forgot your password? </span>
                <NavLink
                  to="/forgotpassword"
                  className="forgot-password-link"
                  style={{ textDecoration: "none" }}
                >
                  Reset Password
                </NavLink>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <NavLink
                  to="/otheruserssignin"
                  className="other-users-signin-link"
                  style={{ textDecoration: "none" }}
                >
                  Other User Sign In
                </NavLink>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default SignIn;
