import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({});

  useEffect(() => {
    // Fetch data from user object in local storage
    const user = JSON.parse(localStorage.getItem("user"));
    const data = {
      Name: user?.doctorName,
      avatar: "image.png",
      coverPhoto: "pexels-tobiasbjorkli-1887624.jpg",
      
      ID: user?.doctorId,
      GENDER: user?.doctorGender,
      EMAIL: user?.doctorEmail,
      PHONE: user?.doctorPhone,
      DISTRICT: user?.doctorDistrict,
      AREA: user?.doctorArea,
      ROADNUMBER: user?.doctorRoadNum,
      LICENSE: user?.doctorLicense,
      TIMESLOT: user?.timeslot,
      EXPERTISE: user?.experience,
    };
    setDoctorData(data);
  }, [localStorage.getItem("user")]);

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Img
          variant="top"
          src={doctorData.coverPhoto}
          className="cover-photo"
        />
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <Image
                src={doctorData.avatar}
                roundedCircle
                className="profile-avatar"
              />
            </Col>
            <Col md={6}>
              <h1 className="profile-name">{doctorData.Name}</h1>
              <p className="profile-expertise">{doctorData.EXPERTISE}</p>
            </Col>
            <Col md={3} className="text-center">
              <Button
                variant="primary"
                onClick={() => navigate("/doctoreditprofile")}
              >
                Edit Profile
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="profile-details-card mt-4">
        <Card.Body>
          <Row>
            <Col md={6}>
              <p>
                <strong>Doctor ID:</strong> {doctorData.ID}
              </p>
              <p>
                <strong>Gender:</strong> {doctorData.GENDER}
              </p>
              <p>
                <strong>Email:</strong> {doctorData.EMAIL}
              </p>
              <p>
                <strong>Phone:</strong> {doctorData.PHONE}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>District:</strong> {doctorData.DISTRICT}
              </p>
              <p>
                <strong>Area:</strong> {doctorData.AREA}
              </p>
              <p>
                <strong>Road No.:</strong> {doctorData.ROADNUMBER}
              </p>
              <p>
                <strong>License:</strong> {doctorData.LICENSE}
              </p>
            </Col>
          </Row>
          <Row className="mt-4">
            <Col md={6}>
              <Button
                variant="secondary"
                className="w-100 mb-2"
                onClick={() => navigate("/doctorappointments")}
              >
                Appointments
              </Button>
            </Col>
            <Col md={6}>
              <Button
                variant="secondary"
                className="w-100"
                onClick={() => navigate("/DoctorSurgery")}
              >
                Transaction
              </Button>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default DoctorProfile;
