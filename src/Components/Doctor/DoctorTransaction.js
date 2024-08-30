import React, { useEffect, useState } from "react";
import "../../App.css";

// DoctorTransaction Component
const DoctorTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);

  // Fetch doctorId from localStorage
  const doctorData = JSON.parse(localStorage.getItem("user"));
  const doctorId = doctorData?.doctorId;
  console.log(doctorId);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/senddoctortransactions?doctorId=${doctorId}`
        );
        const data = await response.json();
        console.log(data);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    if (doctorId) {
      fetchTransactions();
    }
  }, [doctorId]);

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
              <th>Patient Name</th>
              <th>Appointment Date</th>
              <th>Payment Ammount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.PATIENT_NAME}</td>
                <td>
                  {new Date(transaction.TRANSACTION_DATE).toLocaleDateString()}
                </td>
                <td>{transaction.TRANSACTION_AMOUNT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default DoctorTransaction;
