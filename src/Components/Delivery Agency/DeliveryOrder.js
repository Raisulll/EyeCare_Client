import React, { useEffect, useState } from "react";
import { Button, Card, ListGroup } from "react-bootstrap";
import "../Shop/shoporder.css";

const DeliveryOrder = () => {
  const [order, setOrder] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Dummy data for orders
    const dummyOrders = [
      {
        ORDER_ID: "1",
        PATIENT_NAME: "John Doe",
        ORDER_DATE: "10/2/2025",
        DELIVERY_AGENCY_NAME: "Sample Delivery Agency",
        PATIENT_ADDRESS: {
          PATIENT_ROADNUMBER: "123",
          PATIENT_AREA: "Area B",
          PATIENT_DISTRICT: "District A",
        },
        PATIENT_PHONE: "1234567890",
        products: [
          { PRODUCT_NAME: "Product 1", ORDER_QUANTITY: 2 },
          { PRODUCT_NAME: "Product 2", ORDER_QUANTITY: 1 },
        ],
      },
      {
        ORDER_ID: "2",
        PATIENT_NAME: "Jane Smith",
        ORDER_DATE: "15/2/2025",
        DELIVERY_AGENCY_NAME: "Sample Delivery Agency",
        PATIENT_ADDRESS: {
          PATIENT_ROADNUMBER: "456",
          PATIENT_AREA: "Area C",
          PATIENT_DISTRICT: "District B",
        },
        PATIENT_PHONE: "0987654321",
        products: [
          { PRODUCT_NAME: "Product 3", ORDER_QUANTITY: 3 },
          { PRODUCT_NAME: "Product 4", ORDER_QUANTITY: 2 },
        ],
      },
    ];

    setOrder(dummyOrders);
  }, []);

  const deliverOrder = (orderId) => {
    console.log(`Delivering order ${orderId}...`);
    // Filter out the delivered order from the UI
    setOrder((prevOrders) =>
      prevOrders.filter((order) => order.ORDER_ID !== orderId)
    );
    console.log(`Order ${orderId} marked as delivered.`);
  };

  return (
    <div className="order-div">
      {order.map((order) => (
        <Card key={order.ORDER_ID} className="order-card">
          <Card.Body className="cardbody">
            <Card.Title>Order ID: {order.ORDER_ID}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">
              Patient Name: {order.PATIENT_NAME}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Patient Phone: {order.PATIENT_PHONE}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Patient Address:{" "}
              {`${order.PATIENT_ADDRESS.PATIENT_ROADNUMBER}, ${order.PATIENT_ADDRESS.PATIENT_AREA}, ${order.PATIENT_ADDRESS.PATIENT_DISTRICT}`}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Order Date: {order.ORDER_DATE}
            </Card.Subtitle>
            <ListGroup>
              {order.products.map((product, index) => (
                <ListGroup.Item key={index}>
                  {product.PRODUCT_NAME} - {product.ORDER_QUANTITY}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              variant="primary"
              className="acceptorder"
              onClick={() => deliverOrder(order.ORDER_ID)}
            >
              Mark Delivered
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default DeliveryOrder;
