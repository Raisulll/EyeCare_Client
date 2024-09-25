import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./OTP.css"; // Add custom styles here
import "../../App.css";

function OTP() {
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const navigate = useNavigate();
  const location = useLocation();
  const { email } = location.state;

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return;
    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");

    const result = await fetch("http://localhost:5000/auth/verifyotp", {
      method: "POST",
      body: JSON.stringify({ otp: enteredOtp, email }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      navigate("/resetpassword", { state: { email } });
    } else {
      console.log("OTP Verification Failed");
    }
  };

  return (
    <>
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
      <MainContainer>
        <FormContainer>
          <h1>Enter OTP</h1>
          <StyledForm onSubmit={handleSubmit}>
            <OtpWrapper>
              {otp.map((data, index) => (
                <OtpInput
                  type="text"
                  maxLength="1"
                  key={index}
                  value={data}
                  onChange={(e) => handleChange(e.target, index)}
                  onFocus={(e) => e.target.select()}
                />
              ))}
            </OtpWrapper>
            <StyledButton type="submit">Verify OTP</StyledButton>
          </StyledForm>
        </FormContainer>
      </MainContainer>
    </>
  );
}

const MainContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f0f0;
`;

const FormContainer = styled.div`
  background-color: #ffffff;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  text-align: center;
  width: 100%;
  max-width: 400px;
`;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const OtpWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
`;

const OtpInput = styled.input`
  width: 40px;
  height: 40px;
  margin: 0 5px;
  font-size: 20px;
  text-align: center;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
  transition: border-color 0.2s;

  &:focus {
    border-color: #645bff;
  }
`;

const StyledButton = styled.button`
  background-color: #645bff;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #4a47d6;
  }
`;

export default OTP;
