import React, { useState, useEffect } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "./SignIn.css";
import image from "../../Assets/images/SignIn.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function OtherUserSignin() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // If a user is already logged in, redirect to home
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  }, [navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    let userInfo;

    // Create dummy user data without any validation checks
    switch (userType) {
      case "doctor":
        userInfo = {
          id: "doc-123",
          name: "Dr. John Doe",
          email,
          specialization: "Ophthalmology",
          phone: "123-456-7890",
        };
        break;
      case "shopOwner":
        userInfo = {
          id: "shop-456",
          name: "Alice Smith",
          email,
          shopName: "Alice's Eyewear",
          address: "123 Fashion Ave, New York, NY",
          phone: "987-654-3210",
        };
        break;
      case "eyeHospitalManager":
        userInfo = {
          id: "hosp-789",
          name: "Robert Brown",
          email,
          hospitalName: "VisionCare Hospital",
          address: "456 Health Blvd, Los Angeles, CA",
          phone: "555-555-5555",
        };
        break;
      case "deliveryAgency":
        userInfo = {
          id: "deliv-321",
          name: "Express Delivery Inc.",
          email,
          vehicle: "Delivery Van",
          contact: "444-444-4444",
        };
        break;
      default:
        userInfo = {
          id: "guest-000",
          name: "Guest User",
          email,
          role: "guest",
        };
        break;
    }

    // Save dummy user info in localStorage and simulate navigation
    localStorage.setItem("user", JSON.stringify(userInfo));
    window.dispatchEvent(new Event("storage"));
    toast.success("Sign In Successful", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });

    // Navigate to a profile page based on user type (or guest page if none selected)
    let path = "/";
    if (userType === "doctor") path = "/doctorprofile";
    else if (userType === "shopOwner") path = "/shopprofile";
    else if (userType === "eyeHospitalManager") path = "/hospitalProfile";
    else if (userType === "deliveryAgency") path = "/deliveryprofile";
    navigate(path, { state: { userInfo } });
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
      <form className="signinForm" onSubmit={handleSubmit}>
        <h1>Other Users Sign in</h1>
        <StyledWrapper>
          <div className="input-container">
            <select
              id="userType"
              value={userType}
              onChange={(e) => setUserType(e.target.value)}
            >
              <option value="" hidden></option>
              <option value="doctor">Doctor</option>
              <option value="shopOwner">Shop Owner</option>
              <option value="eyeHospitalManager">Eye Hospital Manager</option>
              <option value="deliveryAgency">Delivery Agency</option>
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
            />
            <FontAwesomeIcon
              icon={showPassword ? faEye : faEyeSlash}
              className="password-toggle-icon"
              onClick={() => setShowPassword(!showPassword)}
              style={{ cursor: "pointer", color: "#000", top: "7px" }}
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
          <NavLink
            to="/otheruserssignup"
            className="links signin-link sign-up-link"
          >
            Sign Up
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

  .input-container input[type="text"],
  .input-container input[type="email"],
  .input-container input[type="date"],
  .input-container input[type="password"],
  .input-container input[type="number"],
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

export default OtherUserSignin;
