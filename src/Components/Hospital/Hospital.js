import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";

const HospitalProfile = () => {
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/600x400"
  );
  const [fullName, setFullName] = useState("Sample Hospital");
  const [email, setEmail] = useState("hospital@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [district, setDistrict] = useState("District A");
  const [area, setArea] = useState("Area B");
  const [roadNumber, setRoadNumber] = useState("123");

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        console.log("Image uploaded successfully:", base64String);
        toast.success("Image Upload Successful!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const updateHospital = () => {
    if (phone.length !== 10) {
      toast.error("Invalid Phone Number!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const data = {
      hospitalName: fullName,
      hospitalPhone: phone,
      hospitalDistrict: district,
      hospitalArea: area,
      hospitalRoadnumber: roadNumber,
      hospitalEmail: email,
    };

    console.log("Hospital data updated successfully:", data);
    toast.success("Data Updated Successfully!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="firstdiv">
      <ToastContainer />
      <div className="second">
        <div onClick={handleImageClick}>
          <img className="profile-image" src={imagePreview} alt="profile" />
          <input
            className="profile-image-input"
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="vitorer-div">
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
              <input type="email" id="email" value={email} readOnly required />
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
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
        </div>
        <div className="vitorer-div">
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
        </div>
        <div className="vitorer-div last-div">
          <StyledWrapper>
            <button onClick={updateHospital}>
              Update
              <div className="arrow-wrapper">
                <div className="arrow" />
              </div>
            </button>
          </StyledWrapper>
        </div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 15px auto;
    width: 20vw;
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
  .input-container input[readonly] ~ .label,
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

export default HospitalProfile;
