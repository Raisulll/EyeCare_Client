import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorAppointmentCard from "../Patient/DoctorAppointmentCard";
import "../Others/AllDoctors.css";

const AllAppointments = () => {
  const navigate = useNavigate();

  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchPreviousAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/previousappointments?patientId=${localdata.PatientId}`
        );
        if (!response.ok)
          throw new Error("Failed to fetch previous appointments");
        const data = await response.json();
        console.log("Previous Appointments:", data);
        data.forEach((appointment) => {
          const date = new Date(appointment.APPOINTMENT_DATE);
          appointment.APPOINTMENT_DATE = date.toDateString();
        });
        setPreviousAppointments(data);
      } catch (error) {
        console.error("Error fetching previous appointments:", error);
      }
    };

    const fetchUpcomingAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/upcommingappointments?patientId=${localdata.PatientId}`
        );
        if (!response.ok)
          throw new Error("Failed to fetch upcoming appointments");
        const data = await response.json();
        console.log("Upcoming Appointments:", data);
        data.forEach((appointment) => {
          const date = new Date(appointment.APPOINTMENT_DATE);
          appointment.APPOINTMENT_DATE = date.toDateString();
        });
        setUpcomingAppointments(data);
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error);
      }
    };

    fetchPreviousAppointments();
    fetchUpcomingAppointments();
  }, [localdata.PatientId]); // Dependency array to avoid infinite re-fetch

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
