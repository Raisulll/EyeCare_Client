import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import "../App.css";

function OtherUserSignin() {
  const [userType, setUserType] = useState("");

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Other Users Sign In
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formUserType">
                  <Form.Label>Select User Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="doctor">Doctor</option>
                    <option value="shopOwner">Shop Owner</option>
                    <option value="eyeHospitalManager">
                      Eye Hospital Manager
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicId">
                  <Form.Label>Your ID</Form.Label>
                  <Form.Control type="text" placeholder="Your ID" />
                </Form.Group>
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
                  to="/signin"
                  className="other-users-signin-link"
                  style={{ textDecoration: "none" }}
                >
                  Patient Login
                </NavLink>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OtherUserSignin;
