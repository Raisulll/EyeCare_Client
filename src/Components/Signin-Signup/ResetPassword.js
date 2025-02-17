import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

function ResetPassword() {
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError("Passwords do not match!");
      return;
    }

    const data = {
      email: email,
      password: password,
    };
    navigate("/signin");
  };

  return (
    // <Container
    //   className="d-flex justify-content-center align-items-center containerColor"
    //   style={{ height: "100vh" }}
    // >
    //   <Row className="w-100 justify-content-center">
    //     <Col md={8} lg={6}>
    //       <Card className="cardcolor">
    //         <Card.Body>
    //           <Card.Title className="text-center mb-4">
    //             Reset Password
    //           </Card.Title>
    //           <Form onSubmit={handleSubmit}>
    //             <Form.Group className="mb-3" controlId="formBasicPassword">
    //               <Form.Label>Password</Form.Label>
    //               <div className="password-input-container">
    //                 <Form.Control
    //                   type={showPassword ? "text" : "password"}
    //                   placeholder="Your Password"
    //                   value={password}
    //                   onChange={(e) => setPassword(e.target.value)}
    //                   className="password-input"
    //                 />
    //                 <FontAwesomeIcon
    //                   icon={showPassword ? faEye : faEyeSlash}
    //                   className="password-toggle-icon"
    //                   onClick={() => setShowPassword(!showPassword)}
    //                 />
    //               </div>
    //             </Form.Group>
    //             <Form.Group className="mb-3" controlId="formRepeatPassword">
    //               <Form.Label>Repeat Password</Form.Label>
    //               <div className="password-input-container">
    //                 <Form.Control
    //                   type={showRepeatPassword ? "text" : "password"}
    //                   placeholder="Repeat new password"
    //                   value={repeatPassword}
    //                   onChange={(e) => setRepeatPassword(e.target.value)}
    //                   className="password-input"
    //                   required
    //                 />
    //                 <FontAwesomeIcon
    //                   icon={showRepeatPassword ? faEye : faEyeSlash}
    //                   className="password-toggle-icon"
    //                   onClick={() => setShowRepeatPassword(!showRepeatPassword)}
    //                 />
    //               </div>
    //             </Form.Group>
    //             {error && <p className="text-danger">{error}</p>}
    //             <Button variant="primary" type="submit" className="w-100">
    //               Submit
    //             </Button>
    //           </Form>
    //         </Card.Body>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
    <div className="mainDiv">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <form className="mainForm" onSubmit={handleSubmit}>
        <h1>Reset your Password</h1>
        <StyledWrapper>
          <div className="input-container password-wrapper">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={({ cursor: "pointer" }, { color: "#000" }, { top: "7px" })}
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container password-wrapper">
            <input
              type={showRepeatPassword ? "text" : "password"}
              id="repeatPassword"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
            />
            <FontAwesomeIcon
              icon={showRepeatPassword ? faEye : faEyeSlash}
              className="password-toggle-icon"
              onClick={() => setShowRepeatPassword(!showRepeatPassword)}
              style={({ cursor: "pointer" }, { color: "#000" }, { top: "7px" })}
            />
            <label htmlFor="password" className="label">
              Repeat Password
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <button>
            Reset
            <div className="arrow-wrapper">
              <div className="arrow" />
            </div>
          </button>
        </StyledWrapper>
      </form>
    </div>
  );
}

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 15px auto;
    width: 35vw;
  }

  .input-container input[type="email"],
  .input-container input[type="password"],
  .input-container input[type="text"] {
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #000;
    padding: 5px 0;
    background-color: transparent;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input:focus ~ .label,
  .input-container input:valid ~ .label {
    top: -20px;
    font-size: 16px;
    color: #263238;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #263238;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input:focus ~ .underline,
  .input-container input:valid ~ .underline {
    transform: scaleX(1);
  }

  .password-wrapper {
    display: flex;
    align-items: center;
    gap: 10px; /* Space between the input field and the icon */
  }

  .password-toggle-icon {
    cursor: pointer;
    font-size: 20px;
    color: #000;
  }

  button {
    --primary-color: #645bff;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
  }

  button .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
  }

  button .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }

  button:hover {
    background-color: var(--hover-color);
  }

  button:hover .arrow {
    background: var(--secondary-color);
  }

  button:hover .arrow:before {
    right: 0;
  }
`;

export default ResetPassword;
