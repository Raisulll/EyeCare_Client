import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../App.css";

function DoctorSignUp() {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  const [gender, setGender] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [doctorLicense, setDoctorLicense] = useState("");
  const [timeSlot, setTimeSlot] = useState("");
  const [experience, setExperience] = useState("");
  const [signedUp, setSignedUp] = useState(false); // State to track sign-up status
  const [payment, setPayment] = useState();

  const navigate = useNavigate();

  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      doctorName: fullName,
      doctorEmail: email,
      doctorPhone: phoneNumber,
      doctorDistrict: district,
      doctorArea: area,
      doctorRoadNum: roadNumber,
      doctorGender: gender,
      doctorPassword: password,
      doctorLicense: doctorLicense,
      timeSlot: timeSlot,
      experience: experience,
    };

    const result = await fetch("http://localhost:5000/auth/doctorsignup", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(result);
    if (result.status === 200) {
      navigate("/otheruserssignin");
      setSignedUp(true); // Set signedUp to true after successful sign-up
    } else if (result.status === 409) {
      toast.error("User already exists!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Doctor Sign Up
              </Card.Title>
              {signedUp ? (
                <Alert variant="info" className="text-center">
                  <Alert.Heading>Verification Pending</Alert.Heading>
                  <p>
                    Thank you for signing up! Your account verification is
                    pending. You will be notified once your account is verified.
                  </p>
                </Alert>
              ) : (
                <Form onSubmit={collectData}>
                  <Form.Group className="mb-3" controlId="formFullName">
                    <Form.Label>Full Name</Form.Label>
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

                  <Form.Group className="mb-3" controlId="formGender">
                    <Form.Label>Gender</Form.Label>
                    <Form.Control
                      as="select"
                      value={gender}
                      onChange={(e) => {
                        setGender(e.target.value);
                      }}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Form.Control>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formDoctorLicense">
                    <Form.Label>Doctor License</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Doctor License"
                      value={doctorLicense}
                      onChange={(e) => setDoctorLicense(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTimeSlot">
                    <Form.Label>Time Slot</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Time Slot"
                      value={timeSlot}
                      onChange={(e) => setTimeSlot(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formTimeSlot">
                    <Form.Label>Remuneration</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Remuneration"
                      value={payment}
                      onChange={(e) => setPayment(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formExperience">
                    <Form.Label>Experience</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Experience"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Password</Form.Label>
                    <div className="password-input-container">
                      <Form.Control
                        type={showPassword ? "text" : "password"}
                        placeholder="Your Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="password-input"
                      />
                      <FontAwesomeIcon
                        icon={showPassword ? faEye : faEyeSlash}
                        className="password-toggle-icon"
                        onClick={() => setShowPassword(!showPassword)}
                      />
                    </div>
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
              )}
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
      <ToastContainer />
    </Container>
  );
}

export default DoctorSignUp;
