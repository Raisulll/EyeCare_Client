import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import image from "../../Assets/images/SignIn.svg";
import "./SignIn.css";

function SignIn(props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      patientEmail: email,
      patientPassword: password,
    };
    const userInfo = await result.json();
    localStorage.setItem("user", JSON.stringify(userInfo)); //to do - image
    props.setUser(userInfo);
    window.dispatchEvent(new Event("storage"));
    navigate("/profile");
  };

  return (
    <div className="maindiv">
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
      <ToastContainer />
      <div className="signinImage">
        <img src={image} alt="Sign In" />
      </div>
      <form className="signinForm" onSubmit={collectData}>
        <h1>Sign In</h1>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email" className="label">
              Email
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
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
        <div className="eitaAlada">
          <span>Forgot your password? </span>
          <NavLink to="/forgotpassword" className="forgot-password-link links">
            Reset Password
          </NavLink>
        </div>
        <StyledWrapper>
          <button>
            Sign In
            <div className="arrow-wrapper">
              <div className="arrow" />
            </div>
          </button>
        </StyledWrapper>
        <div className="text-center mt-3">
          <span>Don't have an account? </span>
          <NavLink to="/signup" className="links signin-link sign-up-link">
            Sign Up
          </NavLink>
        </div>
        <div className="text-center mt-3">
          <NavLink
            to="/otheruserssignin"
            className="other-users-signin-link links"
          >
            Other Users Sign In
          </NavLink>
        </div>
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

export default SignIn;
