import React, { useEffect, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../../App.css";

function Prescription() {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const appointmentId = params.get("appointmentId");
  console.log(appointmentId);

  const [doctorName, setDoctorName] = useState("");
  const [patientName, setPatientName] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [patientIssue, setPatientIssue] = useState("");
  const [medicine, setMedicine] = useState("");
  const [glassNeeded, setGlassNeeded] = useState(false);
  const [glassDetails, setGlassDetails] = useState("");
  const [surgeryNeede, setSurgeryNeeded] = useState(false);
  const [surgeryDetails, setSurgeryDetails] = useState("");

  useEffect(() => {
    const fetchAppointmentInfo = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/gets/appointmentinfo?appointmentId=${appointmentId}`
        );
        const data = await response.json();
        console.log(data);
        setDoctorName(data.DOCTOR_NAME);
        setPatientName(data.PATIENT_NAME);
        const date = new Date(data.APPOINTMENT_DATE);
        const options = { year: "numeric", month: "short", day: "numeric" };
        const formattedDate = date.toLocaleDateString("en-IN", options);
        setAppointmentDate(formattedDate);
        data.PATIENT_AGE = data.PATIENT_AGE + " years";
        setPatientAge(data.PATIENT_AGE);
      } catch (error) {
        console.error("Error fetching appointment info:", error);
      }
    };
    fetchAppointmentInfo();
  }, [appointmentId]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      appointmentId,
      patientIssue,
      medicine,
      glassDetails: glassNeeded ? glassDetails : null,
      surgeryDetails: surgeryNeede ? surgeryDetails : null,
    };

    console.log(data);
    const result = await fetch("http://localhost:5000/sets/setprescription", {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (result.status === 200) {
      console.log("Prescription saved successfully");
      navigate("/doctorprofile");
    } else {
      console.log("Failed to save prescription");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center mt-5 mb-5">
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Create Prescription
              </Card.Title>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formDoctorName">
                  <Form.Label>Doctor's Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Dr. John Doe"
                    value={doctorName}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientName">
                  <Form.Label>Patient's Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Jane Doe"
                    value={patientName}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientName">
                  <Form.Label>Patient's Age</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Jane Doe"
                    value={patientAge}
                    readOnly
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formAppointmentDate">
                  <Form.Label>Appointment Date</Form.Label>
                  <Form.Control type="text" value={appointmentDate} readOnly />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPatientIssue">
                  <Form.Label>Patient Issue</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Patient Issue"
                    value={patientIssue}
                    onChange={(e) => setPatientIssue(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formMedicine">
                  <Form.Label>Medicine</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Prescribed Medicine"
                    value={medicine}
                    onChange={(e) => setMedicine(e.target.value)}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formGlassNeeded">
                  <Form.Check
                    type="checkbox"
                    label="Glass Needed?"
                    checked={glassNeeded}
                    onChange={(e) => setGlassNeeded(e.target.checked)}
                  />
                </Form.Group>

                {glassNeeded && (
                  <Form.Group className="mb-3" controlId="formGlassDetails">
                    <Form.Label>Glass Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter glass details"
                      value={glassDetails}
                      onChange={(e) => setGlassDetails(e.target.value)}
                    />
                  </Form.Group>
                )}

                <Form.Group className="mb-3" controlId="formSurgeryNeeded">
                  <Form.Check
                    type="checkbox"
                    label="Surgery Needed?"
                    checked={surgeryNeede}
                    onChange={(e) => setSurgeryNeeded(e.target.checked)}
                  />
                </Form.Group>

                {surgeryNeede && (
                  <Form.Group className="mb-3" controlId="formSurgeryDetails">
                    <Form.Label>Surgery Details</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Surgery details"
                      value={surgeryDetails}
                      onChange={(e) => setSurgeryDetails(e.target.value)}
                    />
                  </Form.Group>
                )}

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  onClick={handleSubmit}
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
