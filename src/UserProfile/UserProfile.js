import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [times, setTimes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState('');
  const [appointment, setAppointment] = useState({ doctor: '', time: '', day: '' });
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch appointments for the user
      fetchAppointments(parsedUser.PatientId);

      // Fetch doctors from the API
      fetchDoctors();
    } else {
      navigate('/signin');
    }
  }, [navigate]);

  const fetchDoctors = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/doctors');
      if (!response.ok) throw new Error('Failed to fetch doctors');
      const data = await response.json();
      const formattedDoctors = data.map(doctor => ({
        id: doctor[0],
        name: doctor[1],
        experience: doctor[2],
      }));
      setDoctors(formattedDoctors);
    } catch (error) {
      console.error('Error fetching doctors:', error);
      alert(error.message);
    }
  };

  const fetchAppointments = async (patientId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/appointments?patientId=${patientId}`);
      if (!response.ok) throw new Error('Failed to fetch appointments');
      const data = await response.json();
      setAppointments(data.length ? data : null); // Handle null if no appointments
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert(error.message);
    }
  };

  const fetchTimeSlots = async (doctorId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/times`);
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const data = await response.json();
      setTimes(data.map(time => time[0])); // Assuming each time is returned as an array
    } catch (error) {
      console.error(`Error fetching time slots for doctor ID: ${doctorId}`, error);
      alert(error.message);
    }
  };

  const handleShowModal = (doctorId) => {
    setSelectedDoctor(doctorId);
    setAppointment((prev) => ({ ...prev, doctor: doctorId }));
    fetchTimeSlots(doctorId);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor('');
    setAppointment({ doctor: '', time: '', day: '' });
    setTimes([]);
  };

  const handleBookAppointment = async () => {
    const patientId = user.PatientId;
    try {
      const response = await fetch('http://localhost:5000/api/appointments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...appointment, patientId }),
      });

      if (!response.ok) throw new Error('Failed to book appointment');

      alert('Appointment successfully booked!');
      fetchAppointments(patientId);
      handleCloseModal();
    } catch (error) {
      console.error('Error booking appointment:', error);
      alert(error.message);
    }
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
                <p><strong>Name:</strong> {user.patientName}</p>
                <p><strong>Email:</strong> {user.patientEmail}</p>
                <p><strong>Phone:</strong> {user.patientPhone}</p>
                <p><strong>Date of Birth:</strong> {user.patientDob}</p>
                <p><strong>District:</strong> {user.patientDistrict}</p>
                <p><strong>Area:</strong> {user.patientArea}</p>
                <p><strong>Road Number:</strong> {user.patientRoadNum}</p>
                <p><strong>Gender:</strong> {user.patientGender}</p>
              </div>

              <div className="appointments-list mt-5">
                <h5>Previous Appointments</h5>
                {appointments && appointments.length > 0 ? (
                  <Row>
                    {appointments.map((appointment) => (
                      <Col key={appointment.APPOINTMENT_ID} md={4} className="mb-3">
                        <Card className="appointment-card">
                          <Card.Body>
                            <Card.Title>{appointment[0]}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong> {appointment[1]}<br />
                              <strong>Time:</strong> {appointment[2]}<br />
                              <strong>Status:</strong> {appointment[3]}<br />
                              <strong>Specialty:</strong> {appointment[4]}
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
                          <Button variant="primary" onClick={() => handleShowModal(doctor.id)}>
                            Book Appointment
                          </Button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
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
          <Form>
            <Form.Group controlId="appointmentDate">
              <Form.Label>Select Day</Form.Label>
              <Form.Control
                as="select"
                name="day"
                value={appointment.day}
                onChange={(e) => setAppointment((prev) => ({ ...prev, day: e.target.value }))}
                required
              >
                <option value="">Select a day</option>
                <option value="Friday">Friday</option>
                <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="appointmentTime">
              <Form.Label>Select Time Slot</Form.Label>
              <Form.Control
                as="select"
                name="time"
                value={appointment.time}
                onChange={(e) => setAppointment((prev) => ({ ...prev, time: e.target.value }))}
                required
              >
                <option value="">Select a time slot</option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
          </Form>
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

