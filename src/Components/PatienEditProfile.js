import React, { useEffect, useState } from "react";
import { Button, Container, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    patientName: "",
    patientEmail: "",
    patientPhone: "",
    patientDob: "",
    patientDistrict: "",
    patientArea: "",
    patientRoadNum: "",
    patientGender: "",
    patientPassword: "",
    profilePhoto: null,
  });

  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setFormData({
        patientName: user.patientName || "",
        patientEmail: user.patientEmail || "",
        patientPhone: user.patientPhone || "",
        patientDob: user.patientDob.split('T')[0] || "",
        patientDistrict: user.patientDistrict || "",
        patientArea: user.patientArea || "",
        patientRoadNum: user.patientRoadNum || "",
        patientGender: user.patientGender || "",
        patientPassword: "", // Password field for updating
        profilePhoto: null,
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

  const handleFileChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      profilePhoto: e.target.files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });

      const response = await fetch("http://localhost:5000/PatientEdit/patientprofile", {
        method: "POST",
        body: formDataToSend,
      });

      if (response.ok) {
        alert("Profile updated successfully!");
        const updatedUser = {
          patientName: formData.patientName,
          patientEmail: formData.patientEmail,
          patientPhone: formData.patientPhone,
          patientDob: formData.patientDob,
          patientDistrict: formData.patientDistrict,
          patientArea: formData.patientArea,
          patientRoadNum: formData.patientRoadNum,
          patientGender: formData.patientGender,
        };
        localStorage.setItem("user", JSON.stringify(updatedUser));
        navigate("/patientprofile");
      } else {
        const responseData = await response.json();
        throw new Error(responseData.error || "Failed to update profile");
      }
    } catch (err) {
      setError(err.message || "An unexpected error occurred.");
      console.error("Error during form submission:", err);
    }
  };

  return (
    <Container className="mt-4">
      <h2>Edit Profile</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formPatientName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter name"
            name="patientName"
            value={formData.patientName}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            name="patientEmail"
            value={formData.patientEmail}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientPhone">
          <Form.Label>Phone</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter phone number"
            name="patientPhone"
            value={formData.patientPhone}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientDob">
          <Form.Label>Date of Birth</Form.Label>
          <Form.Control
            type="date"
            name="patientDob"
            value={formData.patientDob}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientDistrict">
          <Form.Label>District</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter district"
            name="patientDistrict"
            value={formData.patientDistrict}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientArea">
          <Form.Label>Area</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter area"
            name="patientArea"
            value={formData.patientArea}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientRoadNum">
          <Form.Label>Road Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter road number"
            name="patientRoadNum"
            value={formData.patientRoadNum}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientGender">
          <Form.Label>Gender</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter gender"
            name="patientGender"
            value={formData.patientGender}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formPatientPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter new password"
            name="patientPassword"
            value={formData.patientPassword}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formProfilePhoto">
          <Form.Label>Upload Profile Picture</Form.Label>
          <Form.Control
            type="file"
            name="profilePhoto"
            onChange={handleFileChange}
          />
        </Form.Group>
        {error && <div style={{ color: "red" }}>{error}</div>}
        {msg && <div style={{ color: "green" }}>{msg}</div>}
        <Button variant="primary" type="submit">
          Save Changes
        </Button>
      </Form>
    </Container>
  );
};

export default EditProfile;
