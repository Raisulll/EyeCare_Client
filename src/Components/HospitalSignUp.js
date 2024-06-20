import React, { useState, useEffect } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function EyeHospitalManagerSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  const [hospitalLicense, setHospitalLicense] = useState("");
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
      patientName: fullName,
      patientEmail: email,
      patientPhone: phoneNumber,
      patientDistrict: district,
      patientArea: area,
      patientRoadNum: roadNumber,
      hospitalLicense: hospitalLicense,
      patientPassword: password,
    };

    const result = await fetch("http://localhost:5000/auth/signup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      navigate("/signin");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Eye Hospital Manager Sign Up
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formFullName">
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="test@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formPhoneNumber">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="District"
                    className="mb-2"
                    value={district}
                    onChange={(e) => setDistrict(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Area"
                    className="mb-2"
                    value={area}
                    onChange={(e) => setArea(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Road Number"
                    value={roadNumber}
                    onChange={(e) => setRoadNumber(e.target.value)}
                  />
                </Form.Group>


                <Form.Group className="mb-3" controlId="formHospitalLicense">
                  <Form.Label>Hospital License</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hospital License Number"
                    value={hospitalLicense}
                    onChange={(e) => setHospitalLicense(e.target.value)}
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
                  Sign Up
                </Button>
              </Form>
            </Card.Body>
            <div className="text-center mt-3 bottommrgn">
              <span>Already have an account? </span>
              <NavLink to="/otheruserssignin" className="auth-link">
                Sign In
              </NavLink>
            </div>
            <div className="text-center mt-3">
              <span>
                Are you a Doctor, Shop Owner, or Eye Hospital Manager?{" "}
              </span>
              <NavLink to="/otheruserssignup" className="auth-link">
                Other User Sign Up
              </NavLink>
            </div>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default EyeHospitalManagerSignUp;
