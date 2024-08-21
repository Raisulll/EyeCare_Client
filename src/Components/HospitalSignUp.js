import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function EyeHospitalManagerSignUp() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalMail, setHospitalMail] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalDistrict, setHospitalDistrict] = useState("");
  const [hospitalArea, setHospitalArea] = useState("");
  const [hospitalRoadNum, setHospitalRoadNum] = useState("");
  const [hospitalLicense, setHospitalLicense] = useState("");
  const [hospitalPassword, setHospitalPassword] = useState("");
  const [showHospitalPassword, setShowHospitalPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/hospitalprofile");
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      hospitalName:hospitalName,
      hospitalMail:hospitalMail,
      hospitalPhone:hospitalPhone,
      hospitalDistrict:hospitalDistrict,
      hospitalArea:hospitalArea,
      hospitalRoadNum: hospitalRoadNum,
      hospitalLicense:hospitalLicense,
      hospitalPassword:hospitalPassword,
    };

    try {
      const result = await fetch("http://localhost:5000/auth/hospitalsignup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        navigate("/otheruserssignin");
      } else {
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
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
              <Form onSubmit={collectData}>
                <Form.Group className="mb-3" controlId="formHospitalName">
                  <Form.Label>Hospital Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Hospital Name"
                    value={hospitalName}
                    onChange={(e) => setHospitalName(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicHospitalMail">
                  <Form.Label>HospitalMail address</Form.Label>
                  <Form.Control
                    type="hospitalMail"
                    placeholder="test@example.com"
                    value={hospitalMail}
                    onChange={(e) => setHospitalMail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formHospitalPhone">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Phone Number"
                    value={hospitalPhone}
                    onChange={(e) => setHospitalPhone(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="HospitalDistrict"
                    className="mb-2"
                    value={hospitalDistrict}
                    onChange={(e) => setHospitalDistrict(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="HospitalArea"
                    className="mb-2"
                    value={hospitalArea}
                    onChange={(e) => setHospitalArea(e.target.value)}
                  />
                  <Form.Control
                    type="text"
                    placeholder="Road Number"
                    value={hospitalRoadNum}
                    onChange={(e) => setHospitalRoadNum(e.target.value)}
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

                <Form.Group
                  className="mb-3"
                  controlId="formBasicHospitalPassword"
                >
                  <Form.Label>HospitalPassword</Form.Label>
                  <div className="hospitalPassword-input-container">
                    <Form.Control
                      type={showHospitalPassword ? "text" : "hospitalPassword"}
                      placeholder="Your HospitalPassword"
                      value={hospitalPassword}
                      onChange={(e) => setHospitalPassword(e.target.value)}
                      className="hospitalPassword-input"
                    />
                    <FontAwesomeIcon
                      icon={showHospitalPassword ? faEye : faEyeSlash}
                      className="hospitalPassword-toggle-icon"
                      onClick={() =>
                        setShowHospitalPassword(!showHospitalPassword)
                      }
                    />
                  </div>
                </Form.Group>

                <Button variant="primary" type="submit" className="w-100">
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
