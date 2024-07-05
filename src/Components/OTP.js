import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../App.css";

function OTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus next input box
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    console.log("OTP entered: ", enteredOtp);

    const result = await fetch("http://localhost:5000/auth/verifyotp", {
      method: "POST",
      body: JSON.stringify({ otp: enteredOtp, email: email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    console.log(result);
    if (result.status === 200) {
      navigate("/resetpassword", { state: { email: email } });
    } else {
      console.log("OTP Verification Failed");
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
              <Card.Title className="text-center mb-4">Enter OTP</Card.Title>
              <Form onSubmit={handleSubmit}>
                <div className="d-flex justify-content-center mb-4">
                  {otp.map((data, index) => (
                    <Form.Control
                      type="text"
                      name="otp"
                      maxLength="1"
                      key={index}
                      value={data}
                      onChange={(e) => handleChange(e.target, index)}
                      onFocus={(e) => e.target.select()}
                      className="otpInput mx-1"
                      style={{ width: "40px", textAlign: "center" }}
                    />
                  ))}
                </div>
                <Button variant="primary" type="submit" className="w-100">
                  Verify OTP
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default OTP;
