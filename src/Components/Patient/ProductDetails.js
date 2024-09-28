import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const { title, description, price, image_url,shopId,userId,productId, quantity,shopName } =
    location.state || {};

  const addToCart = async () => {
    console.log("Add to cart Clicked");
    const data = {
      userId: userId,
      productId: productId,
      shopId: shopId,
      cartQuantity: 1
    };

    try {
      const result = await fetch("http://localhost:5000/sets/addtocart", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (result.status === 200) {
        console.log("Product added to cart");
      } else {
        console.error("Failed to add product to cart");
      }
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  }

  return (
    <div className="div-one">
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
      <div className="container">
        <div className="div-two">
          <img src={image_url} alt={title} />
        </div>
        <div className="div-three">
          <h1>{title}</h1>
          <p>{description}</p>
          <p><b>Shop:</b>{shopName}</p>
          <p>
            <b>Price:</b> ${price}
          </p>
          <p>
            <b>Quantity:</b> {quantity}
          </p>
          <div className="btn">
            <StyledWrapper>
              <button onClick={addToCart}>
                Add to Cart
                <div className="arrow-wrapper">
                  <div className="arrow" />
                </div>
              </button>
            </StyledWrapper>
          </div>
        </div>
      </div>
    </div>
  );
}

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

export default ProductDetails;
