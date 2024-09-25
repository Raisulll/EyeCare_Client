import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import styled from "styled-components";
import image from "../../Assets/images/SignUp.svg"

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
      <ToastContainer />
      <div className="signupImage">
        <img src={image} alt="Sign Up" />
      </div>
      <form className="signupForm" onSubmit={collectData}>
        <h1>Sign Up as Doctor</h1>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="fullName"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
            <label htmlFor="fullName" className="label">
              Full Name
            </label>
            <div className="underline" />
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
          <div className="input-container">
            <input
              type="text"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              required
            />
            <label htmlFor="phoneNumber" className="label">
              Phone Number
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="district"
              value={district}
              onChange={(e) => setDistrict(e.target.value)}
              required
            />
            <label htmlFor="district" className="label">
              District
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="area"
              value={area}
              onChange={(e) => setArea(e.target.value)}
              required
            />
            <label htmlFor="area" className="label">
              Area
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="roadNumber"
              value={roadNumber}
              onChange={(e) => setRoadNumber(e.target.value)}
              required
            />
            <label htmlFor="roadNumber" className="label">
              Road Number
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <select
              id="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              required
            >
              <option value="" hidden></option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <label htmlFor="gender" className="label">
              Gender
            </label>
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="timeSlot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              required
            />
            <label htmlFor="timeslot" className="label">
              Time Slot
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="doctorLicense"
              value={doctorLicense}
              onChange={(e) => setDoctorLicense(e.target.value)}
              required
            />
            <label htmlFor="doctorLicense" className="label">
              Doctor License
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="experience"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              required
            />
            <label htmlFor="experience" className="label">
              Experience
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="payment"
              value={payment}
              onChange={(e) => setPayment(e.target.value)}
              required
            />
            <label htmlFor="payment" className="label">
              Remuneration
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password" className="label">
              Password
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <button>
            Sign up
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


export default DoctorSignUp;
