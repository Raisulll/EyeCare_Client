import React, { useState } from "react";
import "../css/DoctorAppointment.css";

// Appointment Component
const Appointments = ({ appointments }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

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
              <th onClick={() => requestSort("date")}>Date</th>
              <th onClick={() => requestSort("time")}>Time</th>
              <th onClick={() => requestSort("status")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedAppointments.map((appointment, index) => (
              <tr key={index}>
                <td>{appointment.patientName}</td>
                <td>{appointment.date}</td>
                <td>{appointment.time}</td>
                <td className={`status-${appointment.status.toLowerCase()}`}>{appointment.status}</td>
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
  const dummyAppointments = [
    {
      patientName: "Alice Smith",
      date: "2024-07-01",
      time: "10:00 AM",
      status: "Completed",
    },
    {
      patientName: "Bob Johnson",
      date: "2024-07-10",
      time: "02:00 PM",
      status: "Upcoming",
    },
    {
      patientName: "Charlie Brown",
      date: "2024-06-20",
      time: "11:00 AM",
      status: "Completed",
    },
    {
      patientName: "David Wilson",
      date: "2024-07-15",
      time: "09:00 AM",
      status: "Upcoming",
    },
    {
      patientName: "Eve Davis",
      date: "2024-06-25",
      time: "03:00 PM",
      status: "Completed",
    },
  ];

  return (
    <div className="App">
      <Appointments appointments={dummyAppointments} />
    </div>
  );
};

export default App;
