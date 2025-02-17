import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import home1 from "../../Assets/images/home1.svg";
import home2 from "../../Assets/images/home2.svg";
import DoctorAppointmentCard from "../Patient/DoctorAppointmentCard";
import DoctorCard from "./DoctorCard";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  useEffect(() => {
    // Dummy data for doctors
    const dummyDoctors = [
      {
        DOCTOR_ID: "1",
        DOCTOR_NAME: "Dr. John Doe",
        DOCTOR_SPECIALITY: "Ophthalmologist",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
      },
      {
        DOCTOR_ID: "2",
        DOCTOR_NAME: "Dr. Jane Smith",
        DOCTOR_SPECIALITY: "Optometrist",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
      },
      {
        DOCTOR_ID: "3",
        DOCTOR_NAME: "Dr. Emily Johnson",
        DOCTOR_SPECIALITY: "Pediatric Ophthalmologist",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
      },
    ];

    // Dummy data for previous appointments
    const dummyPreviousAppointments = [
      {
        APPOINTMENT_ID: "1",
        DOCTOR_NAME: "Dr. John Doe",
        APPOINTMENT_DATE: "2025-02-10",
        APPOINTMENT_TIME: "10:00 AM",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
        HOSPITAL_NAME: "Hospital A",
      },
      {
        APPOINTMENT_ID: "2",
        DOCTOR_NAME: "Dr. Jane Smith",
        APPOINTMENT_DATE: "2025-02-15",
        APPOINTMENT_TIME: "11:00 AM",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
        HOSPITAL_NAME: "Hospital B",
      },
    ];

    // Dummy data for upcoming appointments
    const dummyUpcomingAppointments = [
      {
        APPOINTMENT_ID: "3",
        DOCTOR_NAME: "Dr. Emily Johnson",
        APPOINTMENT_DATE: "2025-02-20",
        APPOINTMENT_TIME: "12:00 PM",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
        HOSPITAL_NAME: "Hospital C",
      },
      {
        APPOINTMENT_ID: "4",
        DOCTOR_NAME: "Dr. John Doe",
        APPOINTMENT_DATE: "2025-02-25",
        APPOINTMENT_TIME: "01:00 PM",
        DOCTOR_IMAGE: "https://via.placeholder.com/150",
        HOSPITAL_NAME: "Hospital D",
      },
    ];

    setDoctors(dummyDoctors);
    setPreviousAppointments(dummyPreviousAppointments);
    setUpcomingAppointments(dummyUpcomingAppointments);
  }, []);

  return (
    <div className="home-container">
      <div className="doctor-image">
        <div className="doctor-list" onClick={() => navigate("/alldoctors")}>
          {doctors.slice(0, 3).map((doctor, index) => (
            <DoctorCard
              key={index}
              image={doctor.DOCTOR_IMAGE}
              name={doctor.DOCTOR_NAME}
              role={doctor.DOCTOR_SPECIALITY}
              doctorId={doctor.DOCTOR_ID}
            />
          ))}
          <button
            className="home-button"
            onClick={() => navigate("/alldoctors")}
          >
            View All Doctors
          </button>
        </div>
        <div className="image-home1">
          <img src={home1} alt="Doctor" />
        </div>
      </div>
      <div className="doctor-image">
        <div className="image-home1">
          <img src={home2} alt="Appointment" />
        </div>
        <div
          className="doctor-list"
          onClick={() => navigate("/allappointments")}
        >
          {upcomingAppointments.slice(0, 3).map((appointment, index) => (
            <DoctorAppointmentCard
              key={index}
              image={appointment.DOCTOR_IMAGE}
              name={appointment.DOCTOR_NAME}
              date={appointment.APPOINTMENT_DATE}
              time={appointment.APPOINTMENT_TIME}
              doctorId={appointment.DOCTOR_ID}
              appointmentId={appointment.APPOINTMENT_ID}
              hospital={appointment.HOSPITAL_NAME}
            />
          ))}
          <button
            className="home-button"
            onClick={() => navigate("/allappointments")}
          >
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
