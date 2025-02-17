import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Nav.css";

function NavigationBar() {
  const [user, setUser] = useState({
    userType: "patient",
    patientImage: "https://placehold.co/600x400",
  });
  const [dropdownActive, setDropdownActive] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate("/signin");
  };

  const userprofile = () => {
    const userType = user.userType;
    if (userType === "doctor") {
      navigate("/doctorprofile");
    } else if (userType === "hospital") {
      navigate("/hospitalprofile");
    } else if (userType === "shop") {
      navigate("/shopprofile");
    } else if (userType === "delivery") {
      navigate("/deliveryprofile");
    } else {
      navigate("/profile");
    }
  };

  const toggleDropdown = () => {
    setDropdownActive(!dropdownActive);
  };

  return (
    <header className="navHeader">
      <div className="navLogoname">
        <img
          className="navLogo"
          src={
            "https://res.cloudinary.com/dnn7v3kkw/image/upload/v1727612629/EyeCare/wenuofr1cpp8qwuoo8m3.png"
          }
          alt="Logo"
        />
      </div>
      <div className="navLinks">
        {user.userType === "patient" && (
          <li>
            <Link to="/home">Home</Link>
          </li>
        )}
        {user.userType === "patient" && (
          <li>
            <Link to="/products">Products</Link>
          </li>
        )}
        {user.userType === "patient" && (
          <li>
            <Link to="alldoctors">Doctors</Link>
          </li>
        )}
        {user.userType === "admin" && (
          <li>
            <Link to="/addproducttosupply">Add Product</Link>
          </li>
        )}
        {user.userType === "shop" && (
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        )}
        {user.userType === "delivery" && (
          <li>
            <Link to="/deliveryorders">Orders</Link>
          </li>
        )}
        {user.userType === "patient" && (
          <li>
            <Link to="/patientorders">Orders</Link>
          </li>
        )}
        {user.userType === "hospital" && (
          <li>
            <Link to="/surgerySchedule">Surgery Schedule</Link>
          </li>
        )}
      </div>
      {user && (
        <div className="navIcons">
          {user.userType === "patient" && (
            <li>
              <Link to="/cart">
                <i className="bi bi-bag navIcon"></i>
              </Link>
            </li>
          )}
          <li className={`dropdown ${dropdownActive ? "active" : ""}`}>
            <Link to="#" className="navProfileIcon" onClick={toggleDropdown}>
              <img
                src={user.patientImage}
                alt="Profile"
                className="navProfileImage"
              />
            </Link>
            <div className="dropdownContent">
              <button className="navBtn1" onClick={userprofile}>
                View Profile
              </button>
              <StyledWrapper>
                <button className="noselect" onClick={handleLogout}>
                  <span className="text">Logout</span>
                  <span className="icon">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 512 512"
                    >
                      <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9l0-62.1-128 0c-17.7 0-32-14.3-32-32l0-64c0-17.7 14.3-32 32-32l128 0 0-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96L96 96c-17.7 0-32 14.3-32 32l0 256c0 17.7 14.3 32 32 32l64 0c17.7 0 32 14.3 32 32s-14.3 32-32 32l-64 0c-53 0-96-43-96-96L0 128C0 75 43 32 96 32l64 0c17.7 0 32 14.3 32 32z" />
                    </svg>
                  </span>
                </button>
              </StyledWrapper>
            </div>
          </li>
        </div>
      )}
      {!user && (
        <ul className="navButtons">
          <li>
            <Link to="/signin">SignIn</Link>
          </li>
          <li>
            <Link to="/signup">SignUp</Link>
          </li>
        </ul>
      )}
    </header>
  );
}

const StyledWrapper = styled.div`
  button {
    width: 150px;
    height: 50px;
    cursor: pointer;
    display: flex;
    align-items: center;
    background: red;
    border: none;
    border-radius: 5px;
    box-shadow: 1px 1px 3px rgba(0, 0, 0, 0.15);
    background: #e62222;
  }

  button,
  button span {
    transition: 200ms;
  }

  button .text {
    transform: translateX(35px);
    color: white;
    font-weight: bold;
  }

  button .icon {
    position: absolute;
    border-left: 1px solid #c41b1b;
    transform: translateX(110px);
    height: 40px;
    width: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  button svg {
    width: 15px;
    fill: #eee;
  }

  button:hover {
    background: #ff3636;
  }

  button:hover .text {
    color: transparent;
  }

  button:hover .icon {
    width: 150px;
    border-left: none;
    transform: translateX(0);
  }

  button:focus {
    outline: none;
  }

  button:active .icon svg {
    transform: scale(0.8);
  }
`;

export default NavigationBar;
