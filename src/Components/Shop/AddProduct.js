import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import "../../App.css";

const dummyProducts = [
  { PRODUCT_ID: "p1", PRODUCT_NAME: "Glasses" },
  { PRODUCT_ID: "p2", PRODUCT_NAME: "Sunglasses" },
  { PRODUCT_ID: "p3", PRODUCT_NAME: "Contact Lenses" },
];

const AddProduct = () => {
  const navigate = useNavigate();
  const shopId = JSON.parse(localStorage.getItem("user")).ShopId;
  console.log("Shop ID:", shopId);
  const [allProducts, setAllProducts] = useState([]);
  const [productId, setProductId] = useState("");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    // Instead of fetching from an API, we load dummy data.
    setAllProducts(dummyProducts);
    console.log("Loaded dummy products:", dummyProducts);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      shopId,
      productId,
      quantity,
    };
    console.log("Dummy Add Product Data:", data);
    // Simulate successful product addition and navigate to shop profile
    navigate("/shopprofile");
  };

  return (
    <div className="add-product-container">
      <h1>Add Product</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="productId">
          <Form.Label>Product</Form.Label>
          <Form.Control
            as="select"
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Select Product</option>
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
            required
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Add Product
        </Button>
      </Form>
    </div>
  );
};

export default AddProduct;
