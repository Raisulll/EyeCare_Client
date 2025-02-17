import React, { useEffect, useState } from "react";
import styled from "styled-components";
import CartItem from "./CartItem";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./Cart.css";

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAgencies, setDeliveryAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);

  // Dummy data for cart items
  const dummyCartItems = [
    {
      PRODUCT_ID: 1,
      SHOP_ID: 101,
      SHOP_NAME: "Health Store",
      PRODUCT_IMAGE: "https://via.placeholder.com/150",
      PRODUCT_NAME: "Vitamin C Tablets",
      PRODUCT_PRICE: 15.99,
      CART_QUANTITY: 2,
      QUANTITY: 10,
    },
    {
      PRODUCT_ID: 2,
      SHOP_ID: 102,
      SHOP_NAME: "Wellness Center",
      PRODUCT_IMAGE: "https://via.placeholder.com/150",
      PRODUCT_NAME: "Protein Powder",
      PRODUCT_PRICE: 49.99,
      CART_QUANTITY: 1,
      QUANTITY: 5,
    },
  ];

  // Dummy data for delivery agencies
  const dummyDeliveryAgencies = [
    {
      DELIVERY_AGENCY_ID: 1,
      DELIVERY_AGENCY_NAME: "Fast Delivery Co.",
      DELIVERY_AGENCY_STATUS: "Active",
      DELIVERY_CHARGE: 5.99,
    },
    {
      DELIVERY_AGENCY_ID: 2,
      DELIVERY_AGENCY_NAME: "Quick Ship Inc.",
      DELIVERY_AGENCY_STATUS: "Active",
      DELIVERY_CHARGE: 7.99,
    },
  ];

  useEffect(() => {
    // Simulate fetching cart items and delivery agencies
    setCartItems(dummyCartItems);
    setDeliveryAgencies(dummyDeliveryAgencies);
    if (dummyDeliveryAgencies.length > 0) {
      setSelectedAgency(dummyDeliveryAgencies[0]);
    }
  }, []);

  useEffect(() => {
    updateTotalAmount(selectedAgency);
  }, [cartItems, selectedAgency]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.PRODUCT_ID !== productId)
      );
    } else {
      setCartItems((prevItems) =>
        prevItems.map((item) =>
          item.PRODUCT_ID === productId
            ? { ...item, CART_QUANTITY: newQuantity }
            : item
        )
      );
    }
  };

  const handleDeliveryChange = (e) => {
    const selectedId = parseInt(e.target.value);
    const selectedAgency = deliveryAgencies.find(
      (agency) => agency.DELIVERY_AGENCY_ID === selectedId
    );
    setSelectedAgency(selectedAgency);
  };

  const updateTotalAmount = (agency) => {
    const totalItemsAmount = cartItems.reduce(
      (total, item) => total + item.PRODUCT_PRICE * item.CART_QUANTITY,
      0
    );
    const deliveryCharge = agency ? agency.DELIVERY_CHARGE : 0;
    setTotalAmount(totalItemsAmount + deliveryCharge);
  };

  const checkout = () => {
    if (cartItems.length === 0) {
      toast.error("Your cart is empty. Please add items to proceed.", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: true,
      });
      return;
    }
    toast.success("Order placed successfully!", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
    });
  };

  return (
    <div className="cartContainer">
      <ToastContainer />
      <div className="secondContainer">
        <div className="main-cart-items">
          <h2>Cart</h2>
          <div className="cart-items">
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item.PRODUCT_ID}
                  shopId={item.SHOP_ID}
                  shopName={item.SHOP_NAME}
                  productImage={item.PRODUCT_IMAGE}
                  productName={item.PRODUCT_NAME}
                  productPrice={item.PRODUCT_PRICE}
                  initialQuantity={item.CART_QUANTITY}
                  finalQuantity={item.QUANTITY}
                  productId={item.PRODUCT_ID}
                  onQuantityChange={updateQuantity}
                />
              ))
            ) : (
              <p>Your cart is empty.</p>
            )}
          </div>
        </div>
        <div className="delivery-total">
          <div className="delivey-options">
            <h2>Select Delivery Agency</h2>
            <StyledWrapper>
              <div className="input-container">
                <select
                  value={
                    selectedAgency ? selectedAgency.DELIVERY_AGENCY_ID : ""
                  }
                  onChange={handleDeliveryChange}
                  required
                >
                  <option value="" hidden>
                    Select Delivery Agency
                  </option>
                  {deliveryAgencies.map((agency) => (
                    <option
                      key={agency.DELIVERY_AGENCY_ID}
                      value={agency.DELIVERY_AGENCY_ID}
                    >
                      {`${agency.DELIVERY_AGENCY_NAME} - ${agency.DELIVERY_AGENCY_STATUS} (Charge: $${agency.DELIVERY_CHARGE})`}
                    </option>
                  ))}
                </select>
              </div>
            </StyledWrapper>
          </div>
          <div className="total">
            <p>
              <b>Items Total</b>: $
              {cartItems
                .reduce(
                  (total, item) =>
                    total + item.PRODUCT_PRICE * item.CART_QUANTITY,
                  0
                )
                .toFixed(2)}
            </p>
            <p>
              <b>Delivery Charge</b>: $
              {selectedAgency
                ? selectedAgency.DELIVERY_CHARGE.toFixed(2)
                : "0.00"}
            </p>
            <p>
              <strong>Gross Total: ${totalAmount.toFixed(2)}</strong>
            </p>
          </div>
        </div>
        <StyledWrapper>
          <button onClick={checkout}>
            Checkout
            <div className="arrow-wrapper">
              <div className="arrow" />
            </div>
          </button>
        </StyledWrapper>
      </div>
    </div>
  );
};

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

export default Cart;
