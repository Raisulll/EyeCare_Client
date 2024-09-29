import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";
import { Card, Container, Row, Col, ListGroup, Button } from "react-bootstrap";

const DeliveryProfile = () => {
  const [deliveryData, setDeliveryData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  const [status, setStatus] = useState("");
  const [deliveryCharge, setDeliveryCharge] = useState("");
  const [orders, setOrders] = useState([]);

  const localdata = JSON.parse(localStorage.getItem("user"));
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
        setImagePreview(temp[0].DELIVERY_AGENCY_IMAGE);
        setFullName(temp[0].DELIVERY_AGENCY_NAME);
        setEmail(temp[0].DELIVERY_AGENCY_EMAIL);
        setPhone(temp[0].DELIVERY_AGENCY_PHONE);
        setDistrict(temp[0].DELIVERY_AGENCY_DISTRICT);
        setArea(temp[0].DELIVERY_AGENCY_AREA);
        setRoadNumber(temp[0].DELIVERY_AGENCY_ROADNUMBER);
        setStatus(temp[0].DELIVERY_AGENCY_STATUS);
        setDeliveryCharge(temp[0].DELIVERY_CHARGE);
        console.log("Delivery Data1:", temp);
      } catch (error) {
        console.log("Error fetching delivery data:", error);
      }
    };

    // Fetch orders for the delivery agency
    const fetchOrders = async () => {
      // try {
      //   const orders = await fetch(
      //     `http://localhost:5000/gets/ordersfordeliveryagency?deliveryId=${deliveryId}`
      //   );
      //   const temp = await orders.json();
      //   setOrders(temp);
      //   console.log("Orders:", orders);
      // } catch (error) {
      //   console.log("Error fetching orders:", error);
      // }
    };

    fetchDeliveryData();
    console.log("Delivery Data:", deliveryData);
    fetchOrders();
  }, []);

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        try {
          const res = await fetch("http://localhost:5000/upload/deliveryprofile", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              imageBase64: base64String,
              deliveryId: localdata.deliveryId,
            }),
          });

          const data = await res.json();
          if (res.ok) {
            console.log("Image uploaded successfully:", data);
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
          } else {
            console.error("Image upload failed:", data.message);
            toast.error("Image Upload Failed", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

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
    // <Container className="mt-5">
    //   <Row>
    //     <Col md={4}>
    //       {/* Delivery Agency Profile Card */}
    //       <Card>
    //         <Card.Header as="h5">Delivery Agency Profile</Card.Header>
    //         <Card.Body>
    //           <Card.Title>{deliveryData.DELIVERY_AGENCY_NAME}</Card.Title>
    //           <Card.Text>
    //             <strong>Phone:</strong> {deliveryData.DELIVERY_AGENCY_PHONE}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>Email:</strong> {deliveryData.DELIVERY_AGENCY_EMAIL}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>License:</strong> {deliveryData.DELIVERY_AGENCY_LICENSE}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>Area:</strong> {deliveryData.DELIVERY_AGENCY_AREA}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>District:</strong>{" "}
    //             {deliveryData.DELIVERY_AGENCY_DISTRICT}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>Road Number:</strong>{" "}
    //             {deliveryData.DELIVERY_AGENCY_ROADNUMBER}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>Status:</strong> {deliveryData.DELIVERY_AGENCY_STATUS}
    //           </Card.Text>
    //           <Card.Text>
    //             <strong>Delivery Charge:</strong> $
    //             {deliveryData.DELIVERY_CHARGE}
    //           </Card.Text>
    //         </Card.Body>
    //       </Card>
    //     </Col>

    //     <Col md={8}>
    //       {/* Orders List */}
    //       <Card>
    //         <Card.Header as="h5">Orders</Card.Header>
    //         <ListGroup variant="flush">
    //           {orders.length > 0 ? (
    //             orders.map((order, index) => (
    //               <ListGroup.Item key={index}>
    //                 <Row>
    //                   <Col md={6}>
    //                     <strong>Order ID:</strong> {order.ORDER_ID}
    //                   </Col>
    //                   <Col md={6}>
    //                     <strong>Order Date:</strong>{" "}
    //                     {new Date(order.ORDER_DATE).toLocaleString()}
    //                   </Col>
    //                 </Row>
    //                 <Row>
    //                   <Col md={6}>
    //                     <strong>Patient Name:</strong> {order.PATIENT_NAME}
    //                   </Col>
    //                   <Col md={6}>
    //                     <strong>Patient Phone:</strong> {order.PATIENT_PHONE}
    //                   </Col>
    //                 </Row>
    //                 <Row>
    //                   <Col md={6}>
    //                     <strong>Patient Area:</strong> {order.PATIENT_AREA}
    //                   </Col>
    //                   <Col md={6}>
    //                     <strong>Patient District:</strong>{" "}
    //                     {order.PATIENT_DISTRICT}
    //                   </Col>
    //                 </Row>
    //                 <Row>
    //                   <Col md={6}>
    //                     <strong>Shop Name:</strong> {order.SHOP_NAME}
    //                   </Col>
    //                   <Col md={6}>
    //                     <strong>Order Status:</strong> {order.ORDER_STATUS}
    //                   </Col>
    //                 </Row>
    //                 <Row className="mt-3">
    //                   <Col md={12} className="text-right">
    //                     {/* Delivered Button */}
    //                     <Button
    //                       variant="success"
    //                       onClick={() => handleDelivered(order.ORDER_ID)}
    //                     >
    //                       Mark as Delivered
    //                     </Button>
    //                   </Col>
    //                 </Row>
    //               </ListGroup.Item>
    //             ))
    //           ) : (
    //             <ListGroup.Item>No orders found.</ListGroup.Item>
    //           )}
    //         </ListGroup>
    //       </Card>
    //     </Col>
    //   </Row>
    // </Container>
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
                Shop Name
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
                id="phoneNumber"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber" className="label">
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
