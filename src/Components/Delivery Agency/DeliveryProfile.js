import React, { useEffect, useState } from "react";
import { Card, Container, Row, Col, ListGroup, Button } from "react-bootstrap";

const DeliveryProfile = () => {
  const [deliveryData, setDeliveryData] = useState({});
  const [orders, setOrders] = useState([]);
  const deliveryId = JSON.parse(localStorage.getItem("user")).deliveryId;

  useEffect(() => {
    // Fetch delivery agency data
    const fetchDeliveryData = async () => {
      try {
        const delivery = await fetch(
          `http://localhost:5000/gets/deliverydata?deliveryId=${deliveryId}`
        );
        const temp = await delivery.json();
        setDeliveryData(temp[0]);
        console.log("Delivery Data1:", temp);
      } catch (error) {
        console.log("Error fetching delivery data:", error);
      }
    };

    // Fetch orders for the delivery agency
    const fetchOrders = async () => {
      try {
        const orders = await fetch(
          `http://localhost:5000/gets/ordersfordeliveryagency?deliveryId=${deliveryId}`
        );
        const temp = await orders.json();
        setOrders(temp);
        console.log("Orders:", orders);
      } catch (error) {
        console.log("Error fetching orders:", error);
      }
    };

    fetchDeliveryData();
    console.log("Delivery Data:", deliveryData);
    fetchOrders();
  }, []);

  // Function to mark an order as delivered
  const handleDelivered = async (orderId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/gets/markOrderDelivered?orderId=${orderId}`,
        {
          method: "PUT", // Assuming the API uses PUT to update order status
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        // Update the orders state to remove or mark the delivered order
        setOrders((prevOrders) =>
          prevOrders.filter((order) => order.ORDER_ID !== orderId)
        );
        console.log(`Order ${orderId} marked as delivered.`);
      } else {
        console.log("Failed to mark order as delivered.");
      }
    } catch (error) {
      console.log("Error marking order as delivered:", error);
    }
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={4}>
          {/* Delivery Agency Profile Card */}
          <Card>
            <Card.Header as="h5">Delivery Agency Profile</Card.Header>
            <Card.Body>
              <Card.Title>{deliveryData.DELIVERY_AGENCY_NAME}</Card.Title>
              <Card.Text>
                <strong>Phone:</strong> {deliveryData.DELIVERY_AGENCY_PHONE}
              </Card.Text>
              <Card.Text>
                <strong>Email:</strong> {deliveryData.DELIVERY_AGENCY_EMAIL}
              </Card.Text>
              <Card.Text>
                <strong>License:</strong> {deliveryData.DELIVERY_AGENCY_LICENSE}
              </Card.Text>
              <Card.Text>
                <strong>Area:</strong> {deliveryData.DELIVERY_AGENCY_AREA}
              </Card.Text>
              <Card.Text>
                <strong>District:</strong>{" "}
                {deliveryData.DELIVERY_AGENCY_DISTRICT}
              </Card.Text>
              <Card.Text>
                <strong>Road Number:</strong>{" "}
                {deliveryData.DELIVERY_AGENCY_ROADNUMBER}
              </Card.Text>
              <Card.Text>
                <strong>Status:</strong> {deliveryData.DELIVERY_AGENCY_STATUS}
              </Card.Text>
              <Card.Text>
                <strong>Delivery Charge:</strong> $
                {deliveryData.DELIVERY_CHARGE}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          {/* Orders List */}
          <Card>
            <Card.Header as="h5">Orders</Card.Header>
            <ListGroup variant="flush">
              {orders.length > 0 ? (
                orders.map((order, index) => (
                  <ListGroup.Item key={index}>
                    <Row>
                      <Col md={6}>
                        <strong>Order ID:</strong> {order.ORDER_ID}
                      </Col>
                      <Col md={6}>
                        <strong>Order Date:</strong>{" "}
                        {new Date(order.ORDER_DATE).toLocaleString()}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <strong>Patient Name:</strong> {order.PATIENT_NAME}
                      </Col>
                      <Col md={6}>
                        <strong>Patient Phone:</strong> {order.PATIENT_PHONE}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <strong>Patient Area:</strong> {order.PATIENT_AREA}
                      </Col>
                      <Col md={6}>
                        <strong>Patient District:</strong>{" "}
                        {order.PATIENT_DISTRICT}
                      </Col>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <strong>Shop Name:</strong> {order.SHOP_NAME}
                      </Col>
                      <Col md={6}>
                        <strong>Order Status:</strong> {order.ORDER_STATUS}
                      </Col>
                    </Row>
                    <Row className="mt-3">
                      <Col md={12} className="text-right">
                        {/* Delivered Button */}
                        <Button
                          variant="success"
                          onClick={() => handleDelivered(order.ORDER_ID)}
                        >
                          Mark as Delivered
                        </Button>
                      </Col>
                    </Row>
                  </ListGroup.Item>
                ))
              ) : (
                <ListGroup.Item>No orders found.</ListGroup.Item>
              )}
            </ListGroup>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default DeliveryProfile;
