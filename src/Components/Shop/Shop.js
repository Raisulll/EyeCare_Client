import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";
import { Button, Card, Col, Container, Row, ListGroup } from "react-bootstrap";

const Shop = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
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
        setImagePreview(temp.SHOP_IMAGE);
        setFullName(temp.SHOP_NAME);
        setEmail(temp.SHOP_MAIL);
        setPhone(temp.SHOP_PHONE);
        setDistrict(temp.SHOP_DISTRICT);
        setArea(temp.SHOP_AREA);
        setRoadNumber(temp.SHOP_ROADNUMBER);
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
          const res = await fetch(
            "http://localhost:5000/upload/doctorProfile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imageBase64: base64String,
                doctorId: localdata.doctorId,
              }),
            }
          );

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
    // <div className="profile-container">
    //   <Container className="profile-content">
    //     <Row>
    //       <Col>
    //         <Card className="profile-card">
    //           <Card.Body>
    //             <Card.Title>{shopData.SHOP_NAME}</Card.Title>
    //             <Card.Text>{shopData.SHOP_MAIL}</Card.Text>
    //             <Card.Text>{shopData.SHOP_PHONE}</Card.Text>
    //             <Card.Text>{shopData.SHOP_DISTRICT}</Card.Text>
    //             <Card.Text>{shopData.SHOP_AREA}</Card.Text>
    //             <Card.Text>{shopData.SHOP_ROADNUMBER}</Card.Text>
    //             <Card.Text>{shopData.SHOP_LICENSE}</Card.Text>
    //             <Button onClick={() => navigate("/addproduct")}>
    //               Add Products
    //             </Button>
    //           </Card.Body>
    //         </Card>
    //       </Col>
    //     </Row>

    //     <Row className="mt-5">
    //       <Col>
    //         <h3>Pending Orders</h3>
    //         {orders.length > 0 ? (
    //           orders.map((order) => (
    //             <Card key={order.ORDER_ID} className="mb-3">
    //               <Card.Body>
    //                 <Card.Title>Order ID: {order.ORDER_ID}</Card.Title>
    //                 <Card.Subtitle className="mb-2 text-muted">
    //                   User : {order.PATIENT_NAME}
    //                 </Card.Subtitle>
    //                 <Card.Text>
    //                   Order Date:{" "}
    //                   {new Date(order.ORDER_DATE).toLocaleDateString()}
    //                 </Card.Text>
    //                 <ListGroup variant="flush">
    //                   {order.products.map((product, index) => (
    //                     <ListGroup.Item key={index}>
    //                       {product.PRODUCT_NAME} - Quantity:{" "}
    //                       {product.ORDER_QUANTITY}
    //                     </ListGroup.Item>
    //                   ))}
    //                 </ListGroup>
    //                 <Button
    //                   variant="success"
    //                   className="mt-3"
    //                   onClick={() => acceptOrder(order.ORDER_ID)}
    //                 >
    //                   Accept Order
    //                 </Button>
    //               </Card.Body>
    //             </Card>
    //           ))
    //         ) : (
    //           <p>No pending orders.</p>
    //         )}
    //       </Col>
    //     </Row>
    //   </Container>
    // </div>
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
        <div className="vitorer-div last-div">
          <StyledWrapper>
            <button onClick={() => {
              navigate("/addproduct");
            }}>
              Add Product
              <div className="arrow-wrapper">
                <div className="arrow" />
              </div>
            </button>
          </StyledWrapper>
          <StyledWrapper>
            <button >
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


export default Shop;
