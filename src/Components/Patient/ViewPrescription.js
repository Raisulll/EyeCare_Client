import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
// import doctorSvg from "./doctor.svg";

const ViewPrescription = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appointmentId = params.get("appointmentId");
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/prescriptionforpatient?appointmentId=${appointmentId}`
        );
        const data = await response.json();
        console.log(data);
        setPrescription(data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [appointmentId]);

  if (!prescription) {
    return <div>Loading...</div>;
  }

  const handleScheduleSurgery = () => {
    // Logic to schedule surgery
    navigate(`/schedulesurgery?appointmentId=${appointmentId}`);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={6}>
          <Card className="mb-3">
            <Card.Body>
              <Card.Title>Prescription Details</Card.Title>
              <p>
                <strong>Date:</strong> {prescription.PRESCRIPTION_DATE}
              </p>
              <p>
                <strong>Issue:</strong> {prescription.PATIENT_ISSUE}
              </p>
              <p>
                <strong>Details:</strong> {prescription.PRESCRIPTION_DETAILS}
              </p>
              <p>
                <strong>Medicine:</strong> {prescription.MEDICINE}
              </p>
              {prescription.GLASS && (
                <p>
                  <strong>Glass:</strong> {prescription.GLASS}
                </p>
              )}
              {prescription.SURGERY !== "No" && (
                <Button variant="danger" onClick={handleScheduleSurgery}>
                  Schedule Surgery
                </Button>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ViewPrescription;
