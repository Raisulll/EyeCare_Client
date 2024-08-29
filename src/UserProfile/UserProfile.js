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
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const parsedUser = JSON.parse(storedUser);
      setUser(parsedUser);

      // Fetch appointments and doctors for the user
      fetchAppointments(parsedUser.PatientId);
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
      const formattedDoctors = data.map(doctor => {
        const experience = isNaN(doctor[2]) ? doctor[2] : `${doctor[2]} Years`; // Format experience
        return {
          id: doctor[0],
          name: doctor[1],
          experience: experience,
        };
      });
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
      setAppointments(data); // Assuming the API provides the expected structure
      setLoading(false); // Turn off loading after data is fetched
    } catch (error) {
      console.error('Error fetching appointments:', error);
      alert(error.message);
      setLoading(false); // Stop loading in case of an error
    }
  };

  const fetchTimeSlots = async (doctorId, day) => {
    try {
      const response = await fetch(`http://localhost:5000/api/doctors/${doctorId}/times?day=${day}`);
      if (!response.ok) throw new Error('Failed to fetch time slots');
      const data = await response.json();
      setTimes(data); // Assuming the API provides the correct format
    } catch (error) {
      console.error(`Error fetching time slots for doctor ID: ${doctorId}`, error);
      alert(error.message);
    }
  };

  const handleShowModal = (doctorId) => {
    setSelectedDoctor(doctorId);
    setAppointment((prev) => ({ ...prev, doctor: doctorId }));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor('');
    setAppointment({ doctor: '', time: '', day: '' });
    setTimes([]);
  };

  const handleDayChange = (e) => {
    const selectedDay = e.target.value;
    setAppointment((prev) => ({ ...prev, day: selectedDay }));

    // Find the next date for the selected day
    const today = new Date();
    const nextDayDate = getNextDayOfWeek(today, selectedDay);

    // Format the date as DD-MMM-YY for API request
    const formattedDate = formatDateForApi(nextDayDate);
    fetchTimeSlots(selectedDoctor, formattedDate);
  };

  const getNextDayOfWeek = (date, day) => {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const currentDay = date.getDay();
    const targetDay = daysOfWeek.indexOf(day);

    const daysUntilTarget = (targetDay - currentDay + 7) % 7;
    if (daysUntilTarget === 0) {
        return new Date(date); // If it's the same day, return today
    }
    const resultDate = new Date(date);
    resultDate.setDate(date.getDate() + daysUntilTarget);
    return resultDate;
  };

  const formatDateForApi = (date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
    const year = String(date.getFullYear()).slice(-2); // Get last 2 digits of the year
    return `${day}-${month}-${year}`;
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

  if (loading) {
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
                  src={user.URL || "https://via.placeholder.com/150"} // Use Cloudinary URL or fallback
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
                          <Card.Text>Specialty: {doctor.experience}</Card.Text>
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
            <Form.Group controlId="appointmentDay">
              <Form.Label>Select Day</Form.Label>
              <Form.Control
                as="select"
                name="day"
                value={appointment.day}
                onChange={handleDayChange}
                required
              >
                <option value="">Select a day</option>
                {['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'].map(day => (
                  <option key={day} value={day}>{day}</option>
                ))}
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
                  <option key={index} value={time}>{time}</option>
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
