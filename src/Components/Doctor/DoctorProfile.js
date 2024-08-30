import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState([]);
  const [coverPhoto, setCoverPhoto] = useState(null);
  const [profilePic, setProfilePic] = useState(null);
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // fetch doctor data from the server
    const fetchDoctorData = async () => {
      try {
        const doctor = await fetch(
          `http://localhost:5000/gets/doctordata?doctorid=${localdata.doctorId}`
        );
        const temp = await doctor.json();
        setDoctorData(temp);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorData();
  }, []);

  const handleCoverPhotoChange = (e) => {
    setCoverPhoto(e.target.files[0]);
  };

  const handleProfilePicChange = (e) => {
    setProfilePic(e.target.files[0]);
  };

  return (
    <Container className="profile-container">
      <Card className="profile-card">
        <Card.Img
          variant="top"
          src={
            coverPhoto
              ? URL.createObjectURL(coverPhoto)
              : "pexels-tobiasbjorkli-1887624.jpg"
          }
          className="cover-photo"
        />
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="text-center">
              <label htmlFor="profile-pic-input" className="profile-pic-label">
                {profilePic ? (
                  <Image
                    src={URL.createObjectURL(profilePic)}
                    roundedCircle
                    className="profile-avatar"
                  />
                ) : (
                  <Image
                    src={`https://avatar.iran.liara.run/public/boy`}
                    roundedCircle
                    className="profile-avatar"
                  />
                )}
                <input
                  type="file"
                  id="profile-pic-input"
                  accept="image/*"
                  className="d-none"
                  onChange={handleProfilePicChange}
                />
              </label>
            </Col>
            <Col md={6}>
              <h1 className="profile-name">{doctorData.DOCTOR_NAME}</h1>
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
                <strong>Doctor ID:</strong> {doctorData.DOCTOR_ID}
              </p>
              <p>
                <strong>Gender:</strong> {doctorData.DOCTOR_GENDER}
              </p>
              <p>
                <strong>Email:</strong> {doctorData.DOCTOR_MAIL}
              </p>
              <p>
                <strong>Phone:</strong> {doctorData.DOCTOR_PHONE}
              </p>
            </Col>
            <Col md={6}>
              <p>
                <strong>District:</strong> {doctorData.DOCTOR_DISTRICT}
              </p>
              <p>
                <strong>Area:</strong> {doctorData.DOCTOR_AREA}
              </p>
              <p>
                <strong>Road No.:</strong> {doctorData.DOCTOR_ROADNUMBER}
              </p>
              <p>
                <strong>License:</strong> {doctorData.DOCTOR_LICENSE}
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
                onClick={() => navigate("/doctortransaction")}
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
