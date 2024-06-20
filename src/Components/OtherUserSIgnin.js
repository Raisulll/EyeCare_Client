import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../App.css";

function OtherUserSignin() {
  const [userType, setUserType] = useState("");
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
      userType: userType,
      doctorEmail: email,
      doctorPassword: password,
    };

    if (userType === "doctor") {
      delete data.userType;
      console.log(data);
      const result = await fetch("http://localhost:5000/auth/doctorsignin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));

        window.dispatchEvent(new Event("storage"));
        navigate("/");
        console.log("Doctor Sign In Successful");
      }
      else {
        console.log("Doctor Sign In Failed");
      }
    }
    if (userType === "shopOwner") {
      delete data.userType;
      const result = await fetch("http://localhost:5000/auth/shoposignin", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));

        window.dispatchEvent(new Event("storage"));
        navigate("/");
        console.log("Shop Owner Sign In Successful");
      } else {
        console.log("Shop Owner Sign In Failed");
      }
    }
    if (userType === "eyeHospitalManager") {
      delete data.userType;
      const result = await fetch(
        "http://localhost:5000/auth/hospitalsignin",
        {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));

        window.dispatchEvent(new Event("storage"));
        navigate("/");
        console.log("Hospital Sign In Successful");
      } else {
        console.log("Hospital Sign In Failed");
      }
    }
  };

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
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="test@example.com" />
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicPassword"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                >
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" placeholder="Your Password" />
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
              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <NavLink
                  to="/otheruserssignup"
                  className="other-users-signup-link"
                  style={{ textDecoration: "none" }}
                >
                  Other User Sign Up
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
