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
  const [quantity, setQuantity] = useState(initialQuantity);

  // Function to increase the quantity
  const increaseQuantity = () => {
    if (finalQuantity > quantity) {
      const newQuantity = quantity + 1;
      setQuantity(newQuantity);
      onQuantityChange(productId, newQuantity); // Notify parent of the change
    }
  };

  // Function to decrease the quantity
  const decreaseQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onQuantityChange(productId, newQuantity); // Notify parent of the change
    }
  };

  // Function to remove the item from the cart
  const onRemove = () => {
    onQuantityChange(productId, 0); // Notify parent to remove the item
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
          <span
            className="material-symbols-outlined cart-item-remove"
            onClick={onRemove}
          >
            delete
          </span>
        )}
      </div>
    </div>
  );
};

export default CartItem;
