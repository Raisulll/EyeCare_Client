import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    doctorName: "",
    doctorGender: "",
    doctorEmail: "",
    doctorPhone: "",
    doctorDistrict: "",
    doctorArea: "",
    doctorRoadNum: "",
    doctorLicense: "",
    timeslot: "",
    experience: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        doctorId: user.doctorId,
        doctorName: user.doctorName || "",
        doctorGender: user.doctorGender || "",
        doctorEmail: user.doctorEmail || "",
        doctorPhone: user.doctorPhone || "",
        doctorDistrict: user.doctorDistrict || "",
        doctorArea: user.doctorArea || "",
        doctorRoadNum: user.doctorRoadNum || "",
        doctorLicense: user.doctorLicense || "",
        timeslot: user.timeslot || "",
        experience: user.experience || "",
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `http://localhost:5000/edit/doctorprofile`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Profile updated successfully!");
        //update local storage with new profile data
        localStorage.setItem("user", JSON.stringify(formData));
        navigate("/doctorprofile");
      } else {
        throw new Error("Failed to update profile");
      }
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    }
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
          <Form.Label>Timeslot</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter timeslot"
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
