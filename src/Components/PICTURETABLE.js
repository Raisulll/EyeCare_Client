import React, { useState } from "react";
import axios from "axios";

const UploadPicture = () => {
  const [profilePhoto, setProfilePhoto] = useState(null);
  const [error, setError] = useState("");
  const [msg, setMsg] = useState("");

  // Handle change for the file input
  const handleChange = (e) => {
    setProfilePhoto(e.target.files[0]);
  };

  // Handle the form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!profilePhoto) {
      setError("Please select a photo to upload.");
      return;
    }

    const formData = new FormData();
    formData.append("profilePhoto", profilePhoto);

    try {
      const url = "http://localhost:5000/api/upload-picture"; // Adjust the URL as per your backend route
      const response = await axios.post(url, formData);
      setMsg(response.data.message);
    } catch (err) {
      if (err.response) {
        setError(err.response.data.message || "An unexpected error occurred.");
      } else {
        setError("Unable to connect to the server.");
      }
      console.error("Error during form submission:", err);
    }
  };

  return (
    <div>
      <h1>Upload Profile Picture</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          name="profilePhoto"
          onChange={handleChange}
          required
        />
        {error && <div style={{ color: "red" }}>{error}</div>}
        {msg && <div style={{ color: "green" }}>{msg}</div>}
        <button type="submit">Upload</button>
      </form>
    </div>
  );
};

export default UploadPicture;
