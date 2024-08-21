import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Hospital/StaffPage.css'; // Make sure to create this CSS file

const StaffPage = () => {
  const navigate = useNavigate();
  const [staffList, setStaffList] = useState([
    { id: 1, staffName: 'Dr. Smith', role: 'Surgeon', salary: '100,000' },
    { id: 2, staffName: 'Nurse Nancy', role: 'Nurse', salary: '50,000' },
    { id: 3, staffName: 'Dr. Brown', role: 'Pediatrician', salary: '80,000' },
    { id: 4, staffName: 'Admin Alex', role: 'Administrator', salary: '60,000' },
  ]);

  const [searchQuery, setSearchQuery] = useState('');
  const [editingStaff, setEditingStaff] = useState(null);
  const [newStaff, setNewStaff] = useState({ staffName: '', role: '', salary: '' });

  const handleEdit = (staff) => {
    setEditingStaff(staff);
  };

  const handleSave = () => {
    setStaffList((prevStaffList) =>
      prevStaffList.map((staff) =>
        staff.id === editingStaff.id ? editingStaff : staff
      )
    );
    setEditingStaff(null);
  };

  const handleDelete = (id) => {
    setStaffList((prevStaffList) => prevStaffList.filter((staff) => staff.id !== id));
  };

  const handleAdd = () => {
    setStaffList((prevStaffList) => [
      ...prevStaffList,
      { ...newStaff, id: prevStaffList.length + 1 },
    ]);
    setNewStaff({ staffName: '', role: '', salary: '' });
  };

  const filteredStaffList = staffList.filter(
    (staff) =>
      staff.staffName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      staff.salary.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="staff-page-container">
      <h1 className="title">Hospital Staff List</h1>
      <input
        type="text"
        className="search-bar"
        placeholder="Search Staff"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <table className="staff-table">
        <thead>
          <tr>
            <th>Staff Name</th>
            <th>Role</th>
            <th>Salary</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStaffList.map((staff) => (
            <tr key={staff.id}>
              <td>
                {editingStaff && editingStaff.id === staff.id ? (
                  <input
                    type="text"
                    value={editingStaff.staffName}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        staffName: e.target.value,
                      })
                    }
                  />
                ) : (
                  staff.staffName
                )}
              </td>
              <td>
                {editingStaff && editingStaff.id === staff.id ? (
                  <input
                    type="text"
                    value={editingStaff.role}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        role: e.target.value,
                      })
                    }
                  />
                ) : (
                  staff.role
                )}
              </td>
              <td>
                {editingStaff && editingStaff.id === staff.id ? (
                  <input
                    type="text"
                    value={editingStaff.salary}
                    onChange={(e) =>
                      setEditingStaff({
                        ...editingStaff,
                        salary: e.target.value,
                      })
                    }
                  />
                ) : (
                  staff.salary
                )}
              </td>
              <td>
                {editingStaff && editingStaff.id === staff.id ? (
                  <button onClick={handleSave}>Save</button>
                ) : (
                  <button className="btn-e" onClick={() => handleEdit(staff)}>Edit</button>
                )}
                <button className="btn-d" onClick={() => handleDelete(staff.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="add-staff">
        <input
          type="text"
          placeholder="Staff Name"
          value={newStaff.staffName}
          onChange={(e) =>
            setNewStaff({ ...newStaff, staffName: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Role"
          value={newStaff.role}
          onChange={(e) =>
            setNewStaff({ ...newStaff, role: e.target.value })
          }
        />
        <input
          type="text"
          placeholder="Salary"
          value={newStaff.salary}
          onChange={(e) =>
            setNewStaff({ ...newStaff, salary: e.target.value })
          }
        />
        <button onClick={handleAdd}>Add Staff</button>
      </div>
      <button className="btn back-btn" onClick={() => navigate(-1)}>
        Back
      </button>
    </div>
  );
};

export default StaffPage;
