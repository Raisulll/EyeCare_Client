import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Hospital/SchedulePage.css';

const SchedulePage = () => {
  const navigate = useNavigate();
  const [schedules, setSchedules] = useState([
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
  ]);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [editingSchedule, setEditingSchedule] = useState(null);
  const [newSchedule, setNewSchedule] = useState({ patientName: '', appointmentTime: '' });

  const handleEdit = (schedule) => {
    setEditingSchedule(schedule);
  };

  const handleSave = () => {
    setSchedules((prevSchedules) =>
      prevSchedules.map((schedule) =>
        schedule.id === editingSchedule.id ? editingSchedule : schedule
      )
    );
    setEditingSchedule(null);
  };

  const handleDelete = (id) => {
    setSchedules((prevSchedules) => prevSchedules.filter((schedule) => schedule.id !== id));
  };

  const handleAdd = () => {
    setSchedules((prevSchedules) => [
      ...prevSchedules,
      { ...newSchedule, id: prevSchedules.length + 1 },
    ]);
    setNewSchedule({ patientName: '', appointmentTime: '' });
  };

  const filteredSchedules = schedules.filter(
    (schedule) =>
      schedule.patientName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.appointmentTime.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="schedule-page-container">
      <h1 className="title">All Patient Schedules</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Schedule"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="schedule-table">
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Appointment Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredSchedules.map((schedule) => (
            <tr key={schedule.id}>
              <td>
                {editingSchedule && editingSchedule.id === schedule.id ? (
                  <input
                    type="text"
                    value={editingSchedule.patientName}
                    onChange={(e) =>
                      setEditingSchedule({
                        ...editingSchedule,
                        patientName: e.target.value,
                      })
                    }
                  />
                ) : (
                  schedule.patientName
                )}
              </td>
              <td>
                {editingSchedule && editingSchedule.id === schedule.id ? (
                  <input
                    type="text"
                    value={editingSchedule.appointmentTime}
                    onChange={(e) =>
                      setEditingSchedule({
                        ...editingSchedule,
                        appointmentTime: e.target.value,
                      })
                    }
                  />
                ) : (
                  schedule.appointmentTime
                )}
              </td>
              <td>
                {editingSchedule && editingSchedule.id === schedule.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button className="btn-e" onClick={() => handleEdit(schedule)}>Edit</button>
                )}
                <button className="btn-d" onClick={() => handleDelete(schedule.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-schedule">
        <input
          type="text"
          placeholder="Patient Name"
          value={newSchedule.patientName}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, patientName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Appointment Time"
          value={newSchedule.appointmentTime}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, appointmentTime: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Schedule</button>
      </div>
      <button className="btn back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default SchedulePage;
