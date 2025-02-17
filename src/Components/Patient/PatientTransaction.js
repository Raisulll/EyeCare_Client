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
    // Dummy data for transactions
    const dummyTransactions = [
      {
        PAYMENT_TO: "Clinic A",
        TRANSACTION_FOR: "Consultation",
        TRANSACTION_DATE: "2025-02-10T00:00:00Z",
        TRANSACTION_AMOUNT: "$100",
      },
      {
        PAYMENT_TO: "Clinic B",
        TRANSACTION_FOR: "Medication",
        TRANSACTION_DATE: "2025-02-15T00:00:00Z",
        TRANSACTION_AMOUNT: "$50",
      },
    ];

    setTransactions(dummyTransactions);
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
