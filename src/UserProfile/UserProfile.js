import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "../../App.css";

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [prevAppointments, setPrevAppointments] = useState([]);
  const [times, setTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const localdata = JSON.parse(localStorage.getItem("user"));
  const userId = localdata.PatientId;
  const [appointment, setAppointment] = useState({
    doctor: "",
    time: "",
    date: "",
    patientId: parseInt(userId),
  });
  const [doctortimes, setDoctorTimes] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatientDaata = async () => {
      try {
        console.log(localdata);
        const storedUser = await fetch(
          `http://localhost:5000/gets/patientdata?patientid=${localdata.PatientId}`
        );
        const temp = await storedUser.json();
        setUser(temp);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchPatientDaata();

    // Fetch upcomming appointments for the user
    console.log(localdata.patientId);
    fetchUpcommingAppointments(localdata.patientId);

    fetchPreviousAppointments(localdata.patientId);
    // Fetch doctors from the API
    fetchDoctors();
  }, []);

  const fetchDoctors = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctors");
      if (!response.ok) throw new Error("Failed to fetch doctors");
      const data = await response.json();
      const formattedDoctors = data.map((doctor) => ({
        id: doctor.DOCTOR_ID,
        name: doctor.DOCTOR_NAME,
        experience: doctor.DOCTOR_SPECIALITY,
        payment: doctor.DOCTOR_PAYMENT,
      }));
      console.log(formattedDoctors);
      setDoctors(formattedDoctors);
    } catch (error) {
      console.error("Error fetching doctors:", error);
      alert(error.message);
    }
  };

  // Fetch upcomming appointments for a specific patient
  const fetchUpcommingAppointments = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/upcommingappointments?patientId=${localdata.PatientId}`
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      console.log(data);
      setAppointments(data.length ? data : null); // Handle null if no appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert(error.message);
    }
  };

  // Fetch previous appointments for a specific patient
  const fetchPreviousAppointments = async (patientId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/previousappointments?patientId=${localdata.PatientId}`
      );
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      console.log(data);
      setPrevAppointments(data.length ? data : null); // Handle null if no appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
      alert(error.message);
    }
  };

  // Fetch time slots for a specific doctor
  const fetchTimeSlots = async (doctorId) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/doctorstime?doctorid=${doctorId}`
      );
      if (!response.ok) throw new Error("Failed to fetch time slots");

      const data = await response.json();
      console.log("Time slots data:", data);

      if (!data || !data[0] || !data[0].DOCTOR_TIMESLOT) {
        throw new Error("Invalid data structure received from API");
      }
      const timeRange = data[0].DOCTOR_TIMESLOT;
      const timeSlots = generateTimeSlots(timeRange);
      setDoctorTimes(timeSlots);
    } catch (error) {
      console.error(
        `Error fetching time slots for doctor ID: ${doctorId}`,
        error
      );
      alert(error.message);
    }
  };

  const generateTimeSlots = (timeRange) => {
    console.log("Time range:", timeRange);

    if (
      !timeRange ||
      typeof timeRange !== "string" ||
      !timeRange.includes("-")
    ) {
      console.error("Invalid time range provided:", timeRange);
      return [];
    }

    const slots = [];
    let [startTime, endTime] = timeRange.split("-").map((time) => time.trim());

    if (!startTime || !endTime) {
      console.error("Invalid start or end time:", startTime, endTime);
      return [];
    }

    console.log("Converted time range:", startTime, endTime);
    console.log("Type of startTime:", typeof startTime);
    let newStartTime = parseInt(startTime);
    let newEndTime = parseInt(endTime);
    let turn = 1;

    while (newStartTime < newEndTime) {
      if (turn === 1) {
        slots.push(
          `${newStartTime.toString()}:00 PM to ${newStartTime.toString()}:30 PM`
        );
        turn = 2;
      } else {
        slots.push(
          `${newStartTime.toString()}:30 PM to ${(
            newStartTime + 1
          ).toString()}:00 PM`
        );
        turn = 1;
        newStartTime++;
      }
    }

    console.log("Generated slots:", slots);
    return slots;
  };

  const handleShowModal = (doctorId) => {
    console.log("Closing modal...", userId);
    console.log("Doctor ID:", doctorId);

    const selectedDoc = doctors.find((doc) => doc.id === doctorId);

    setSelectedDoctor(doctorId);
    setAppointment((prev) => ({
      ...prev,
      doctor: doctorId,
      patientId: userId,
      payment: selectedDoc ? selectedDoc.payment : "",
    }));

    fetchTimeSlots(doctorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor("");
    // setAppointment({ doctor: "", time: "", date: "",patientId:userId });
    setTimes([]);
  };

  const handleBookAppointment = async () => {
    const patientId = localdata.PatientId;
    appointment.patientId = patientId;
    // console.log("User ID:", userId);
    console.log("Appointment", appointment);
    //push patient id to appointment object
    // setAppointment((prev) => ({ ...prev, patientId: patientId }));
    try {
      const response = await fetch(
        "http://localhost:5000/api/appointmentsdata",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ appointment }),
        }
      );
      console.log("Appointment booking response:", response);
      if (!response.ok) throw new Error("Failed to book appointment");

      alert("Appointment successfully booked!");
      fetchUpcommingAppointments(patientId);
      handleCloseModal();
    } catch (error) {
      console.error("Error booking appointment:", error);
      alert(error.message);
    }
  };

  const findDoctorName = (doctorId) => {
    const doctor = doctors.find((doc) => doc.id === doctorId);
    return doctor ? doctor.name : "";
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <Container className="mt-5 mb-5">
      <Row className="justify-content-center">
        <Col md={10} lg={8}>
          <Card className="cardcolor">
            <Card.Body>
              <div className="cover-photo-container">
                <img
                  src="https://hips.hearstapps.com/hmg-prod/images/house-of-the-dragon-3-1-6674876bce7cd.jpg"
                  alt="Cover"
                  className="cover-photo"
                />
              </div>
              <div className="profile-pic-container">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYrGAWh74hhpy1hzIQKhmZ145ivdaePqlGFw&s"
                  alt="Profile"
                  className="profile-pic"
                />
              </div>
              <Card.Title className="text-center mb-4">User Profile</Card.Title>
              <div className="user-details">
                <p>
                  <strong>Name:</strong> {user.PATIENT_NAME}
                </p>
                <p>
                  <strong>Email:</strong> {user.PATIENT_MAIL}
                </p>
                <p>
                  <strong>Phone:</strong> {user.PATIENT_PHONE}
                </p>
                <p>
                  <strong>Date of Birth:</strong> {user.PATIENT_DOB}
                </p>
                <p>
                  <strong>District:</strong> {user.PATIENT_DISTRICT}
                </p>
                <p>
                  <strong>Area:</strong> {user.PATIENT_AREA}
                </p>
                <p>
                  <strong>Road Number:</strong> {user.PATIENT_ROADNUMBER}
                </p>
                <p>
                  <strong>Gender:</strong> {user.PATIENT_GENDER}
                </p>
              </div>

              <div className="appointments-list mt-5">
                <h5>Upcomming Appointments</h5>
                {appointments && appointments.length > 0 ? (
                  <Row>
                    {appointments.map((appointment) => (
                      <Col
                        key={appointment.APPOINTMENT_ID}
                        md={4}
                        className="mb-3"
                      >
                        <Card className="appointment-card">
                          <Card.Body>
                            <Card.Title>{appointment.DOCTOR_NAME}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong>{" "}
                              {appointment.APPOINTMENT_DATE}
                              <br />
                              <strong>Time:</strong>{" "}
                              {appointment.APPOINTMENT_TIME}
                              <br />
                              <strong>Status:</strong>{" "}
                              {appointment.APPOINTMENT_STATUS}
                              <br />
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No upcomming appointments found.</p>
                )}
              </div>

              <div className="appointments-list mt-5">
                <h5>Previous Appointments</h5>
                {prevAppointments && prevAppointments.length > 0 ? (
                  <Row>
                    {prevAppointments.map((appointment) => (
                      <Col
                        key={appointment.APPOINTMENT_ID}
                        md={4}
                        className="mb-3"
                      >
                        <Card className="appointment-card" onClick={()=>{navigate(`/viewprescription/?appointmentId=${appointment.APPOINTMENT_ID}`)}}>
                          <Card.Body>
                            <Card.Title>{appointment.DOCTOR_NAME}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong>{" "}
                              {appointment.APPOINTMENT_DATE}
                              <br />
                              <strong>Time:</strong>{" "}
                              {appointment.APPOINTMENT_TIME}
                              <br />
                              <strong>Status:</strong>{" "}
                              {appointment.APPOINTMENT_STATUS}
                              <br />
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No previous appointments found.</p>
                )}
              </div>

              <div className="doctor-list mt-5">
                <h5>Available Doctors</h5>
                <Row>
                  {doctors.map((doctor) => (
                    <Col key={doctor.id} md={4} className="mb-3">
                      <Card className="doctor-card">
                        <Card.Body>
                          <Card.Title>{doctor.name}</Card.Title>
                          <Card.Text>Experience: {doctor.experience}</Card.Text>
                          <Button
                            variant="primary"
                            onClick={() => handleShowModal(doctor.id)}
                          >
                            Book Appointment
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
              </div>

              <div className="appointments-list mt-5">
                <Button
                  variant="secondary"
                  onClick={() => navigate("/patienttransaction")}
                >
                  previous Transaction
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Book Appointment</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Make appointment with Dr {findDoctorName(selectedDoctor)}
              </Card.Title>
              <Form>
                <Form.Group controlId="appointmentDate">
                  <Form.Label>Select Date</Form.Label>
                  <Form.Control
                    type="date"
                    value={appointment.date}
                    onChange={(e) =>
                      setAppointment((prev) => ({
                        ...prev,
                        date: e.target.value,
                      }))
                    }
                    required
                  ></Form.Control>
                </Form.Group>
                <Form.Group controlId="appointmentTime">
                  <Form.Label>Select Time Slot</Form.Label>
                  <Form.Control
                    as="select"
                    name="time"
                    value={appointment.time}
                    onChange={(e) =>
                      setAppointment((prev) => ({
                        ...prev,
                        time: e.target.value,
                      }))
                    }
                    required
                  >
                    <option value="">Select a time slot</option>
                    {doctortimes.map((time) => (
                      <option key={time} value={time}>
                        {time}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
                <Form.Group controlId="appointmentPayment">
                  <Form.Label>Remuneration</Form.Label>
                  <Form.Control
                    type="text"
                    value={appointment.payment}
                    readOnly
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleBookAppointment}>
            Book Appointment
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default UserProfile;