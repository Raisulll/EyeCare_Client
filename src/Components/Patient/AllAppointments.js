import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorAppointmentCard from "../Patient/DoctorAppointmentCard";
import "../Others/AllDoctors.css";

const AllAppointments = () => {
  const navigate = useNavigate();

  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  // Static dummy data for appointments
  const dummyPreviousAppointments = [
    {
      APPOINTMENT_ID: 1,
      APPOINTMENT_DATE: "2023-09-25T10:00:00Z",
      APPOINTMENT_TIME: "10:00 AM",
      DOCTOR_NAME: "Dr. John Smith",
      DOCTOR_SPECIALITY: "Cardiologist",
      HOSPITAL_NAME: "City Hospital",
      DOCTOR_IMAGE: "https://via.placeholder.com/150",
    },
    {
      APPOINTMENT_ID: 2,
      APPOINTMENT_DATE: "2023-09-20T14:30:00Z",
      APPOINTMENT_TIME: "2:30 PM",
      DOCTOR_NAME: "Dr. Jane Doe",
      DOCTOR_SPECIALITY: "Dermatologist",
      HOSPITAL_NAME: "Green Valley Clinic",
      DOCTOR_IMAGE: "https://via.placeholder.com/150",
    },
  ];

  const dummyUpcomingAppointments = [
    {
      APPOINTMENT_ID: 3,
      APPOINTMENT_DATE: "2023-10-10T09:00:00Z",
      APPOINTMENT_TIME: "9:00 AM",
      DOCTOR_NAME: "Dr. Emily Brown",
      DOCTOR_SPECIALITY: "Pediatrician",
      HOSPITAL_NAME: "Sunrise Hospital",
      DOCTOR_IMAGE: "https://via.placeholder.com/150",
    },
    {
      APPOINTMENT_ID: 4,
      APPOINTMENT_DATE: "2023-10-15T11:00:00Z",
      APPOINTMENT_TIME: "11:00 AM",
      DOCTOR_NAME: "Dr. Michael Green",
      DOCTOR_SPECIALITY: "Orthopedic Surgeon",
      HOSPITAL_NAME: "Central Health",
      DOCTOR_IMAGE: "https://via.placeholder.com/150",
    },
  ];

  useEffect(() => {
    // Format dates for previous appointments
    const formattedPreviousAppointments = dummyPreviousAppointments.map(
      (appointment) => {
        const date = new Date(appointment.APPOINTMENT_DATE);
        return {
          ...appointment,
          APPOINTMENT_DATE: date.toDateString(),
        };
      }
    );

    // Format dates for upcoming appointments
    const formattedUpcomingAppointments = dummyUpcomingAppointments.map(
      (appointment) => {
        const date = new Date(appointment.APPOINTMENT_DATE);
        return {
          ...appointment,
          APPOINTMENT_DATE: date.toDateString(),
        };
      }
    );

    setPreviousAppointments(formattedPreviousAppointments);
    setUpcomingAppointments(formattedUpcomingAppointments);
  }, []);

  return (
    <div className="home-container">
      <h6>Previous Appointments</h6>
      <div className="doctor-list">
        {previousAppointments.length > 0 ? (
          previousAppointments.map((appointment) => (
            <DoctorAppointmentCard
              key={appointment.APPOINTMENT_ID}
              date={appointment.APPOINTMENT_DATE}
              time={appointment.APPOINTMENT_TIME}
              doctor={appointment.DOCTOR_NAME}
              speciality={appointment.DOCTOR_SPECIALITY}
              hospital={appointment.HOSPITAL_NAME}
              image={appointment.DOCTOR_IMAGE}
              name={appointment.DOCTOR_NAME}
              appointmentId={appointment.APPOINTMENT_ID}
              status={"Completed"}
            />
          ))
        ) : (
          <p>No previous appointments found</p>
        )}
      </div>

      <h6>Upcoming Appointments</h6>
      <div className="doctor-list">
        {upcomingAppointments.length > 0 ? (
          upcomingAppointments.map((appointment) => (
            <DoctorAppointmentCard
              key={appointment.APPOINTMENT_ID}
              name={appointment.DOCTOR_NAME}
              date={appointment.APPOINTMENT_DATE}
              appointmentId={appointment.APPOINTMENT_ID}
              time={appointment.APPOINTMENT_TIME}
              doctor={appointment.DOCTOR_NAME}
              speciality={appointment.DOCTOR_SPECIALITY}
              hospital={appointment.HOSPITAL_NAME}
              image={appointment.DOCTOR_IMAGE}
              status={"Upcoming"}
            />
          ))
        ) : (
          <p>No upcoming appointments found</p>
        )}
      </div>
    </div>
  );
};

export default AllAppointments;
