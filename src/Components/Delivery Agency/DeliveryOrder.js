import React, { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import "../Shop/shoporder.css";

const DeliveryOrder = () => {
  const [order, setOrder] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetch(
          `http://localhost:5000/gets/ordersfordelivery?deliveryId=${localdata.deliveryId}`
        );
        const temp = await orders.json();

        // Format the date
        temp.forEach((order) => {
          const date = new Date(order.ORDER_DATE);
          order.ORDER_DATE = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        });

        // Group orders by ORDER_ID
        const groupedOrders = temp.reduce((acc, order) => {
          const { ORDER_ID } = order;
          if (!acc[ORDER_ID]) {
            acc[ORDER_ID] = {
              ORDER_ID,
              PATIENT_NAME: order.PATIENT_NAME,
              ORDER_DATE: order.ORDER_DATE,
              DELIVERY_AGENCY_NAME: order.DELIVERY_AGENCY_NAME,
              PATIENT_ADDRESS: order.PATIENT_ADDRESS, 
              PATIENT_PHONE: order.PATIENT_PHONE,
              products: [],
            };
          }
          acc[ORDER_ID].products.push({
            PRODUCT_NAME: order.PRODUCT_NAME,
            ORDER_QUANTITY: order.ORDER_QUANTITY,
          });
          return acc;
        }, {});

        setOrder(Object.values(groupedOrders));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, [localdata.deliveryId]);

  const deliverOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/sets/done`, {
        method: "POST",
        body: JSON.stringify({ orderId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {
      console.log(error);
    }
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
