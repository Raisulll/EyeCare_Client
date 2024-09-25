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

  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      userType: userType,
      doctorEmail: email,
      doctorPassword: password,
    };

    if (userType === "doctor") {
      delete data.userType;
      console.log("Doctor Data: ", data);
      try {
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
          navigate("/doctorprofile", { state: { userInfo } });
          console.log("Doctor Sign In Successful");
        } else if (result.status === 401) {
          toast.error("Invalid Password!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (result.status === 404) {
          toast.error("User not exists!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else {
          toast.error("Server Issue!", {
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
      } catch (error) {
        console.log(error);
      }
    } else if (userType === "shopOwner") {
      const shopData = {
        shopMail: email,
        shopPassword: password,
      };
      console.log("Shop Owner Data: ", shopData);
      const result = await fetch("http://localhost:5000/auth/shopsignin", {
        method: "POST",
        body: JSON.stringify(shopData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
        navigate("/shopprofile", { state: { userInfo } });
        console.log("Shop Owner Sign In Successful");
      } else if (result.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (result.status === 404) {
        toast.error("User not exists!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Server Issue!", {
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
    } else if (userType === "eyeHospitalManager") {
      const hospitalData = {
        hospitalMail: email,
        hospitalPassword: password,
      };
      console.log("Hospital Manager Data: ", hospitalData);
      const result = await fetch("http://localhost:5000/auth/hospitalsignin", {
        method: "POST",
        body: JSON.stringify(hospitalData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
        navigate("/hospitalProfile", { state: { userInfo } });
        console.log("Hospital Sign In Successful");
      } else if (result.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (result.status === 404) {
        toast.error("User not exists!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Server Issue!", {
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
    } else {
      const deliveryData = {
        deliveryMail: email,
        deliveryPassword: password,
      };
      console.log("Delivery Agency Data: ", deliveryData);
      const result = await fetch("http://localhost:5000/auth/deliverysignin", {
        method: "POST",
        body: JSON.stringify(deliveryData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
        navigate("/deliveryprofile", { state: { userInfo } });
        console.log("Delivery Agency Sign In Successful");
      } else if (result.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (result.status === 404) {
        toast.error("User not exists!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        toast.error("Server Issue!", {
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
    }
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
              required
            >
              <option value="" hidden></option>
              <option value="doctor">Doctor</option>
              <option value="shopOwner">Shop Owner</option>
              <option value="eyeHospitalManager">Eye Hospital Manager</option>
              <option value="deliveryAgency">Delivey Agency</option>
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
