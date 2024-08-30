import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../../App.css";


const AddProduct = () => { 
  const navigate = useNavigate();
  const shopId = JSON.parse(localStorage.getItem("user")).ShopId;
  console.log(shopId);
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const products = await fetch(
          `http://localhost:5000/gets/allproducts`
        );
        const temp = await products.json();
        setAllProducts(temp);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchAllProducts();
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      shopId,
      productId,
      quantity,
    };
    console.log(data);
    const result = await fetch("http://localhost:5000/sets/addproduct", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await result.json();
    console.log(response);
    navigate("/shopprofile");
  }
  return(
    <div className="add-product-container">
      <h1>Add Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product</Form.Label>
          <Form.Control as="select" onChange={(e) => setProductId(e.target.value)}>
            <option>Select Product</option>
            {allProducts.map((product) => (
              <option key={product.PRODUCT_ID} value={product.PRODUCT_ID}>
                {product.PRODUCT_NAME}
              </option>
            ))}
          </Form.Control>
        </Form.Group>
        <Form.Group controlId="quantity">
          <Form.Label>Quantity</Form.Label>
          <Form.Control
            type="number"
            placeholder="Enter Quantity"
            onChange={(e) => setQuantity(e.target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit" onClick={
          handleSubmit
        }>
          Add Product
        </Button>
      </Form>
    </div>
  );
}
export default AddProduct;