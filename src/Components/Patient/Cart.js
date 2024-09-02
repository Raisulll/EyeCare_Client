import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAgency, setDeliveryAgency] = useState("");
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await fetch(
          `http://localhost:5000/gets/cartitems?patientId=${localdata.PatientId}`
        );
        const temp = await cartItems.json();
        setCartItems(temp);
        console.log(temp);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();

    const fetchdeliveryAgency = async () => {
      try {
        const deliveryAgency = await fetch(
          `http://localhost:5000/gets/deliveryagency`
        );
        const temp = await deliveryAgency.json();
        console.log(temp);
        setDeliveryAgency(temp);
      } catch (error) {
        console.error("Error fetching delivery agency:", error);
      }
    };
    fetchdeliveryAgency();
  }, []);

  const updateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.PRODUCT_ID === productId
          ? { ...item, CART_QUANTITY: newQuantity }
          : item
      )
    );
  };

  const removeItem = (id) => {
    console.log("Remove item with id:", id);
    setCartItems(cartItems.filter((item) => item.PRODUCT_ID !== id));
  };

  const totalAmount = cartItems.reduce(
    (total, item) => total + item.PRODUCT_PRICE * item.CART_QUANTITY,
    0
  );
  console.log(cartItems);

  const checkout = () => {};

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.map((item) => (
            <CartItem
              key={item.PRODUCT_ID}
              productName={item.PRODUCT_NAME}
              productPrice={item.PRODUCT_PRICE}
              initialQuantity={item.CART_QUANTITY}
              finalQuantity={item.QUANTITY}
              productId={item.PRODUCT_ID}
              onRemove={() => removeItem(item.PRODUCT_ID)}
              onQuantityChange={updateQuantity}
            />
          ))}
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Amount</Card.Title>
              <Card.Text>${totalAmount.toFixed(2)}</Card.Text>
              <Button variant="primary" onClick={checkout}>
                Proceed to Checkout
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Cart;
