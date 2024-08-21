import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Hospital/EditProfilePage.css'; // Assuming you have a similar CSS file for Edit Profile Page

const EditProfilePage = () => {
  const navigate = useNavigate();

  // Assuming this data is passed as props or fetched from an API
  const initialData = {
    Name: "Mr. John Doe",
    avatar: "https://www.swatflorida.com/images/members/R2_Ryan_Helmes.png",
    coverPhoto: "https://www.shutterstock.com/image-photo/medical-coverage-insurance-concept-hands-260nw-1450246616.jpg",
    ID: "H_001",
    GENDER: "Male",
    EMAIL: "john.doe@gmail.com",
    PHONE: "01234567890",
    DISTRICT: "Dhaka",
    AREA: "Gulshan",
    ROADNUMBER: "20",
    LICENSE: "HPS",
    TIMESLOT: "9:00 am - 5:00 pm",
    ROLE: "Hospital Manager",
    WORKS_IN: "Kurmitola General Hospital"
  };

  const [profileData, setProfileData] = useState(initialData);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Save the updated data (e.g., send to API)
    console.log('Profile updated:', profileData);
    navigate('/profile'); // Redirect to the profile page
  };

  return (
    <div className="edit-profile-container">
      <h1>Edit Profile</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="Name"
            value={profileData.Name}
            onChange={handleChange}
          />
        </label>
        <label>
          Avatar URL:
          <input
            type="text"
            name="avatar"
            value={profileData.avatar}
            onChange={handleChange}
          />
        </label>
        <label>
          Cover Photo URL:
          <input
            type="text"
            name="coverPhoto"
            value={profileData.coverPhoto}
            onChange={handleChange}
          />
        </label>
        <label>
          Gender:
          <input
            type="text"
            name="GENDER"
            value={profileData.GENDER}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="EMAIL"
            value={profileData.EMAIL}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone:
          <input
            type="text"
            name="PHONE"
            value={profileData.PHONE}
            onChange={handleChange}
          />
        </label>
        <label>
          District:
          <input
            type="text"
            name="DISTRICT"
            value={profileData.DISTRICT}
            onChange={handleChange}
          />
        </label>
        <label>
          Area:
          <input
            type="text"
            name="AREA"
            value={profileData.AREA}
            onChange={handleChange}
          />
        </label>
        <label>
          Road Number:
          <input
            type="text"
            name="ROADNUMBER"
            value={profileData.ROADNUMBER}
            onChange={handleChange}
          />
        </label>
        <label>
          License:
          <input
            type="text"
            name="LICENSE"
            value={profileData.LICENSE}
            onChange={handleChange}
          />
        </label>
        <label>
          Timeslot:
          <input
            type="text"
            name="TIMESLOT"
            value={profileData.TIMESLOT}
            onChange={handleChange}
          />
        </label>
        <label>
          Role:
          <input
            type="text"
            name="ROLE"
            value={profileData.ROLE}
            onChange={handleChange}
          />
        </label>
        <label>
          Works In:
          <input
            type="text"
            name="WORKS_IN"
            value={profileData.WORKS_IN}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Save Changes</button>
      </form>
    </div>
  );
};

export default EditProfilePage;
