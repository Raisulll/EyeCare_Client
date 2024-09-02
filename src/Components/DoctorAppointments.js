import React, { useEffect, useState } from "react";

// Appointment Component
const Appointments = () => {
  const [appointments, setAppointments] = useState([]);
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

  // Fetch doctorId from localStorage
  const doctorData = JSON.parse(localStorage.getItem('user')); // 'user' stores doctor data in localStorage
  const doctorId = doctorData?.doctorId; // Extract doctorId

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/senddoctorappointments?doctorId=${doctorId}`
        );
        const data = await response.json();
        setAppointments(data); // Set the fetched appointment data
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };

    if (doctorId) {
      fetchAppointments();  // Fetch data when doctorId is available
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
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.PATIENT_NAME}</td>
                <td>{new Date(appointment.APPOINTMENT_DATE).toLocaleDateString()}</td>
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

export default Appointments;
