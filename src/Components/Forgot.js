import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../App.css";

function ForgotPassword() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const navigate = useNavigate();

  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userType: userType,
      email: email,
    };
    console.log(data);
    const result = await fetch("http://localhost:5000/auth/resetpassword", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.status === 200) {
      const responseData = await result.json();
      setIsSubmitted(true);
      navigate("/otp", { state: { email: responseData.email } }); // Pass the email as state
    } else {
      console.log("Password Reset Failed");
    }
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center containerColor"
      style={{ height: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Forgot Password
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formUserType">
                  <Form.Label>Select User Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="patient">Patient</option>
                    <option value="doctor">Doctor</option>
                    <option value="shopOwner">Shop Owner</option>
                    <option value="eyeHospitalManager">
                      Eye Hospital Manager
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                <Button variant="primary" type="submit" className="w-100">
                  Submit
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default ForgotPassword;
