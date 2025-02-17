import React, { useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation, useNavigate } from "react-router-dom";
import "../../App.css";

function Prescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appointmentId = params.get("appointmentId");

  const [doctorName, setDoctorName] = useState("Dr. John Doe");
  const [patientName, setPatientName] = useState("Jane Doe");
  const [patientAge, setPatientAge] = useState("30 years");
  const [appointmentDate, setAppointmentDate] = useState("2025-02-15");
  const [patientIssue, setPatientIssue] = useState("");
  const [medicine, setMedicine] = useState("");
  const [glassNeeded, setGlassNeeded] = useState(false);
  const [glassDetails, setGlassDetails] = useState("");
  const [surgeryNeeded, setSurgeryNeeded] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      appointmentId,
      patientIssue,
      medicine,
      glassDetails: glassNeeded ? glassDetails : null,
      surgeryDetails: surgeryNeeded ? surgeryDetails : null,
    };

    console.log("Prescription data saved successfully:", data);
    navigate("/doctorprofile");
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor shadow-lg p-4">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                <h3>Create Prescription</h3>
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formDoctorName">
                  <Form.Label className="font-weight-bold">
                    Doctor's Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={doctorName}
                    readOnly
                    className="p-2"
                    style={{ backgroundColor: "#f8f9fa", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientName">
                  <Form.Label className="font-weight-bold">
                    Patient's Name
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={patientName}
                    readOnly
                    className="p-2"
                    style={{ backgroundColor: "#f8f9fa", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientAge">
                  <Form.Label className="font-weight-bold">
                    Patient's Age
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={patientAge}
                    readOnly
                    className="p-2"
                    style={{ backgroundColor: "#f8f9fa", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAppointmentDate">
                  <Form.Label className="font-weight-bold">
                    Appointment Date
                  </Form.Label>
                  <Form.Control
                    type="text"
                    value={appointmentDate}
                    readOnly
                    className="p-2"
                    style={{ backgroundColor: "#f8f9fa", border: "none" }}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientIssue">
                  <Form.Label className="font-weight-bold">
                    Patient Issue
                  </Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter patient issue"
                    value={patientIssue}
                    onChange={(e) => setPatientIssue(e.target.value)}
                    className="p-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMedicine">
                  <Form.Label className="font-weight-bold">Medicine</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter prescribed medicine"
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                    className="p-2"
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGlassNeeded">
                  <Form.Check
                    type="checkbox"
                    label="Glasses Needed?"
                    checked={glassNeeded}
                    onChange={(e) => setGlassNeeded(e.target.checked)}
                    className="mb-2"
                  />
                </Form.Group>

                {glassNeeded && (
                  <Form.Group className="mb-3" controlId="formGlassDetails">
                    <Form.Label className="font-weight-bold">
                      Glass Details
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter glass details"
                      value={glassDetails}
                      onChange={(e) => setGlassDetails(e.target.value)}
                      className="p-2"
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formSurgeryNeeded">
                  <Form.Check
                    type="checkbox"
                    label="Surgery Needed?"
                    checked={surgeryNeeded}
                    onChange={(e) => setSurgeryNeeded(e.target.checked)}
                    className="mb-2"
                  />
                </Form.Group>

                {surgeryNeeded && (
                  <Form.Group className="mb-3" controlId="formSurgeryDetails">
                    <Form.Label className="font-weight-bold">
                      Surgery Details
                    </Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter surgery details"
                      value={surgeryDetails}
                      onChange={(e) => setSurgeryDetails(e.target.value)}
                      className="p-2"
                    />
                  </Form.Group>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100 p-2"
                  style={{ backgroundColor: "#007bff", border: "none" }}
                >
                  Save Prescription
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Prescription;
