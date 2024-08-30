import React, { useEffect, useState } from "react";
import "../../App.css";

const HospitalSchedule = () => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [schedul, setSchedul] = useState([]);

  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  const hospitalId = userdata?.HospitalId;
  console.log(hospitalId);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch(`http://localhost:5000/gets/hospitalSchedule?hospitalid=${hospitalId}`);
        const data = await response.json();
        console.log(data);
        setSchedul(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchSchedule();
  }, [hospitalId]);

  const toggleTableVisibility = () => {
    setIsTableVisible(!isTableVisible);
  };
  return (
    <div className="appointments-container">
      <h2 onClick={toggleTableVisibility} className="toggle-bar">
        Transactions {isTableVisible ? "▲" : "▼"}
      </h2>
      {isTableVisible && (
        <table className="appointments-table">
          <thead>
            <tr>
              <th>Patient</th>
              <th>Doctor</th>
              <th>Appointment Date</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {schedul.map((ss, index) => (
              <tr key={index}>
                <td>{ss.PATIENT_NAME}</td>
                <td>{ss.DOCTOR_NAME}</td>
                <td>{new Date(ss.APPOINTMENT_DATE).toLocaleDateString()}</td>
                <td>{ss.APPOINTMENT_TIME}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default HospitalSchedule;