import React, { useState, useEffect } from 'react';

function GetAppointement() {
    const [doctors, setDoctors] = useState([]);
    const [times, setTimes] = useState([]);
    const [selectedDoctor, setSelectedDoctor] = useState('');
    const [appointment, setAppointment] = useState({ doctor: '', time: '', day: '' });

    useEffect(() => {
        // Fetch doctors when component mounts
        const fetchDoctors = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/doctors');
                if (!response.ok) throw new Error('Failed to fetch doctors');
                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error('Error fetching doctors:', error);
                alert(error.message);
            }
        };

        fetchDoctors();
    }, []);

    useEffect(() => {
        // Fetch time slots when doctor or day changes
        const fetchTimeSlots = async () => {
            if (selectedDoctor && appointment.day) {
                try {
                    const response = await fetch(
                        `http://localhost:5000/api/doctors/${selectedDoctor}/times?day=${appointment.day}`
                    );
                    if (!response.ok) throw new Error('Failed to fetch time slots');
                    const data = await response.json();
                    setTimes(data);
                } catch (error) {
                    console.error('Error fetching time slots:', error);
                    alert(error.message);
                }
            }
        };

        fetchTimeSlots();
    }, [selectedDoctor, appointment.day]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setAppointment(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/appointments', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(appointment),
            });

            if (!response.ok) throw new Error('Failed to book appointment');

            alert('Appointment successfully booked!');
            setAppointment({ doctor: '', time: '', day: '' });
        } catch (error) {
            alert(error.message);
        }
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
                    {doctors.map(doctor => (
                        <option key={doctor[0]} value={doctor[0]}>
                            {doctor[1]}
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

                <label htmlFor="time">Select Time Slot:</label>
                <select
                    id="time"
                    name="time"
                    value={appointment.time}
                    onChange={handleChange}
                    required
                >
                    <option value="">Select a time slot</option>
                    {times.map(time => (
                        <option key={time} value={time}>
                            {time}
                        </option>
                    ))}
                </select>

                <button type="submit">Submit Appointment</button>
            </form>
        </div>
    );
}

export default GetAppointement;
