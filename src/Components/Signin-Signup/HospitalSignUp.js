import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Signup.css";
import styled from "styled-components";
import image from "../../Assets/images/SignUp.svg";

function EyeHospitalManagerSignUp() {
  const [hospitalName, setHospitalName] = useState("");
  const [hospitalMail, setHospitalMail] = useState("");
  const [hospitalPhone, setHospitalPhone] = useState("");
  const [hospitalDistrict, setHospitalDistrict] = useState("");
  const [hospitalArea, setHospitalArea] = useState("");
  const [hospitalRoadNum, setHospitalRoadNum] = useState("");
  const [hospitalLicense, setHospitalLicense] = useState("");
  const [hospitalPassword, setHospitalPassword] = useState("");
  const [showHospitalPassword, setShowHospitalPassword] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/hospitalprofile");
    }
  }, [navigate]);

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      hospitalName: hospitalName,
      hospitalMail: hospitalMail,
      hospitalPhone: hospitalPhone,
      hospitalDistrict: hospitalDistrict,
      hospitalArea: hospitalArea,
      hospitalRoadNum: hospitalRoadNum,
      hospitalLicense: hospitalLicense,
      hospitalPassword: hospitalPassword,
    };

    try {
      const result = await fetch("http://localhost:5000/auth/hospitalsignup", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        navigate("/otheruserssignin");
      } else {
        console.error("Signup failed.");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    // <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
    //   <Row className="w-100 justify-content-center">
    //     <Col md={8} lg={6}>
    //       <Card className="cardcolor">
    //         <Card.Body>
    //           <Card.Title className="text-center mb-4">
    //             Eye Hospital Manager Sign Up
    //           </Card.Title>
    //           <Form onSubmit={collectData}>
    //             <Form.Group className="mb-3" controlId="formHospitalName">
    //               <Form.Label>Hospital Name</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 placeholder="Hospital Name"
    //                 value={hospitalName}
    //                 onChange={(e) => setHospitalName(e.target.value)}
    //               />
    //             </Form.Group>

    //             <Form.Group className="mb-3" controlId="formBasicHospitalMail">
    //               <Form.Label>HospitalMail address</Form.Label>
    //               <Form.Control
    //                 type="hospitalMail"
    //                 placeholder="test@example.com"
    //                 value={hospitalMail}
    //                 onChange={(e) => setHospitalMail(e.target.value)}
    //               />
    //             </Form.Group>
    //             <Form.Group className="mb-3" controlId="formHospitalPhone">
    //               <Form.Label>Phone Number</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 placeholder="Phone Number"
    //                 value={hospitalPhone}
    //                 onChange={(e) => setHospitalPhone(e.target.value)}
    //               />
    //             </Form.Group>

    //             <Form.Group className="mb-3" controlId="formAddress">
    //               <Form.Label>Address</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 placeholder="HospitalDistrict"
    //                 className="mb-2"
    //                 value={hospitalDistrict}
    //                 onChange={(e) => setHospitalDistrict(e.target.value)}
    //               />
    //               <Form.Control
    //                 type="text"
    //                 placeholder="HospitalArea"
    //                 className="mb-2"
    //                 value={hospitalArea}
    //                 onChange={(e) => setHospitalArea(e.target.value)}
    //               />
    //               <Form.Control
    //                 type="text"
    //                 placeholder="Road Number"
    //                 value={hospitalRoadNum}
    //                 onChange={(e) => setHospitalRoadNum(e.target.value)}
    //               />
    //             </Form.Group>

    //             <Form.Group className="mb-3" controlId="formHospitalLicense">
    //               <Form.Label>Hospital License</Form.Label>
    //               <Form.Control
    //                 type="text"
    //                 placeholder="Hospital License Number"
    //                 value={hospitalLicense}
    //                 onChange={(e) => setHospitalLicense(e.target.value)}
    //               />
    //             </Form.Group>

    //             <Form.Group
    //               className="mb-3"
    //               controlId="formBasicHospitalPassword"
    //             >
    //               <Form.Label>HospitalPassword</Form.Label>
    //               <div className="hospitalPassword-input-container">
    //                 <Form.Control
    //                   type={showHospitalPassword ? "text" : "hospitalPassword"}
    //                   placeholder="Your HospitalPassword"
    //                   value={hospitalPassword}
    //                   onChange={(e) => setHospitalPassword(e.target.value)}
    //                   className="hospitalPassword-input"
    //                 />
    //                 <FontAwesomeIcon
    //                   icon={showHospitalPassword ? faEye : faEyeSlash}
    //                   className="hospitalPassword-toggle-icon"
    //                   onClick={() =>
    //                     setShowHospitalPassword(!showHospitalPassword)
    //                   }
    //                 />
    //               </div>
    //             </Form.Group>

    //             <Button variant="primary" type="submit" className="w-100">
    //               Sign Up
    //             </Button>
    //           </Form>
    //         </Card.Body>
    //         <div className="text-center mt-3 bottommrgn">
    //           <span>Already have an account? </span>
    //           <NavLink to="/otheruserssignin" className="auth-link">
    //             Sign In
    //           </NavLink>
    //         </div>
    //         <div className="text-center mt-3">
    //           <span>
    //             Are you a Doctor, Shop Owner, or Eye Hospital Manager?{" "}
    //           </span>
    //           <NavLink to="/otheruserssignup" className="auth-link">
    //             Other User Sign Up
    //           </NavLink>
    //         </div>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
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
        <h1>Sign Up as Hospital Manager</h1>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="hospitalName"
              value={hospitalName}
              onChange={(e) => setHospitalName(e.target.value)}
              required
            />
            <label htmlFor="hospitalName" className="label">
              Hospital Name
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="email"
              id="hospitalMail"
              value={hospitalMail}
              onChange={(e) => setHospitalMail(e.target.value)}
              required
            />
            <label htmlFor="hospitalMail" className="label">
              Email
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="hospitalPhoneNumber"
              value={hospitalPhone}
              onChange={(e) => setHospitalPhone(e.target.value)}
              required
            />
            <label htmlFor="hospitalPhoneNumber" className="label">
              Phone Number
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type="text"
              id="hospitalDistrict"
              value={hospitalDistrict}
              onChange={(e) => setHospitalDistrict(e.target.value)}
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
              id="hospitalArea"
              value={hospitalArea}
              onChange={(e) => setHospitalArea(e.target.value)}
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
              value={hospitalRoadNum}
              onChange={(e) => setHospitalRoadNum(e.target.value)}
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
            <input
              type="text"
              id="shopLicense"
              value={hospitalLicense}
              onChange={(e) => setHospitalLicense(e.target.value)}
              required
            />
            <label htmlFor="shopLicense" className="label">
              Hospital License
            </label>
            <div className="underline" />
          </div>
        </StyledWrapper>
        <StyledWrapper>
          <div className="input-container">
            <input
              type={showHospitalPassword ? "text" : "password"}
              id="password"
              value={hospitalPassword}
              onChange={(e) => setHospitalPassword(e.target.value)}
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


export default EyeHospitalManagerSignUp;
