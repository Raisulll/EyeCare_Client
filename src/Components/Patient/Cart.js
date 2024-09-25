import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import CartItem from "./CartItem";

const Cart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [deliveryAgencies, setDeliveryAgencies] = useState([]);
  const [selectedAgency, setSelectedAgency] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const localdata = JSON.parse(localStorage.getItem("user"));
  const [orderId, setOrderId] = useState('');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const cartItems = await fetch(
          `http://localhost:5000/gets/cartitems?patientId=${localdata.PatientId}`
        );
        const temp = await cartItems.json();
        setCartItems(temp);
        console.log("Cart Items:", temp);
      } catch (error) {
        console.error("Error fetching cart items:", error);
      }
    };
    fetchCartItems();

    const fetchDeliveryAgencies = async () => {
      try {
        const deliveryAgencies = await fetch(
          `http://localhost:5000/gets/deliveryagency`
        );
        const temp = await deliveryAgencies.json();
        console.log("Delivery Agencies:", temp);
        setDeliveryAgencies(temp);

        // Set default selected agency (first one in the list)
        if (temp.length > 0) {
          setSelectedAgency(temp[0]);
        }
      } catch (error) {
        console.error("Error fetching delivery agencies:", error);
      }
    };
    fetchDeliveryAgencies();
  }, []);

  useEffect(() => {
    // Recalculate total amount whenever cart items or selected agency changes
    updateTotalAmount(selectedAgency);
  }, [cartItems, selectedAgency]);

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      // Remove the item if quantity is 0
      setCartItems((prevItems) =>
        prevItems.filter((item) => item.PRODUCT_ID !== productId)
      );
    } else {
      // Update the quantity of the item
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

  const checkout = async() => {
    const uuid = uuidv4();
    const sixDigitOrderId = uuid.substr(0, 6);
    console.log("Order ID:", sixDigitOrderId);
    const data = {
      orderId: sixDigitOrderId,
      patientId: localdata.PatientId,
      deliveryAgencyId: selectedAgency.DELIVERY_AGENCY_ID
    };
    console.log(data);
    try {
      const result = await fetch("http://localhost:5000/sets/placeorder", {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
    
  };

  return (
    <Container className="mt-5">
      <h2>Your Cart</h2>
      <Row>
        <Col md={8}>
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <CartItem
                key={item.PRODUCT_ID}
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
        </Col>
        <Col md={4}>
          <Card>
            <Card.Body>
              <Card.Title>Total Amount</Card.Title>

              {/* Delivery Options */}
              <Form.Group>
                <Form.Label>Choose Delivery Option</Form.Label>
                <Form.Control
                  as="select"
                  value={
                    selectedAgency ? selectedAgency.DELIVERY_AGENCY_ID : ""
                  }
                  onChange={handleDeliveryChange}
                >
                  {deliveryAgencies.map((agency) => (
                    <option
                      key={agency.DELIVERY_AGENCY_ID}
                      value={agency.DELIVERY_AGENCY_ID}
                    >
                      {`${agency.DELIVERY_AGENCY_NAME} - ${agency.DELIVERY_AGENCY_STATUS} (Charge: $${agency.DELIVERY_CHARGE})`}
                    </option>
                  ))}
                </Form.Control>
              </Form.Group>

              {/* Display Total */}
              <Card.Text>
                Items Total: $
                {cartItems
                  .reduce(
                    (total, item) =>
                      total + item.PRODUCT_PRICE * item.CART_QUANTITY,
                    0
                  )
                  .toFixed(2)}
              </Card.Text>
              <Card.Text>
                Delivery Charge: $
                {selectedAgency
                  ? selectedAgency.DELIVERY_CHARGE.toFixed(2)
                  : "0.00"}
              </Card.Text>
              <Card.Text>
                <strong>Gross Total: ${totalAmount.toFixed(2)}</strong>
              </Card.Text>
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
