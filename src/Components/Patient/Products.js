import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Card from "./../Others/Card";
import "./Products.css";

const Products = () => {
  const userId = JSON.parse(localStorage.getItem("user")).PatientId;
  console.log(userId);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Dummy data for products
    const dummyProducts = [
      {
        PRODUCT_ID: "1",
        PRODUCT_NAME: "Product 1",
        PRODUCT_DESCRIPTION: "Description for Product 1",
        PRODUCT_PRICE: "10.00",
        PRODUCT_IMAGE: "https://via.placeholder.com/150",
        SHOP_ID: "1",
        SHOP_NAME: "Shop A",
        QUANTITY: 5,
      },
      {
        PRODUCT_ID: "2",
        PRODUCT_NAME: "Product 2",
        PRODUCT_DESCRIPTION: "Description for Product 2",
        PRODUCT_PRICE: "20.00",
        PRODUCT_IMAGE: "https://via.placeholder.com/150",
        SHOP_ID: "2",
        SHOP_NAME: "Shop B",
        QUANTITY: 3,
      },
    ];

    setProducts(dummyProducts);
  }, []);

  const handleSearch = (e) => {
    const search = e.target.value.toLowerCase();
    console.log("Search:", search);

    // Filter dummy products based on search input
    const filteredProducts = products.filter((product) =>
      product.PRODUCT_NAME.toLowerCase().includes(search)
    );

    setProducts(filteredProducts);
  };

  return (
    <div className="products-container">
      <div className="search-bar">
        <StyledWrapper>
          <form className="form">
            <label htmlFor="search">
              <input
                className="input"
                type="text"
                required
                placeholder="Search here"
                id="search"
                onChange={handleSearch}
              />
              <div className="fancy-bg" />
              <div className="search">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="r-14j79pv r-4qtqp9 r-yyyyoo r-1xvli5t r-dnmrzs r-4wgw6l r-f727ji r-bnwqim r-1plcrui r-lrvibr"
                >
                  <g>
                    <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z" />
                  </g>
                </svg>
              </div>
              <button className="close-btn" type="reset">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </label>
          </form>
        </StyledWrapper>
      </div>
      <div className="products">
        {products.length > 0 &&
          products.map((product, index) => {
            console.log("number of products: ", products);
            return (
              <Card
                className="product-card"
                key={index}
                title={product.PRODUCT_NAME}
                description={product.PRODUCT_DESCRIPTION}
                price={product.PRODUCT_PRICE}
                shopId={product.SHOP_ID}
                userId={userId}
                productId={product.PRODUCT_ID}
                quantity={product.QUANTITY}
                image_url={product.PRODUCT_IMAGE}
                shopName={product.SHOP_NAME}
              />
            );
          })}
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  /* this is a recreation of twitter search in css */
  .form {
    --input-text-color: #000;
    --input-bg-color: #e1e5ea;
    --focus-input-bg-color: transparent;
    --text-color: #000;
    --active-color: #1b9bee;
    --width-of-input: 800px;
    --inline-padding-of-input: 1.2em;
    --gap: 0.9rem;
  }
  /* form style */
  .form {
    font-size: 0.9rem;
    display: flex;
    gap: 0.5rem;
    align-items: center;
    width: var(--width-of-input);
    position: relative;
    isolation: isolate;
  }
  /* a fancy bg for showing background and border when focus. */
  .fancy-bg {
    position: absolute;
    width: 100%;
    inset: 0;
    background: var(--input-bg-color);
    border-radius: 30px;
    height: 100%;
    z-index: -1;
    pointer-events: none;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 4px;
  }
  /* label styling */
  label {
    width: 100%;
    padding: 0.8em;
    height: 40px;
    padding-inline: var(--inline-padding-of-input);
    display: flex;
    align-items: center;
  }

  .search,
  .close-btn {
    position: absolute;
  }
  /* styling search-icon */
  .search {
    fill: var(--text-color);
    left: var(--inline-padding-of-input);
  }
  /* svg -- size */
  svg {
    width: 17px;
    display: block;
  }
  /* styling of close button */
  .close-btn {
    border: none;
    right: var(--inline-padding-of-input);
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    padding: 0.1em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: var(--active-color);
    opacity: 0;
    visibility: hidden;
  }
  /* styling of input */
  .input {
    color: var(--input-text-color);
    width: 100%;
    margin-inline: min(2em, calc(var(--inline-padding-of-input) + var(--gap)));
    background: none;
    border: none;
  }

  .input:focus {
    outline: none;
  }

  .input::placeholder {
    color: var(--text-color);
  }
  /* input background change in focus */
  .input:focus ~ .fancy-bg {
    border: 1px solid var(--active-color);
    background: var(--focus-input-bg-color);
  }
  /* search icon color change in focus */
  .input:focus ~ .search {
    fill: var(--active-color);
  }
  /* showing close button when typing */
  .input:valid ~ .close-btn {
    opacity: 1;
    visibility: visible;
  }
  /* this is for the default background in input,when selecting autofill options -- you can remove this code if you do not want to override the browser style.  */
  input:-webkit-autofill,
  input:-webkit-autofill:hover,
  input:-webkit-autofill:focus,
  input:-webkit-autofill:active {
    -webkit-transition: "color 9999s ease-out, background-color 9999s ease-out";
    -webkit-transition-delay: 9999s;
  }
`;

export default Products;
