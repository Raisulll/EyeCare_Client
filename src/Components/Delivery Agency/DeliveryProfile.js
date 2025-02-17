import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, ListGroup, Row } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";

const DeliveryProfile = () => {
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/600x400"
  );
  const [fullName, setFullName] = useState("Sample Delivery Agency");
  const [email, setEmail] = useState("delivery@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [district, setDistrict] = useState("District A");
  const [area, setArea] = useState("Area B");
  const [roadNumber, setRoadNumber] = useState("123");
  const [status, setStatus] = useState("Active");
  const [deliveryCharge, setDeliveryCharge] = useState("$10");
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Dummy data for orders
    const dummyOrders = [
      {
        ORDER_ID: "1",
        PATIENT_NAME: "John Doe",
        ORDER_DATE: "10/2/2025",
        PATIENT_PHONE: "1234567890",
        PATIENT_AREA: "Area B",
        PATIENT_DISTRICT: "District A",
        SHOP_NAME: "Sample Shop",
        ORDER_STATUS: "Pending",
      },
      {
        ORDER_ID: "2",
        PATIENT_NAME: "Jane Smith",
        ORDER_DATE: "15/2/2025",
        PATIENT_PHONE: "0987654321",
        PATIENT_AREA: "Area C",
        PATIENT_DISTRICT: "District B",
        SHOP_NAME: "Sample Shop",
        ORDER_STATUS: "Pending",
      },
    ];

    setOrders(dummyOrders);
  }, []);

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        console.log("Image uploaded successfully:", base64String);
        toast.success("Image Upload Successful!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDelivered = (orderId) => {
    console.log(`Order ${orderId} marked as delivered.`);
    setOrders((prevOrders) =>
      prevOrders.filter((order) => order.ORDER_ID !== orderId)
    );
    toast.success(`Order ${orderId} marked as delivered!`, {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };

  return (
    <div className="firstdiv">
      <ToastContainer />
      <div className="second">
        <div onClick={handleImageClick}>
          <img className="profile-image" src={imagePreview} alt="profile" />
          <input
            className="profile-image-input"
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="fullName" className="label">
                Delivery Agency Name
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input type="email" id="email" value={email} readOnly required />
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber" className="label">
                Phone Number
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
              <label htmlFor="district" className="label">
                District
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
              <label htmlFor="area" className="label">
                Area
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="roadNumber"
                value={roadNumber}
                onChange={(e) => setRoadNumber(e.target.value)}
                required
              />
              <label htmlFor="roadNumber" className="label">
                Road Number
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
              />
              <label htmlFor="status" className="label">
                Status
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="deliveryCharge"
                value={deliveryCharge}
                onChange={(e) => setDeliveryCharge(e.target.value)}
                required
              />
              <label htmlFor="deliveryCharge" className="label">
                Delivery Charge
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div last-div">
          <StyledWrapper>
            <button>
              Update
              <div className="arrow-wrapper">
                <div className="arrow" />
              </div>
            </button>
          </StyledWrapper>
        </div>
      </div>
      <Container className="mt-5">
        <Row>
          <Col md={12}>
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
                          <strong>Order Date:</strong> {order.ORDER_DATE}
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
    </div>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 15px auto;
    width: 20vw;
  }

  .input-container input[type="text"],
  .input-container input[type="email"],
  .input-container input[type="date"],
  .input-container input[type="password"],
  .input-container input[type="number"],
  .input-container select {
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #000;
    padding: 5px 0;
    background-color: transparent;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input:focus ~ .label,
  .input-container input:valid ~ .label,
  .input-container input[readonly] ~ .label,
  .input-container select:focus ~ .label,
  .input-container select:valid ~ .label {
    top: -20px;
    font-size: 16px;
    color: #263238;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #263238;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input:focus ~ .underline,
  .input-container input:valid ~ .underline {
    transform: scaleX(1);
  }

  button {
    --primary-color: #645bff;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
  }

  button .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
  }

  button .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }

  button:hover {
    background-color: var(--hover-color);
  }

  button:hover .arrow {
    background: var(--secondary-color);
  }

  button:hover .arrow:before {
    right: 0;
  }
`;

export default DeliveryProfile;
