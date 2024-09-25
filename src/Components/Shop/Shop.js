import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Row, ListGroup } from "react-bootstrap";

const Shop = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState([]);
  const [orders, setOrders] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchShopData = async () => {
      try {
        const shop = await fetch(
          `http://localhost:5000/gets/shopdata?shopid=${localdata.ShopId}`
        );
        const temp = await shop.json();
        setShopData(temp);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchOrders = async () => {
      try {
        const orders = await fetch(
          `http://localhost:5000/gets/orders?shopId=${localdata.ShopId}`
        );
        const temp = await orders.json();
        // Group orders by ORDER_ID
        const groupedOrders = temp.reduce((acc, order) => {
          const { ORDER_ID } = order;
          if (!acc[ORDER_ID]) {
            acc[ORDER_ID] = {
              ORDER_ID,
              PATIENT_NAME: order.PATIENT_NAME,
              ORDER_DATE: order.ORDER_DATE,
              products: [],
            };
          }
          acc[ORDER_ID].products.push({
            PRODUCT_NAME: order.PRODUCT_NAME,
            ORDER_QUANTITY: order.ORDER_QUANTITY,
          });
          return acc;
        }, {});
        setOrders(Object.values(groupedOrders));
        console.log(Object.values(groupedOrders));
      } catch (error) {
        console.log(error);
      }
    };

    fetchShopData();
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
        // Update the orders list after accepting the order
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.ORDER_ID !== orderId)
        );
      }
    } catch (error) {
      console.error("Error accepting order:", error);
    }
  };

  return (
    <div className="profile-container">
      <Container className="profile-content">
        <Row>
          <Col>
            <Card className="profile-card">
              <Card.Body>
                <Card.Title>{shopData.SHOP_NAME}</Card.Title>
                <Card.Text>{shopData.SHOP_MAIL}</Card.Text>
                <Card.Text>{shopData.SHOP_PHONE}</Card.Text>
                <Card.Text>{shopData.SHOP_DISTRICT}</Card.Text>
                <Card.Text>{shopData.SHOP_AREA}</Card.Text>
                <Card.Text>{shopData.SHOP_ROADNUMBER}</Card.Text>
                <Card.Text>{shopData.SHOP_LICENSE}</Card.Text>
                <Button onClick={() => navigate("/addproduct")}>
                  Add Products
                </Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>

        <Row className="mt-5">
          <Col>
            <h3>Pending Orders</h3>
            {orders.length > 0 ? (
              orders.map((order) => (
                <Card key={order.ORDER_ID} className="mb-3">
                  <Card.Body>
                    <Card.Title>Order ID: {order.ORDER_ID}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">
                      User : {order.PATIENT_NAME}
                    </Card.Subtitle>
                    <Card.Text>
                      Order Date:{" "}
                      {new Date(order.ORDER_DATE).toLocaleDateString()}
                    </Card.Text>
                    <ListGroup variant="flush">
                      {order.products.map((product, index) => (
                        <ListGroup.Item key={index}>
                          {product.PRODUCT_NAME} - Quantity:{" "}
                          {product.ORDER_QUANTITY}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                    <Button
                      variant="success"
                      className="mt-3"
                      onClick={() => acceptOrder(order.ORDER_ID)}
                    >
                      Accept Order
                    </Button>
                  </Card.Body>
                </Card>
              ))
            ) : (
              <p>No pending orders.</p>
            )}
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Shop;
