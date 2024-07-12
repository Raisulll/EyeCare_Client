import React, { useEffect, useState } from "react";

// Appointment Component
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/senddoctorappointments"
        );
        const data = await response.json();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    fetchAppointments();
  }, []);

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

  return (
    <div className="appointments-container">
      <h2 onClick={toggleTableVisibility} className="toggle-bar">
        Appointments {isTableVisible ? "▲" : "▼"}
      </h2>
      {isTableVisible && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("patientName")}>Patient Name</th>
              <th onClick={() => requestSort("appointmentDate")}>Date</th>
              <th onClick={() => requestSort("appointmentTime")}>Time</th>
              <th onClick={() => requestSort("appointmentStatus")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.PATIENT_NAME}</td>
                <td>{appointment.APPOINTMENT_DATE}</td>
                <td>{appointment.APPOINTMENT_TIME}</td>
                <td
                  className={`status-${appointment.APPOINTMENT_STATUS.toLowerCase()}`}
                >
                  {appointment.APPOINTMENT_STATUS}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

// Main App Component
const App = () => {
  return (
    <div className="App">
      <Appointments />
    </div>
  );
};

export default App;
