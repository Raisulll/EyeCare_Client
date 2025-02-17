import React, { useEffect, useState } from "react";

function GetAppointement() {
  const [doctors, setDoctors] = useState([
    ["1", "Dr. John Doe"],
    ["2", "Dr. Jane Smith"],
    ["3", "Dr. Emily Johnson"],
  ]);
  const [times, setTimes] = useState([]);
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [appointment, setAppointment] = useState({
    doctor: "",
    time: "",
    day: "",
  });

  useEffect(() => {
    // Set dummy time slots when doctor changes
    if (selectedDoctor) {
      const dummyTimes = {
        1: ["09:00 AM", "10:00 AM", "11:00 AM"],
        2: ["01:00 PM", "02:00 PM", "03:00 PM"],
        3: ["04:00 PM", "05:00 PM", "06:00 PM"],
      };
      setTimes(dummyTimes[selectedDoctor] || []);
    }
  }, [selectedDoctor]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(`Changing ${name} to ${value}`);
    setAppointment((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting appointment:", appointment);
    alert("Appointment successfully booked!");
    setAppointment({ doctor: "", time: "", day: "" });
  };

  return (
    <div className="appointment-container">
      <h1>Book an Appointment</h1>
      <form onSubmit={handleSubmit} className="appointment-form">
        <label htmlFor="doctor">Select Doctor:</label>
        <select
          id="doctor"
          name="doctor"
          value={appointment.doctor}
          onChange={(e) => {
            handleChange(e);
            setSelectedDoctor(e.target.value);
          }}
          required
        >
          <option value="">Select a doctor</option>
          {doctors.map((doctor) => (
            <option key={doctor[0]} value={doctor[0]}>
              {doctor[1]}
            </option>
          ))}
        </select>

        <label htmlFor="time">Select Time Slot:</label>
        <select
          id="time"
          name="time"
          value={appointment.time}
          onChange={handleChange}
          required
        >
          <option value="">Select a time slot</option>
          {times.map((time) => (
            <option key={time} value={time}>
              {time}
            </option>
          ))}
        </select>

        <label htmlFor="day">Select Day:</label>
        <select
          id="day"
          name="day"
          value={appointment.day}
          onChange={handleChange}
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
        </select>

        <button type="submit">Submit Appointment</button>
      </form>
    </div>
  );
}

export default GetAppointement;
