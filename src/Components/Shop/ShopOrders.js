import React from "react";
import { useState, useEffect } from "react";
import { Card, Button, ListGroup } from "react-bootstrap";
import "./shoporder.css";


const ShopOrders = () => {
  const [order, setOrder] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const orders = await fetch(
          `http://localhost:5000/gets/ordersforshop?shopId=${localdata.ShopId}`
        );
        const temp = await orders.json();
        // Group orders by ORDER_ID
        //format the date
        temp.forEach((order) => {
          const date = new Date(order.ORDER_DATE);
          order.ORDER_DATE = `${date.getDate()}/${
            date.getMonth() + 1
          }/${date.getFullYear()}`;
        });
        const groupedOrders = temp.reduce((acc, order) => {
          const { ORDER_ID } = order;
          if (!acc[ORDER_ID]) {
            acc[ORDER_ID] = {
              ORDER_ID,
              PATIENT_NAME: order.PATIENT_NAME,
              ORDER_DATE: order.ORDER_DATE,
              DELIVERY_AGENCY_NAME: order.DELIVERY_AGENCY_NAME,
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
        console.log(Object.values(groupedOrders));
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrders();
  }, []);

  const acceptOrder = async (orderId) => {
    try {
      const response = await fetch(`http://localhost:5000/sets/acceptorder`, {
        method: "POST",
        body: JSON.stringify({ orderId }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.status === 200) {
        setOrder((prevOrders) =>
          prevOrders.filter((order) => order.ORDER_ID !== orderId)
        );
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div className="order-div">
      {order.map((order) => (
        <Card key={order.ORDER_ID} style={{ width: "18rem" }}>
          <Card.Body className="cardbody">
            <Card.Title>Order ID: {order.ORDER_ID}</Card.Title>
            {localdata.usertype === "shop" && (
              <Card.Subtitle className="mb-2 text-muted">
                Patient Name: {order.PATIENT_NAME}
              </Card.Subtitle>
            )}
            <Card.Subtitle className="mb-2 text-muted">
              Order Date: {order.ORDER_DATE}
            </Card.Subtitle>
            <Card.Subtitle className="mb-2 text-muted">
              Agency: {order.DELIVERY_AGENCY_NAME}
            </Card.Subtitle>
            <ListGroup>
              {order.products.map((product) => (
                <ListGroup.Item key={product.PRODUCT_NAME}>
                  {product.PRODUCT_NAME} - {product.ORDER_QUANTITY}
                </ListGroup.Item>
              ))}
            </ListGroup>
            <Button
              variant="primary"
              className="acceptorder"
              onClick={() => acceptOrder(order.ORDER_ID)}
            >
              Accept Order
            </Button>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default ShopOrders;
