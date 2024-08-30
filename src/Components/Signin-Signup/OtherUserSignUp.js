import React from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import { FaUserDoctor,FaHospitalUser } from "react-icons/fa6";
import { MdOutlineShoppingCart } from "react-icons/md";

import "../../App.css";

const OtherUserSignUp = () => {
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">Sign up as</Card.Title>
              <div className="text-center">
                <NavLink to="/doctorsignup">
                  <Button variant="primary" size="lg" className="mb-3 w-100">
                  <FaUserDoctor />  Doctor
                  </Button>
                </NavLink>
                <NavLink to="/shopsignup">
                  <Button variant="primary" size="lg" className="mb-3 w-100">
                  <MdOutlineShoppingCart />  Shop Owner
                  </Button>
                </NavLink>
                <NavLink to="/hospitalsignup">
                  <Button variant="primary" size="lg" className="w-100">
                  <FaHospitalUser />  Eye Hospital Manager
                  </Button>
                </NavLink>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default OtherUserSignUp;
