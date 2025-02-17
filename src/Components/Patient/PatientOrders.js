import React, { useEffect, useState } from "react";
import { Card, ListGroup } from "react-bootstrap";
import "../Shop/shoporder.css";

const ShopOrders = () => {
  const [previousOrders, setPreviousOrders] = useState([]);
  const [upcomingOrders, setUpcomingOrders] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // Dummy data for previous orders
    const dummyPreviousOrders = [
      {
        ORDER_ID: "1",
        SHOP_NAME: "Shop A",
        ORDER_DATE: "15/02/2025",
        DELIVERY_AGENCY_NAME: "Agency X",
        products: [
          { PRODUCT_NAME: "Product 1", ORDER_QUANTITY: 2 },
          { PRODUCT_NAME: "Product 2", ORDER_QUANTITY: 1 },
        ],
      },
      {
        ORDER_ID: "2",
        SHOP_NAME: "Shop B",
        ORDER_DATE: "10/02/2025",
        DELIVERY_AGENCY_NAME: "Agency Y",
        products: [
          { PRODUCT_NAME: "Product 3", ORDER_QUANTITY: 1 },
          { PRODUCT_NAME: "Product 4", ORDER_QUANTITY: 3 },
        ],
      },
    ];

    // Dummy data for upcoming orders
    const dummyUpcomingOrders = [
      {
        ORDER_ID: "3",
        SHOP_NAME: "Shop C",
        ORDER_DATE: "20/02/2025",
        DELIVERY_AGENCY_NAME: "Agency Z",
        products: [
          { PRODUCT_NAME: "Product 5", ORDER_QUANTITY: 1 },
          { PRODUCT_NAME: "Product 6", ORDER_QUANTITY: 2 },
        ],
      },
      {
        ORDER_ID: "4",
        SHOP_NAME: "Shop D",
        ORDER_DATE: "25/02/2025",
        DELIVERY_AGENCY_NAME: "Agency W",
        products: [
          { PRODUCT_NAME: "Product 7", ORDER_QUANTITY: 2 },
          { PRODUCT_NAME: "Product 8", ORDER_QUANTITY: 1 },
        ],
      },
    ];

    setPreviousOrders(dummyPreviousOrders);
    setUpcomingOrders(dummyUpcomingOrders);
  }, []);

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
