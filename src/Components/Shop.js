import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const Shop = () => {

  const navigate = useNavigate();
  useEffect(() => { 
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  });
  return (
    <div>
      <h1>Shop</h1>
    </div>
  );
};
export default Shop;
