import React, { useEffect, useState } from "react";
import "../../App.css";

const PatientTransaction = () => {
  const [isTableVisible, setIsTableVisible] = useState(true);
  const [transactions, setTransactions] = useState([]);

  const userdata = JSON.parse(localStorage.getItem("user"));
  console.log(userdata);
  const patientId = userdata?.PatientId;
  console.log(patientId);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/gets/sendpatienttransactions?patientId=${patientId}`);
        const data = await response.json();
        console.log(data);
        setTransactions(data);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };
    fetchTransactions();
  }, [patientId]);
  
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
              <th>Payment To</th>
              <th>Payment For</th>
              <th>Payment Date</th>
              <th>Payment Amount</th>
            </tr>
          </thead>
          <tbody>
            {transactions.map((transaction, index) => (
              <tr key={index}>
                <td>{transaction.PAYMENT_TO}</td>
                <td>{transaction.TRANSACTION_FOR}</td>
                <td>{new Date(transaction.TRANSACTION_DATE).toLocaleDateString()}</td>
                <td>{transaction.TRANSACTION_AMOUNT}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientTransaction;
