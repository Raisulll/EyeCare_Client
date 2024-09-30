import React, { useState, useEffect } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../Shop/shoporder.css";

const ShopOrders = () => {
  const [previousOrders, setPreviousOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPreviousOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/prevorders?patientId=${localdata.PatientId}`
        );
        const temp = await response.json();

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
              SHOP_NAME: order.SHOP_NAME,
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

        setPreviousOrders(Object.values(groupedOrders));
      } catch (error) {
        console.log(error);
      }
    };

    const fetchUpcomingOrders = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/upcomingorders?patientId=${localdata.PatientId}`
        );
        const temp = await response.json();

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
              SHOP_NAME: order.SHOP_NAME,
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

        setUpcomingOrders(Object.values(groupedOrders));
      } catch (error) {
        console.log(error);
      }
    };

    fetchPreviousOrders();
    fetchUpcomingOrders();
  }, [localdata.PatientId]);

  const renderOrderCard = (order) => (
    <Card key={order.ORDER_ID} style={{ width: "18rem", margin: "10px" }}>
      <Card.Body className="cardbody">
        <Card.Title>Order ID: {order.ORDER_ID}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          Shop Name: {order.SHOP_NAME}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Order Date: {order.ORDER_DATE}
        </Card.Subtitle>
        <Card.Subtitle className="mb-2 text-muted">
          Delivery Agency: {order.DELIVERY_AGENCY_NAME}
        </Card.Subtitle>
        <ListGroup>
          {order.products.map((product, index) => (
            <ListGroup.Item key={index}>
              {product.PRODUCT_NAME} - {product.ORDER_QUANTITY}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </Card.Body>
    </Card>
  );

  return (
    <div className="order-div">
      <h6>Upcoming Orders</h6>
      <div className="order-list">
        {upcomingOrders.length > 0 ? (
          upcomingOrders.map((order) => renderOrderCard(order))
        ) : (
          <p>No upcoming orders</p>
        )}
      </div>

      <h6>Previous Orders</h6>
      <div className="order-list">
        {previousOrders.length > 0 ? (
          previousOrders.map((order) => renderOrderCard(order))
        ) : (
          <p>No previous orders</p>
        )}
      </div>
    </div>
  );
};

export default ShopOrders;
