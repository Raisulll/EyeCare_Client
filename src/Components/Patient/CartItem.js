import React, { useState } from "react";
import "./CartItem.css";

const CartItem = ({
  shopId,
  shopName,
  productImage,
  productName,
  productPrice,
  initialQuantity,
  finalQuantity,
  productId,
  onQuantityChange,
}) => {
  console.log(initialQuantity, finalQuantity);
  const [quantity, setQuantity] = useState(initialQuantity);

  const increaseQuantity = async () => {
    if (finalQuantity > quantity) {
      const newQuantity = quantity + 1;
      const data = {
        productId: productId,
        quantity: newQuantity,
        patientId: JSON.parse(localStorage.getItem("user")).PatientId,
        shopId: shopId
      };
      console.log(data.patientId, data.productId, data.quantity);
      try {
        const result = await fetch(
          "http://localhost:5000/sets/updatecartquantity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const response = await result.json();
        console.log(response);
        setQuantity(newQuantity);
        onQuantityChange(productId, newQuantity);
      } catch (error) {
        console.error("Error adding product count to cart:", error);
      }
    }
  };

  const onRemove = async () => {
    const data = {
      productId: productId,
      patientId: JSON.parse(localStorage.getItem("user")).PatientId,
      shopId:shopId
    };
    console.log("data", data.patientId, data.productId, data.shopId);
    try {
      const result = await fetch("http://localhost:5000/sets/removefromcart", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await result.json();
      console.log(response);
      onQuantityChange(productId, 0);
    } catch (error) {
      console.error("Error removing product from cart:", error);
    }
  };

  const decreaseQuantity = async () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      const data = {
        productId: productId,
        quantity: newQuantity,
        patientId: JSON.parse(localStorage.getItem("user")).PatientId,
      };
      console.log(data.patientId, data.productId, data.quantity);
      try {
        const result = await fetch(
          "http://localhost:5000/sets/updatecartquantity",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const response = await result.json();
        console.log(response);
        setQuantity(newQuantity);
        onQuantityChange(productId, newQuantity); // Notify parent of the change
      } catch (error) {
        console.error("Error adding product count to cart:", error);
      }
    }
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <img src={productImage} alt={productName} />
      </div>
      <div className="cart-item-details">
        <h3>{productName}</h3>
        <span>{shopName}</span>
        <p>${productPrice.toFixed(2)}</p>
      </div>
      <div className="cart-item-quantity">
        <button onClick={increaseQuantity}>+</button>
        <span>{quantity}</span>
        {quantity > 1 ? (
          <button onClick={decreaseQuantity}>-</button>
        ) : (
          <span class="material-symbols-outlined cart-item-remove" onClick={onRemove}>delete</span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
