import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const product = ({ product }) => {

  const navigate = useNavigate();
  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  });
  return (
    <div className="product">
      <img src={product.image} alt={product.name} />
      <h3>{product.name}</h3>
      <p>{product.description}</p>
      <h4>${product.price}</h4>
    </div>
  );
}