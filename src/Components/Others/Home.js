import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import DoctorCard from "./DoctorCard";
import DoctorAppointmentCard from "../Patient/DoctorAppointmentCard";
import home1 from "../../Assets/images/home1.svg";
import home2 from "../../Assets/images/home2.svg";
import "./Home.css";

const Home = () => {
  const navigate = useNavigate();

  const [doctors, setDoctors] = useState([]);
  const [previousAppointments, setPreviousAppointments] = useState([]);
  const [upcomingAppointments, setUpcomingAppointments] = useState([]);

  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/doctors");
        if (!response.ok) throw new Error("Failed to fetch doctors");
        const data = await response.json();
        setDoctors(data);
        console.log(doctors);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchPreviousAppointments = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/previousappointments?patientId=${localdata.PatientId}`
        );
        if (!response.ok)
          throw new Error("Failed to fetch previous appointments");
        const data = await response.json();
        console.log(data);
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
        console.log(data);
        //format the date and time to be more readable
        data.forEach((appointment) => {
          const date = new Date(appointment.APPOINTMENT_DATE);
          appointment.APPOINTMENT_DATE = date.toDateString();
          // const time = new Date(appointment.APPOINTMENT_TIME);
          // appointment.APPOINTMENT_TIME = time.toLocaleTimeString();
        });
        setUpcomingAppointments(data);
      } catch (error) {
        console.error("Error fetching upcoming appointments:", error);
      }
    };

    fetchDoctors();
    fetchPreviousAppointments();
    fetchUpcomingAppointments();
    console.log("previous: ",previousAppointments);
    console.log("upcoming",upcomingAppointments);
  }, []);

  return (
    <div className="home-container">
      <div className="doctor-image">
        <div className="doctor-list" onClick={() => navigate("/alldoctors")}>
          {doctors.slice(0, 3).map((doctor,index) => (
            <DoctorCard
              key={index}
              image={doctor.DOCTOR_IMAGE}
              name={doctor.DOCTOR_NAME}
              role={doctor.DOCTOR_SPECIALITY}
              doctorId={doctor.DOCTOR_ID}
            />
          ))}
          <button className="home-button" onClick={() => navigate("/alldoctors")}>
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
          <button className="home-button" onClick={() => navigate("/alldoctors")}>
            View All Appointments
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
