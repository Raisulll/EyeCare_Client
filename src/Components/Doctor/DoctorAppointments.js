import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Image, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";


// Appointment Component
const Appointments = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

  // Fetch doctorId from localStorage
  const doctorData = JSON.parse(localStorage.getItem("user")); // 'user' stores doctor data in localStorage
  const doctorId = doctorData?.doctorId; // Extract doctorId
  console.log(doctorId);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/senddoctorappointments?doctorId=${doctorId}`
        );
        const data = await response.json();
        console.log(data);
        setAppointments(data); // Set the fetched appointment data
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (doctorId) {
      fetchAppointments(); // Fetch data when doctorId is available
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
    console.log("key", key);
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
    // Handle the logic to add a prescription for the appointment
    console.log(`Add prescription for appointment ID: ${appointmentId}`);
    //navigate to /prescritption page with this appointmentId 
    navigate(`/prescription/?appointmentId=${appointmentId}`);
  };

  return (
    <div className="appointments-container">
      <h2 onClick={toggleTableVisibility} className="toggle-bar">
        Appointments {isTableVisible ? "▲" : "▼"}
      </h2>
      {isTableVisible && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("PATIENT_NAME")}>Patient Name</th>
              <th onClick={() => requestSort("APPOINTMENT_DATE")}>Date</th>
              <th onClick={() => requestSort("APPOINTMENT_TIME")}>Time</th>
              <th onClick={() => requestSort("APPOINTMENT_STATUS")}>Status</th>
              <th>Add Prescription</th> {/* Add the Prescription column header */}
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.PATIENT_NAME}</td>
                <td>
                  {new Date(appointment.APPOINTMENT_DATE).toLocaleDateString()}
                </td>
                <td>{appointment.APPOINTMENT_TIME}</td>
                <td className={`status-${appointment.APPOINTMENT_STATUS}`}>
                  {appointment.APPOINTMENT_STATUS}
                </td>
                <td>
                  <Button
                    variant="secondary"
                    onClick={() => handleAddPrescription(appointment.APPOINTMENT_ID)}
                  >Add</Button>
                </td>{" "}
                {/* Add the button in the Prescription column */}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Appointments;
