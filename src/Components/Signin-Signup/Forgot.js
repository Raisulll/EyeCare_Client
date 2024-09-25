import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Forgot.css";
import styled from "styled-components";

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
    <div className="mainDiv">
      <ul class="circles">
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
        <h1>Rocover your Account</h1>
        <StyledWrapper>
          <div className="input-container">
            <select
              id="gender"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
              required
            >
              <option value="" hidden></option>
              <option value="patient">Patient</option>
              <option value="doctor">Doctor</option>
              <option value="shopOwner">Shop Owner</option>
              <option value="hospitalManager">Hospital Manager</option>
            </select>
            <label htmlFor="userType" className="label">
              Select User Type
            </label>
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="Email" className="label">
              Enter your Email
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <button>
            Continue
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
  .input-container select {
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
  .input-container input:valid ~ .label,
  .input-container select:focus ~ .label,
  .input-container select:valid ~ .label {
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

export default ForgotPassword;
