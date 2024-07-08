import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../Hospital/SchedulePage.css'
 // Assuming you have a similar CSS file for Schedule Page

const SchedulePage = () => {
  const navigate = useNavigate();

  const dummySchedule = [
    { id: 1, patientName: 'Alice', appointmentTime: '10:00 am' },
    { id: 2, patientName: 'Bob', appointmentTime: '11:00 am' },
    { id: 3, patientName: 'Charlie', appointmentTime: '1:00 pm' },
    { id: 4, patientName: 'David', appointmentTime: '2:00 pm' },
    { id: 6, patientName: 'Elish', appointmentTime: '3:00 pm' },
    { id: 7, patientName: 'Ema', appointmentTime: '3:30 pm' },
    { id: 8, patientName: 'Eree', appointmentTime: '3:35 pm' },
    { id: 9, patientName: 'Aref', appointmentTime: '5:00 pm' },
    { id: 10, patientName: 'Sajed', appointmentTime: '5:20 pm' },
    { id: 11, patientName: 'Karim', appointmentTime: '5:40 pm' },
    { id: 12, patientName: 'Doe', appointmentTime: '6:00 pm' },
    { id: 13, patientName: 'Raisul', appointmentTime: '7:00 pm' },
    { id: 14, patientName: 'Nahiyan', appointmentTime: '8:00 pm' },
    { id: 15, patientName: 'Ravi', appointmentTime: '9:00 pm' },
    { id: 16, patientName: 'Shakib', appointmentTime: '10:00 pm' },
    { id: 17, patientName: 'Tamim', appointmentTime: '11:00 pm' },
    { id: 18, patientName: 'Messi', appointmentTime: '12:20 pm' },
    { id: 19, patientName: 'MS', appointmentTime: '12:30 pm' },
    { id: 20, patientName: 'DHONI', appointmentTime: '12:04 pm' },
    { id: 21, patientName: 'Thala', appointmentTime: '12:50 pm' },
    // Add more schedule entries as needed
  ];

  return (
    <div className="schedule-page-container">
      <h1 className='title'>All Patient Schedules</h1>
      <table className="schedule-table">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Appointment Time</th>
            </tr>
          </thead>
          <tbody>
            {dummySchedule.map(schedule => (
              <tr key={schedule.id}>
                <td>{schedule.patientName}</td>
                <td>{schedule.appointmentTime}</td>
              </tr>
            ))}
          </tbody>
        </table>
      <button className="btn back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default SchedulePage;
