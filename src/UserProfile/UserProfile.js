import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const [doctors, setDoctors] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedDoctor, setSelectedDoctor] = useState(null);
  const [appointmentDate, setAppointmentDate] = useState('');
  
  const [appointments, setAppointments] = useState([]);
  const [purchases, setPurchases] = useState([]);


  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');

    if (storedUser) {
      setUser(JSON.parse(storedUser));

       // Set static appointments data for demonstration
      setAppointments([
        { id: 1, doctorName: 'Dr. John Doe', date: '2024-07-01', specialty: 'Ophthalmologist' },
        { id: 2, doctorName: 'Dr. Jane Smith', date: '2024-06-15', specialty: 'Optometrist' },
      ]);

      // Set static purchases data for demonstration
      setPurchases([
        { id: 1, itemName: 'Optical Glasses', date: '2024-05-20', amount: '$120' },
        { id: 2, itemName: 'Contact Lenses', date: '2024-04-15', amount: '$50' },
      ]);
    } else {
      navigate('/signin');
    }

    // Fetch or set static list of doctors
    setDoctors([
      { id: 1, name: 'Dr. Ses Smoke', specialty: 'Eye Surgeon' },
      { id: 2, name: 'Dr. Virmiture', specialty: 'Surgeon' },
      { id: 3, name: 'Dr. John Doe', specialty: 'Ophthalmologist' },
      { id: 4, name: 'Dr. Jane Smith', specialty: 'Optometrist' },
      { id: 5, name: 'Dr. Sam Wilson', specialty: 'Eye Surgeon' },
    ]);
  }, [navigate]);

  const handleShowModal = (doctor) => {
    setSelectedDoctor(doctor);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedDoctor(null);
    setAppointmentDate('');
  };

  const handleBookAppointment = () => {
    if (selectedDoctor && appointmentDate) {
      console.log(`Appointment booked with ${selectedDoctor.name} on ${appointmentDate}`);
      // Implement booking logic here
      handleCloseModal();
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
              
              <div className="purchases-list mt-5">
                <h5>Previous Purchases</h5>
                {purchases.length > 0 ? (
                  <Row>
                    {purchases.map(purchase => (
                      <Col key={purchase.id} md={4} className="mb-3">
                        <Card className="purchase-card">
                          <Card.Body>
                            <Card.Title>{purchase.itemName}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong> {purchase.date}<br />
                              <strong>Amount:</strong> {purchase.amount}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                ) : (
                  <p>No previous purchases found.</p>
                )}
              </div>



              <div className="appointments-list mt-5">
                <h5>Previous Appointments</h5>
                {appointments.length > 0 ? (
                  <Row>
                    {appointments.map(appointment => (
                      <Col key={appointment.id} md={4} className="mb-3">
                        <Card className="appointment-card">
                          <Card.Body>
                            <Card.Title>{appointment.doctorName}</Card.Title>
                            <Card.Text>
                              <strong>Date:</strong> {appointment.date}<br />
                              <strong>Specialty:</strong> {appointment.specialty}
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
                  {doctors.map(doctor => (
                    <Col key={doctor.id} md={4} className="mb-3">
                      <Card className="doctor-card">
                        <Card.Body>
                          <Card.Title>{doctor.name}</Card.Title>
                          <Card.Text>{doctor.specialty}</Card.Text>
                          <Button variant="primary" onClick={() => handleShowModal(doctor)}>
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
              <Form.Label>Appointment Date</Form.Label>
              <Form.Control
                type="date"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
              />
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
