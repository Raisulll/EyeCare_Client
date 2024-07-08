import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Hospital/HospitalProfile.css'; // Assuming you have a similar CSS file for Hospital Profile

const HospitalProfile = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/schedulepage');
    };
    

  const dummyData = {
    Name: "Mr. John Doe",
    avatar: "https://www.swatflorida.com/images/members/R2_Ryan_Helmes.png",
    coverPhoto: "https://www.shutterstock.com/image-photo/medical-coverage-insurance-concept-hands-260nw-1450246616.jpg",
    ID: "H_001",
    GENDER: "Male",
    EMAIL: "john.doe@gmail.com",
    PHONE: "01234567890",
    DISTRICT: "Dhaka",
    AREA: "Gulshan",
    ROADNUMBER: "20",
    LICENSE: "HPS",
    TIMESLOT: "9:00 am - 5:00 pm",
    ROLE: "Hospital Manager",
    WORKS_IN: "Kurmitola General Hospital"
  };

  const dummySchedule = [
    { id: 1, patientName: 'Alice', appointmentTime: '10:00 am' },
    { id: 2, patientName: 'Bob', appointmentTime: '11:00 am' },
    { id: 3, patientName: 'Charlie', appointmentTime: '1:00 pm' },
    { id: 4, patientName: 'Eve', appointmentTime: '2:00 pm' },
  ];

  const dummyTransaction = [
    { id: 1, patientName: 'Alice', appointmentTime: '10:00 am' },
    { id: 2, patientName: 'Bob', appointmentTime: '11:00 am' },
    { id: 3, patientName: 'Charlie', appointmentTime: '1:00 pm' },
    { id: 4, patientName: 'Eve', appointmentTime: '2:00 pm' },
  ];

  return (
    <div className="profile-container">
      <div className="profile-cover">
        <div className="cover-buttons">
          {/* Add any additional buttons here */}
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
          <strong>MANAGER_ID</strong> <span>{dummyData.ID}</span>
        </p>
        <p>
          <strong>GENDER</strong> <span>{dummyData.GENDER}</span>
        </p>
        <p>
          <strong>EMAIL</strong> <span>{dummyData.EMAIL}</span>
        </p>
        <p>
          <strong>PHONE</strong> <span>{dummyData.PHONE}</span>
        </p>
        <p>
          <strong>DISTRICT</strong> <span>{dummyData.DISTRICT}</span>
        </p>
        <p>
          <strong>AREA</strong> <span>{dummyData.AREA}</span>
        </p>
        <p>
          <strong>ROAD NO.</strong> <span>{dummyData.ROADNUMBER}</span>
        </p>
        <p>
          <strong>LICENSE</strong> <span>{dummyData.LICENSE}</span>
        </p>
        <p>
          <strong>TIMESLOT</strong> <span>{dummyData.TIMESLOT}</span>
        </p>
        <p>
          <strong>ROLE</strong> <span>{dummyData.ROLE}</span>
        </p>
        <p>
          <strong>WORKS_IN</strong> <span>{dummyData.WORKS_IN}</span>
        </p>
      </div>
      
      {/* New Schedule Section */}
      <div className="profile-schedule">
        <h2>Patient Schedule</h2>
        <table className="schedule-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {dummySchedule.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.patientName}</td>
                <td>{schedule.appointmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <button className="btn see-more-btn" onClick={handleClick}>
          See More
        </button>
        
        <button className="btn add-more-btn" onClick={() => navigate("/schedulepage")}>
          Add
        </button>

      </div>
    </div>
  );
};

export default HospitalProfile;
