import React, { useEffect, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";

const HospitalProfile = () => {
  const navigate = useNavigate();
  const [hospitalData, setHospitalData] = useState([]);
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  
  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    // fetch hospital data from the server
    const fetchHospitalData = async () => {
      try {
        const hospital = await fetch(
          `http://localhost:5000/gets/hospitaldata?hospitalid=${localdata.HospitalId}`
        );
        const temp = await hospital.json();
        setHospitalData(temp);
        setImagePreview(temp.HOSPITAL_IMAGE);
        setFullName(temp.HOSPITAL_NAME);
        setEmail(temp.HOSPITAL_MAIL);
        setPhone(temp.HOSPITAL_PHONE);
        setDistrict(temp.HOSPITAL_DISTRICT);
        setArea(temp.HOSPITAL_AREA);
        setRoadNumber(temp.HOSPITAL_ROADNUMBER);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchHospitalData();
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
  const SeeMoreSttaf = () => {
    navigate("/staffpage");
  };

  const dummySchedule = [
    { id: 1, patientName: "Alice", appointmentTime: "10:00 am" },
    { id: 2, patientName: "Bob", appointmentTime: "11:00 am" },
    { id: 3, patientName: "Charlie", appointmentTime: "1:00 pm" },
    { id: 4, patientName: "Eve", appointmentTime: "2:00 pm" },
  ];

  const dummyStaffList = [
    { id: 1, staffName: "Dr. Smith", role: "Surgeon", salary: "100,000" },
    { id: 2, staffName: "Nurse Nancy", role: "Nurse", salary: "50,000" },
    { id: 3, staffName: "Dr. Brown", role: "Pediatrician", salary: "80,000" },
    { id: 4, staffName: "Admin Alex", role: "Administrator", salary: "60,000" },
  ];

  return (
    <div className="profile-container">
      <div className="profile-cover">
        <div className="cover-buttons">
          {/* Add any additional buttons here */}
        </div>
        <img
          src={`https://www.shutterstock.com/image-photo/medical-coverage-insurance-concept-hands-260nw-1450246616.jpg`}
          alt="Cover"
          className="cover-photo"
        />
        <div className="profile-header">
          <img
            src={`https://avatar.iran.liara.run/public/boy`}
            alt={`${hospitalData.Name}'s avatar`}
            className="profile-avatar"
          />
          <div className="header-text">
            <h1 className="profile-name">{hospitalData.HOSPITAL_NAME}</h1>
            <button
              className="btn edit-btn"
              onClick={() => navigate("/editprofile")}
            >
              Edit Profile
            </button>
          </div>
        </div>
      </div>
      <div className="profile-details">
        <p>
          <strong>MANAGER_ID : </strong> <span>{hospitalData.HOSPITAL_ID}</span>
        </p>
        <p>
          <strong>EMAIL : </strong> <span>{hospitalData.HOSPITAL_MAIL}</span>
        </p>
        <p>
          <strong>PHONE : </strong> <span>{hospitalData.HOSPITAL_PHONE}</span>
        </p>
        <p>
          <strong>DISTRICT;: </strong>{" "}
          <span>{hospitalData.HOSPITAL_DISTRICT}</span>
        </p>
        <p>
          <strong>AREA : </strong> <span>{hospitalData.HOSPITAL_AREA}</span>
        </p>
        <p>
          <strong>ROAD NO : </strong>{" "}
          <span>{hospitalData.HOSPITAL_ROADNUMBER}</span>
        </p>
      </div>
      <div>
        <Row className="mt-4">
          <Col md={6}>
            <Button
              variant="secondary"
              className="w-100 mb-2"
              onClick={() => navigate("/hospitalschedule")}
            >
              Patient Schedule
            </Button>
          </Col>
          <Col md={6}>
            <Button
              variant="secondary"
              className="w-100"
              onClick={() => navigate("/doctortransaction")}
            >
              Surgery Schedule
            </Button>
          </Col>
        </Row>
      </div>
    </div>
  );
};

export default HospitalProfile;
