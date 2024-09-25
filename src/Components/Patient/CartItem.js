import React, { useState } from "react";
import { Button, Card, Col, Row } from "react-bootstrap";

const CartItem = ({
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
    };
    console.log("data",data.patientId, data.productId);
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
    <Card className="mb-3">
      <Card.Body>
        <Row>
          <Col md={6}>
            <Card.Title>{productName}</Card.Title>
          </Col>
          <Col md={2}>
            <Card.Text>${productPrice.toFixed(2)}</Card.Text>
          </Col>
          <Col md={2}>
            <div className="quantity-control">
              <Button variant="outline-secondary" onClick={decreaseQuantity}>
                -
              </Button>
              <span className="mx-2">{quantity}</span>
              <Button variant="outline-secondary" onClick={increaseQuantity}>
                +
              </Button>
            </div>
          </Col>
          <Col md={2}>
            <Card.Text>
              Total: ${(productPrice * quantity).toFixed(2)}
            </Card.Text>
          </Col>
          <Col md={2}>
            <Button
              variant="outline-danger"
              onClick={onRemove}
              style={{ float: "right" }}
            >
              Remove
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default CartItem;
