import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "./../Others/Card";

const Products = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("user")).PatientId;
  console.log(userId);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(`http://localhost:5000/gets/products`);
        const data = await response.json();
        setProducts(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="products-container">
      <h2>Products</h2>
      <div className="products">
        {products.map((product) => (
          <Card
            key={product.PRODUCT_ID}  
            title={product.PRODUCT_NAME}
            description={product.PRODUCT_DESCRIPTION}
            price={product.PRODUCT_PRICE}
            shopId={product.SHOP_ID}
            userId={userId}
            productId={product.PRODUCT_ID}
            quantity={product.QUANTITY}
          />
        ))}
      </div>
    </div>
  );
};

export default Products;
