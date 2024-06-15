import { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  });

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      patientEmail: email,
      patientPassword: password,
    };
    console.log(data);
    const result = await fetch("http://localhost:5000/auth/login", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.status === 200) {
      localStorage.setItem("user", JSON.stringify(data));
      navigate("/");
      console.log("User Logged In");
    }
  };

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
                  <Form.Control
                    type="email"
                    placeholder="test@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  onClick={collectData}
                >
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
