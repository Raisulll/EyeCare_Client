import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

  // Fetch doctorId from localStorage
  const doctorData = JSON.parse(localStorage.getItem("user"));
  const doctorId = doctorData?.doctorId;
  console.log(doctorId);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/senddoctorappointments?doctorId=${doctorId}`
        );
        const data = await response.json();
        console.log(data);
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (doctorId) {
      fetchAppointments();
    }
  }, [doctorId]);

  const sortedAppointments = [...appointments].sort((a, b) => {
    if (!sortConfig) return 0;
    if (a[sortConfig.key] < b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? -1 : 1;
    }
    if (a[sortConfig.key] > b[sortConfig.key]) {
      return sortConfig.direction === "ascending" ? 1 : -1;
    }
    return 0;
  });

  const requestSort = (key) => {
    let direction = "ascending";
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === "ascending"
    ) {
      direction = "descending";
    }
    setSortConfig({ key, direction });
  };

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };

  const handleAddPrescription = (appointmentId) => {
    navigate(`/prescription/?appointmentId=${appointmentId}`);
  };

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__title">Appointments</div>
        {isTableVisible && (
          <>
            <div className="card__header">
              <div className="header__item">Patient Name</div>
              <div className="header__item">Date</div>
              <div className="header__item">Time</div>
              <div className="header__item">Status</div>
              <div className="header__item">Add Prescription</div>
            </div>
            <div className="card__data">
              <div className="card__right">
                {sortedAppointments.map((appointment, index) => (
                  <div key={index} className="item">
                    {appointment.PATIENT_NAME}
                  </div>
                ))}
              </div>
              <div className="card__right">
                {sortedAppointments.map((appointment, index) => (
                  <div key={index} className="item">
                    {new Date(
                      appointment.APPOINTMENT_DATE
                    ).toLocaleDateString()}
                  </div>
                ))}
              </div>
              <div className="card__center">
                {sortedAppointments.map((appointment, index) => (
                  <div key={index} className="item">
                    {appointment.APPOINTMENT_TIME}
                  </div>
                ))}
              </div>
              <div className="card__left">
                {sortedAppointments.map((appointment, index) => (
                  <div
                    key={index}
                    className={`item status-${appointment.APPOINTMENT_STATUS}`}
                  >
                    {appointment.APPOINTMENT_STATUS}
                  </div>
                ))}
              </div>
              <div className="card__left">
                {sortedAppointments.map((appointment, index) => (
                  <div key={index} className="item">
                    <button
                      className="btn"
                      onClick={() =>
                        handleAddPrescription(appointment.APPOINTMENT_ID)
                      }
                    >
                      Add
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Full height of the viewport */
  background-color: #f4f4f9; /* Light background for contrast */

  .card {
    width: 100%;
    max-width: 1200px;
    background: rgb(44, 44, 44);
    font-family: "Courier New", Courier, monospace;
    border-radius: 12px;
    overflow: hidden;
  }

  .card__title {
    color: white;
    font-weight: bold;
    padding: 10px;
    border-bottom: 1px solid rgb(167, 159, 159);
    font-size: 1.2rem;
    text-align: center;
    cursor: pointer;
  }

  .card__header {
    display: flex;
    justify-content: space-between;
    background: #333;
    color: white;
    padding: 10px;
  }

  .header__item {
    width: 33%;
    text-align: center;
    font-weight: bold;
  }

  .card__data {
    display: flex;
    justify-content: space-between;
    border: 1px solid rgb(203, 203, 203);
  }

  .card__right,
  .card__center,
  .card__left {
    width: 33%;
  }

  .item {
    padding: 10px;
    background-color: white;
    text-align: center;
  }

  .item:nth-child(even) {
    background: rgb(234, 235, 234);
  }

  .card__right .item {
    padding-left: 1em;
  }

  .card__left .item {
    padding-right: 1em;
  }
  
  .btn{
    all: unset;  
  }
  .btn:hover{
    cursor: pointer;
  }
`;

export default Appointments;
