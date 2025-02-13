import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";

const DoctorProfile = () => {
  const navigate = useNavigate();
  const [doctorData, setDoctorData] = useState({});
  const [imagePreview, setImagePreview] = useState(null);
  const [fullName, setFullName] = useState("");
  const [mail, setMail] = useState("");
  const [phone, setPhone] = useState("");
  const [district, setDistrict] = useState("");
  const [area, setArea] = useState("");
  const [roadNumber, setRoadNumber] = useState("");
  const [specilaity, setSpeciality] = useState("");
  const [hospital, setHospital] = useState("");
  const [timeslot, setTimeslot] = useState("");

  const localdata = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchDoctorData = async () => {
      try {
        const doctor = await fetch(
          `http://localhost:5000/gets/doctordata?doctorId=${localdata.doctorId}`
        );
        const temp = await doctor.json();
        setDoctorData(temp);
        setImagePreview(temp.DOCTOR_IMAGE);
        setFullName(temp.DOCTOR_NAME);
        setMail(temp.DOCTOR_MAIL);
        setPhone(temp.DOCTOR_PHONE);
        setDistrict(temp.DOCTOR_DISTRICT);
        setArea(temp.DOCTOR_AREA);
        setRoadNumber(temp.DOCTOR_ROADNUMBER);
        setSpeciality(temp.DOCTOR_SPECIALITY);
        setHospital(temp.HOSPITAL_NAME);
        setTimeslot(temp.DOCTOR_TIMESLOT);
        console.log(temp);
      } catch (error) {
        console.log(error);
      }
    };
    fetchDoctorData();
  }, []);

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        try {
          const res = await fetch(
            "http://localhost:5000/upload/doctorProfile",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                imageBase64: base64String,
                doctorId: localdata.doctorId,
              }),
            }
          );

          const data = await res.json();
          if (res.ok) {
            console.log("Image uploaded successfully:", data);
            toast.success("Image Upload Successful!", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          } else {
            console.error("Image upload failed:", data.message);
            toast.error("Image Upload Failed", {
              position: "top-right",
              autoClose: 2500,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: undefined,
              theme: "colored",
            });
          }
        } catch (error) {
          console.error("Error uploading image:", error);
          toast.error("Error uploading image.");
        }
      };

      reader.readAsDataURL(file);
    }
  };

  const updateDoctorData = async () => {
    console.log("updatePatientData");
    if (phone.length !== 11) {
      toast.error("Invalid Phone Number!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
      return;
    }

    const data = {
      doctorId: localdata.doctorId,
      doctorName: fullName,
      doctorMail: mail,
      doctorPhone: phone,
      doctorDistrict: district,
      doctorArea: area,
      doctorRoadNumber: roadNumber,
      doctorSpeciality: specilaity,
    };
    console.log("Data:", data);
    try {
      const res = await fetch("http://localhost:5000/edit/doctorProfileData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      const result = await res.json();
      if (res.ok) {
        console.log("Patient data updated successfully:", result);
        toast.success("Data Updated Successfully!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else {
        console.error("Failed to update patient data:", result.message);
        toast.error("Failed to update data!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      }
    } catch (error) {
      console.error("Error updating patient data:", error);
      toast.error("Error updating data!", {
        position: "top-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  };

  return (
    <div className="firstdiv">
      <ul className="circles">
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
        <li></li>
      </ul>
      <ToastContainer />
      <div className="second">
        <div onClick={handleImageClick}>
          <img className="profile-image" src={imagePreview} alt="profile" />
          <input
            className="profile-image-input"
            type="file"
            id="file"
            style={{ display: "none" }}
            onChange={handleImageChange}
          />
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="fullName"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <label htmlFor="fullName" className="label">
                Full Name
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input type="email" id="email" value={mail} readOnly required />
              <label htmlFor="email" className="label">
                Email
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber" className="label">
                Phone Number
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="phoneNumber"
                value={specilaity}
                onChange={(e) => setSpeciality(e.target.value)}
                required
              />
              <label htmlFor="phoneNumber" className="label">
                Doctor Speciality
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
              <label htmlFor="district" className="label">
                District
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="area"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                required
              />
              <label htmlFor="area" className="label">
                Area
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="roadNumber"
                value={roadNumber}
                onChange={(e) => setRoadNumber(e.target.value)}
                required
              />
              <label htmlFor="roadNumber" className="label">
                Road Number
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="roadNumber"
                value={hospital}
                onChange={(e) => setHospital(e.target.value)}
                required
              />
              <label htmlFor="roadNumber" className="label">
                Hospital Name
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div last-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="timeSlot"
                value={timeslot}
                onChange={(e) => setTimeslot(e.target.value)}
                required
              />
              <label htmlFor="roadNumber" className="label">
                Time Slot
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <div className="button-div">
            <StyledWrapper>
              <button onClick={updateDoctorData}>
                Update
                <div className="arrow-wrapper">
                  <div className="arrow" />
                </div>
              </button>
            </StyledWrapper>
          </div>
        </div>
        <div className="navigation-buttons123">
          <button onClick={() => navigate("/doctorappointments")}>
            Appointments
          </button>
          <button onClick={() => navigate("/doctortransaction")}>
            Transactions
          </button>
        </div>
      </div>
    </div>
  );
};

const StyledWrapper = styled.div`
  .input-container {
    position: relative;
    margin: 15px auto;
    width: 20vw;
  }

  .input-container input[type="text"],
  .input-container input[type="email"],
  .input-container input[type="date"],
  .input-container input[type="password"],
  .input-container input[type="number"],
  .input-container select {
    font-size: 16px;
    width: 100%;
    border: none;
    border-bottom: 2px solid #000;
    padding: 5px 0;
    background-color: transparent;
    outline: none;
  }

  .input-container .label {
    position: absolute;
    top: 0;
    left: 0;
    color: #000;
    transition: all 0.3s ease;
    pointer-events: none;
  }

  .input-container input:focus ~ .label,
  .input-container input:valid ~ .label,
  .input-container input[readonly] ~ .label,
  .input-container select:focus ~ .label,
  .input-container select:valid ~ .label {
    top: -20px;
    font-size: 16px;
    color: #263238;
  }

  .input-container .underline {
    position: absolute;
    bottom: 0;
    left: 0;
    height: 2px;
    width: 100%;
    background-color: #263238;
    transform: scaleX(0);
    transition: all 0.3s ease;
  }

  .input-container input:focus ~ .underline,
  .input-container input:valid ~ .underline {
    transform: scaleX(1);
  }

  button {
    --primary-color: #645bff;
    --secondary-color: #fff;
    --hover-color: #111;
    --arrow-width: 10px;
    --arrow-stroke: 2px;
    box-sizing: border-box;
    border: 0;
    border-radius: 20px;
    color: var(--secondary-color);
    padding: 1em 1.8em;
    background: var(--primary-color);
    display: flex;
    transition: 0.2s background;
    align-items: center;
    gap: 0.6em;
    font-weight: bold;
  }

  button .arrow-wrapper {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  button .arrow {
    margin-top: 1px;
    width: var(--arrow-width);
    background: var(--primary-color);
    height: var(--arrow-stroke);
    position: relative;
    transition: 0.2s;
  }

  button .arrow::before {
    content: "";
    box-sizing: border-box;
    position: absolute;
    border: solid var(--secondary-color);
    border-width: 0 var(--arrow-stroke) var(--arrow-stroke) 0;
    display: inline-block;
    top: -3px;
    right: 3px;
    transition: 0.2s;
    padding: 3px;
    transform: rotate(-45deg);
  }

  button:hover {
    background-color: var(--hover-color);
  }

  button:hover .arrow {
    background: var(--secondary-color);
  }

  button:hover .arrow:before {
    right: 0;
  }
`;

export default DoctorProfile;
