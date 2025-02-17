import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Spinner,
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
    // Dummy data for prescription
    const dummyPrescription = {
      DOCTOR_NAME: "Dr. John Doe",
      APPOINTMENT_DATE: "2025-02-15T00:00:00Z",
      PATIENT_ISSUE: "Eye Infection",
      MEDICINE: "Antibiotic Eye Drops",
      GLASS: "Yes",
      SURGERY: "Cataract Surgery",
    };

    setPrescription(dummyPrescription);
  }, [appointmentId]);

  const scheduleSurgery = () => {
    const scheduleData = {
      surgeryname: prescription.SURGERY,
      appointmentId: appointmentId,
      surgeryDate: surgeryDate,
      surgeryTime: surgeryTime,
      surgerystatus: "Scheduled",
    };

    console.log("Surgery scheduled:", scheduleData);
    // Navigate or show a confirmation to the user
    navigate(`/surgeryconfirmation?appointmentId=${appointmentId}`);
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
