import React, { useEffect, useState } from "react";
import {
  Card,
  Col,
  Container,
  Row,
  Spinner,
  Button,
  Form,
} from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

const ViewPrescription = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const appointmentId = params.get("appointmentId");

  const [prescription, setPrescription] = useState(null);
  const [surgeryDate, setSurgeryDate] = useState("");
  const [surgeryTime, setSurgeryTime] = useState("");

  useEffect(() => {
    const fetchPrescription = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/prescriptionforpatient?appointmentId=${appointmentId}`
        );
        const data = await response.json();
        setPrescription(data);
        console.log(data);
      } catch (error) {
        console.error("Error fetching prescription:", error);
      }
    };
    fetchPrescription();
  }, [appointmentId]);

  const scheduleSurgery = () => {
    const scheduleData = {
      surgeryname: prescription.SURGERY,
      appointmentId: appointmentId,
      surgeryDate: surgeryDate,
      surgeryTime: surgeryTime,
      surgerystatus: "Scheduled",
    };

    fetch(`http://localhost:5000/sets/surgery`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(scheduleData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Surgery scheduled:", data);
        // Navigate or show a confirmation to the user
        navigate(`/surgeryconfirmation?appointmentId=${appointmentId}`);
      })
      .catch((error) => {
        console.error("Error scheduling surgery:", error);
      });
  };

  if (!prescription) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "80vh" }}
      >
        <Spinner animation="border" variant="primary" />
        <span className="ms-2">Loading Prescription...</span>
      </Container>
    );
  }

  return (
    <div className="mainpage">
      <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
        <Row className="w-100 justify-content-center">
          <Col md={8} lg={6}>
            <Card className="cardcolor shadow-lg p-4">
              <Card.Body>
                <Card.Title className="text-center mb-4">
                  <h3>Prescription Details</h3>
                </Card.Title>
                <div>
                  <p>
                    <strong>Doctor's Name:</strong> {prescription.DOCTOR_NAME}
                  </p>
                  <p>
                    <strong>Appointment Date:</strong>{" "}
                    {new Date(prescription.APPOINTMENT_DATE).toLocaleDateString(
                      "en-IN",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                  <p>
                    <strong>Patient's Issue:</strong>{" "}
                    {prescription.PATIENT_ISSUE}
                  </p>
                  <p>
                    <strong>Medicine Prescribed:</strong>{" "}
                    {prescription.MEDICINE}
                  </p>
                  {prescription.GLASS && (
                    <p>
                      <strong>Glasses Required:</strong> {prescription.GLASS}
                    </p>
                  )}
                  {prescription.SURGERY && prescription.SURGERY !== "No" && (
                    <>
                      <p>
                        <strong>Surgery Required:</strong>{" "}
                        {prescription.SURGERY}
                      </p>

                      {/* Date and Time Inputs for Surgery */}
                      <Form>
                        <Form.Group
                          controlId="formSurgeryDate"
                          className="mb-3"
                        >
                          <Form.Label>
                            <strong>Select Surgery Date</strong>
                          </Form.Label>
                          <Form.Control
                            type="date"
                            value={surgeryDate}
                            onChange={(e) => setSurgeryDate(e.target.value)}
                          />
                        </Form.Group>

                        <Form.Group
                          controlId="formSurgeryTime"
                          className="mb-3"
                        >
                          <Form.Label>
                            <strong>Select Surgery Time</strong>
                          </Form.Label>
                          <Form.Control
                            type="time"
                            value={surgeryTime}
                            onChange={(e) => setSurgeryTime(e.target.value)}
                          />
                        </Form.Group>

                        <Button
                          variant="danger"
                          onClick={scheduleSurgery}
                          disabled={!surgeryDate || !surgeryTime} // Disable if date or time is not selected
                        >
                          Schedule Surgery
                        </Button>
                      </Form>
                    </>
                  )}
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default ViewPrescription;
