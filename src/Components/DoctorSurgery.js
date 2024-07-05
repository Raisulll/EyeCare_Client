import React, { useState } from "react";
import "../css/DoctorSurgery.css"; // Ensure this path is correct

// Surgery Component
const Surgery = ({ surgeries }) => {
  const [sortConfig, setSortConfig] = useState(null);
  const [isTableVisible, setIsTableVisible] = useState(true);

  const sortedSurgeries = [...surgeries].sort((a, b) => {
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
    <div className="surgeries-container">
      <h2 onClick={toggleTableVisibility} className="toggle-bar">
        Surgery {isTableVisible ? "▲" : "▼"}
      </h2>
      {isTableVisible && (
        <table className="surgeries-table">
          <thead>
            <tr>
              <th onClick={() => requestSort("patientName")}>Patient Name</th>
              <th onClick={() => requestSort("surgeryDate")}>Date</th>
              <th onClick={() => requestSort("surgeryTime")}>Time</th>
              <th onClick={() => requestSort("surgeryType")}>Surgery Type</th>
              <th onClick={() => requestSort("hospital")}>Hospital</th>
              <th onClick={() => requestSort("status")}>Status</th>
            </tr>
          </thead>
          <tbody>
            {sortedSurgeries.map((surgery, index) => (
              <tr key={index}>
                <td>{surgery.patientName}</td>
                <td>{surgery.surgeryDate}</td>
                <td>{surgery.surgeryTime}</td>
                <td>{surgery.surgeryType}</td>
                <td>{surgery.hospital}</td>
                <td className={`status-${surgery.status.toLowerCase()}`}>{surgery.status}</td>
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
  const dummySurgeries = [
    {
      patientName: "Alice Smith",
      surgeryDate: "2024-07-01",
      surgeryTime: "10:00 AM",
      surgeryType: "Appendectomy",
      hospital: "Eye Hospital",
      status: "Completed",
    },
    {
      patientName: "Bob Johnson",
      surgeryDate: "2024-07-10",
      surgeryTime: "02:00 PM",
      surgeryType: "Hip Replacement",
      hospital: "Harun Eye Foundation",
      status: "Upcoming",
    },
    {
      patientName: "Charlie Brown",
      surgeryDate: "2024-06-20",
      surgeryTime: "11:00 AM",
      surgeryType: "Knee Surgery",
      hospital: "Eye Hospital",
      status: "Completed",
    },
    {
      patientName: "David Wilson",
      surgeryDate: "2024-07-15",
      surgeryTime: "09:00 AM",
      surgeryType: "Cardiac Bypass",
      hospital: "Harun Eye Foundation",
      status: "Upcoming",
    },
    {
      patientName: "Eve Davis",
      surgeryDate: "2024-06-25",
      surgeryTime: "03:00 PM",
      surgeryType: "Cataract Surgery",
      hospital: "Eye Hospital",
      status: "Completed",
    },
  ];

  return (
    <div className="App">
      <Surgery surgeries={dummySurgeries} />
    </div>
  );
};

export default App;
