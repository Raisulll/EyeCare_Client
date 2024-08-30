import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";

const Shop = () => {
  const navigate = useNavigate();
  const [shopData, setShopData] = useState([]);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // fetch shop data from the server
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
    fetchShopData();
  }, [])
  
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
      </Container>
    </div>
  );
}

export default Shop;