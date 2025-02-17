import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: "Dr. John Doe",
    doctorGender: "Male",
    doctorEmail: "john.doe@example.com",
    doctorPhone: "1234567890",
    doctorDistrict: "District A",
    doctorArea: "Area B",
    doctorRoadNum: "123",
    doctorLicense: "ABC123",
    timeslot: "09:00 AM - 05:00 PM",
    experience: "10 years",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        doctorId: user.doctorId,
        doctorName: user.doctorName || "Dr. John Doe",
        doctorGender: user.doctorGender || "Male",
        doctorEmail: user.doctorEmail || "john.doe@example.com",
        doctorPhone: user.doctorPhone || "1234567890",
        doctorDistrict: user.doctorDistrict || "District A",
        doctorArea: user.doctorArea || "Area B",
        doctorRoadNum: user.doctorRoadNum || "123",
        doctorLicense: user.doctorLicense || "ABC123",
        timeslot: user.timeslot || "09:00 AM - 05:00 PM",
        experience: user.experience || "10 years",
      });
    }
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
    alert("Profile updated successfully!");
    // Update local storage with new profile data
    localStorage.setItem("user", JSON.stringify(formData));
    navigate("/doctorprofile");
  };

  return (
    <Container className="mt-4">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formDoctorName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="doctorName"
            value={formData.doctorName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            name="doctorGender"
            value={formData.doctorGender}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="doctorEmail"
            value={formData.doctorEmail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="doctorPhone"
            value={formData.doctorPhone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorDistrict">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter district"
            name="doctorDistrict"
            value={formData.doctorDistrict}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorArea">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter area"
            name="doctorArea"
            value={formData.doctorArea}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorRoadNum">
          <Form.Label>Road Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter road number"
            name="doctorRoadNum"
            value={formData.doctorRoadNum}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formDoctorLicense">
          <Form.Label>License</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter license"
            name="doctorLicense"
            value={formData.doctorLicense}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formTimeslot">
          <Form.Label>Enter timeslot</Form.Label>
          <Form.Control
            type="text"
            placeholder="timeslot"
            name="timeslot"
            value={formData.timeslot}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formExperience">
          <Form.Label>Experience</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter experience"
            name="experience"
            value={formData.experience}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
