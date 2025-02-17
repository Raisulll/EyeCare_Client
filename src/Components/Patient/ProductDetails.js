import React from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import "./ProductDetails.css";

function ProductDetails() {
  const location = useLocation();
  const { title, description, price, image_url, shopName, quantity } =
    location.state || {
      title: "Sample Product",
      description: "This is a sample product description.",
      price: "99.99",
      image_url: "https://placehold.co/600x400",
      shopName: "Sample Shop",
      quantity: 10,
    };

  const addToCart = () => {
    console.log("Add to cart Clicked");
    const data = {
      userId: "sampleUserId",
      productId: "sampleProductId",
      shopId: "sampleShopId",
      cartQuantity: 1,
    };

    console.log("Product added to cart:", data);
  };

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
          <p>
            <b>Shop:</b> {shopName}
          </p>
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
