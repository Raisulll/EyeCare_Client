import React, { useEffect, useState } from "react";
import styled from "styled-components";
import "../../App.css";

// DoctorTransaction Component
const DoctorTransaction = () => {
  const [transactions, setTransactions] = useState([]);
  const [isTableVisible, setIsTableVisible] = useState(true);

  useEffect(() => {
    // Dummy data for transactions
    const dummyTransactions = [
      {
        PATIENT_NAME: "John Doe",
        TRANSACTION_DATE: "2025-02-10T00:00:00Z",
        TRANSACTION_AMOUNT: "$100",
      },
      {
        PATIENT_NAME: "Jane Smith",
        TRANSACTION_DATE: "2025-02-15T00:00:00Z",
        TRANSACTION_AMOUNT: "$150",
      },
      {
        PATIENT_NAME: "Emily Johnson",
        TRANSACTION_DATE: "2025-02-20T00:00:00Z",
        TRANSACTION_AMOUNT: "$200",
      },
    ];

    setTransactions(dummyTransactions);
  }, []);

  return (
    <StyledWrapper>
      <div className="card">
        <div className="card__title">Transactions History</div>
        {isTableVisible && (
          <>
            {/* Table Headers */}
            <div className="card__header">
              <div className="header__item">Patient Name</div>
              <div className="header__item">Appointment Date</div>
              <div className="header__item">Payment Amount</div>
            </div>

            {/* Table Data */}
            <div className="card__data">
              <div className="card__right">
                {transactions.map((transaction, index) => (
                  <div key={index} className="item">
                    {transaction.PATIENT_NAME}
                  </div>
                ))}
              </div>
              <div className="card__center">
                {transactions.map((transaction, index) => (
                  <div key={index} className="item">
                    {new Date(
                      transaction.TRANSACTION_DATE
                    ).toLocaleDateString()}
                  </div>
                ))}
              </div>
              <div className="card__left">
                {transactions.map((transaction, index) => (
                  <div key={index} className="item">
                    {transaction.TRANSACTION_AMOUNT}
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
    max-width: 800px;
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
`;

export default DoctorTransaction;
