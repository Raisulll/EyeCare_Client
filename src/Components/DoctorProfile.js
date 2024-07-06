import React from "react";
import { useNavigate } from "react-router-dom";
import "../css/DoctorProfile.css";

const DoctorProfile = () => {
  const navigate = useNavigate();

  const dummyData = {
    Name: "Dr.Billal Hossain",
    avatar: "image.png",
    coverPhoto: "pexels-tobiasbjorkli-1887624.jpg",
    ID: "D_001",
    GENDER: "Male",
    EMAIL: "billal.hossain@gmail.com",
    PHONE: "01769093333",
    DISTRICT: "Dhaka",
    AREA: "Mirpur",
    ROADNUMBER: "11",
    LICENSE: "FPS",
    TIMESLOT: "6:30 pm",
    EXPERTISE: "Child Specialist",
    WORKS_IN: "Eye Hospital"
  };

  return (
    <div className="profile-container">
      <div className="profile-cover">
        <div className="cover-buttons">
        
        </div>
        <img src={dummyData.coverPhoto} alt="Cover" className="cover-photo" />
        <div className="profile-header">
          <img
            src={dummyData.avatar}
            alt={`${dummyData.Name}'s avatar`}
            className="profile-avatar"
          />
          <div className="header-text">
            <h1 className="profile-name">{dummyData.Name}</h1>
            <button className="btn edit-btn" onClick={() => navigate("/edit")}>
              Edit Profile
            </button>
            
          </div>
        </div>
      </div>
      <div className="profile-details">
        <p>
          <strong>DOCTOR_ID</strong> <span>{dummyData.ID}</span>
        </p>
        <p>
          <strong>GENDER</strong> <span>{dummyData.GENDER}</span>
        </p>
        <p>
          <strong>EMAIL</strong> <span>{dummyData.EMAIL}</span>
          <button
            className="btn cover-btn"
            onClick={() => navigate("/DoctorAppointment")}
          >
            Schedule Appointment
          </button>
        </p>
        <p>
          <strong>PHONE</strong> <span>{dummyData.PHONE}</span>
        </p>
        <p>
          <strong>DISTRICT</strong> <span>{dummyData.DISTRICT}</span>
          <button
            className="btn cover-btn"
            onClick={() => navigate("/DoctorSurgery")}
          >
            Schedule<br/>Surgery
          </button>
        </p>
        <p>
          <strong>AREA</strong> <span>{dummyData.AREA}</span>
        </p>
        <p>
          <strong>ROADNO.</strong> <span>{dummyData.ROADNUMBER}</span>
        </p>
        <p>
          <strong>LICENSE</strong> <span>{dummyData.LICENSE}</span>
        </p>
        <p>
          <strong>TIMESLOT</strong> <span>{dummyData.TIMESLOT}</span>
        </p>
        <p>
          <strong>EXPERTISE</strong> <span>{dummyData.EXPERTISE}</span>
        </p>
        <p>
          <strong>WORKS_IN</strong> <span>{dummyData.WORKS_IN}</span>
        </p>
      </div>
    </div>
  );
};

export default DoctorProfile;
