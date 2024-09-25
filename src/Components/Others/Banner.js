import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import "./Banner.css";

const Banner = () => {
  const navigate = useNavigate();
  const goto = () => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      navigate("/products");
    } else {
      navigate("/signin");
    }
  }
  return (
    <div className="banner">
      <div className="banner-desc">
        <h1 className="text-thin">
          <strong>See</strong>&nbsp;everything with&nbsp;
          <strong>Clarity</strong>
        </h1>
        <p>
          Buying eyewear should leave you happy and good-looking, with money in
          your pocket. Glasses, sunglasses, and contacts—we’ve got your eyes
          covered.
        </p>
        <br />
        <StyledWrapper>
          <button onClick={goto}>
            Get Started
            <div className="arrow-wrapper">
              <div className="arrow" />
            </div>
          </button>
        </StyledWrapper>
      </div>
      <div className="banner-img">
        <img src="/Images/banner-girl.png" alt="Banner" />
      </div>
    </div>
  );
};


const StyledWrapper = styled.div`
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

export default Banner;
