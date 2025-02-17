import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import styled from "styled-components";
import "../Patient/UserProfile.css";

const ViewDoctorProfile = () => {
  const { doctorId } = useParams(); // Get doctorId from URL parameters
  const navigate = useNavigate();
  const [imagePreview, setImagePreview] = useState(
    "https://placehold.co/600x400"
  );
  const [fullName, setFullName] = useState("Dr. John Doe");
  const [mail, setMail] = useState("john.doe@example.com");
  const [phone, setPhone] = useState("1234567890");
  const [district, setDistrict] = useState("District A");
  const [area, setArea] = useState("Area B");
  const [roadNumber, setRoadNumber] = useState("123");
  const [speciality, setSpeciality] = useState("Ophthalmologist");
  const [hospital, setHospital] = useState("Sample Hospital");
  const [timeslot, setTimeslot] = useState("09:00 AM - 05:00 PM");
  const [times, setTimes] = useState([]);
  const [appointmentDate, setAppointmentDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [remuneration, setRemuneration] = useState("$100");

  const localdata = JSON.parse(localStorage.getItem("user"));
  console.log(localdata);

  useEffect(() => {
    const dummyDoctorData = {
      DOCTOR_IMAGE: "https://placehold.co/600x400",
      DOCTOR_NAME: "Dr. John Doe",
      DOCTOR_MAIL: "john.doe@example.com",
      DOCTOR_PHONE: "1234567890",
      DOCTOR_DISTRICT: "District A",
      DOCTOR_AREA: "Area B",
      DOCTOR_ROADNUMBER: "123",
      DOCTOR_SPECIALITY: "Ophthalmologist",
      HOSPITAL_NAME: "Sample Hospital",
      DOCTOR_TIMESLOT: "09:00 AM - 05:00 PM",
      DOCTOR_PAYMENT: "$100",
    };

    setImagePreview(dummyDoctorData.DOCTOR_IMAGE);
    setFullName(dummyDoctorData.DOCTOR_NAME);
    setMail(dummyDoctorData.DOCTOR_MAIL);
    setPhone(dummyDoctorData.DOCTOR_PHONE);
    setDistrict(dummyDoctorData.DOCTOR_DISTRICT);
    setArea(dummyDoctorData.DOCTOR_AREA);
    setRoadNumber(dummyDoctorData.DOCTOR_ROADNUMBER);
    setSpeciality(dummyDoctorData.DOCTOR_SPECIALITY);
    setHospital(dummyDoctorData.HOSPITAL_NAME);
    setTimeslot(dummyDoctorData.DOCTOR_TIMESLOT);
    setRemuneration(dummyDoctorData.DOCTOR_PAYMENT);
    setTimes(generateTimeSlots(dummyDoctorData.DOCTOR_TIMESLOT));
  }, [doctorId]);

  const generateTimeSlots = (timeRange) => {
    if (
      !timeRange ||
      typeof timeRange !== "string" ||
      !timeRange.includes("-")
    ) {
      console.error("Invalid time range provided:", timeRange);
      return [];
    }

    const slots = [];
    let [startTime, endTime] = timeRange.split("-").map((time) => time.trim());

    if (!startTime || !endTime) {
      console.error("Invalid start or end time:", startTime, endTime);
      return [];
    }

    let newStartTime = parseInt(startTime);
    let newEndTime = parseInt(endTime);
    let turn = 1;

    while (newStartTime < newEndTime) {
      if (turn === 1) {
        slots.push(
          `${newStartTime.toString()}:00 PM to ${newStartTime.toString()}:30 PM`
        );
        turn = 2;
      } else {
        slots.push(
          `${newStartTime.toString()}:30 PM to ${(
            newStartTime + 1
          ).toString()}:00 PM`
        );
        turn = 1;
        newStartTime++;
      }
    }

    return slots;
  };

  const handleImageClick = () => {
    document.getElementById("file").click();
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        setImagePreview(base64String);
        console.log("Image uploaded successfully:", base64String);
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
      };
      reader.readAsDataURL(file);
    }
  };

  const handleConfirmAppointment = () => {
    const data = {
      doctor: doctorId,
      time: selectedTime,
      date: appointmentDate,
      patientId: localdata.PatientId,
    };
    console.log("Appointment data:", data);
    toast.success("Appointment successfully booked!", {
      position: "top-right",
      autoClose: 2500,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    navigate("/home");
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
                readOnly
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
                readOnly
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
                id="speciality"
                value={speciality}
                readOnly
                required
              />
              <label htmlFor="speciality" className="label">
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
                readOnly
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
              <input type="text" id="area" value={area} readOnly required />
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
                readOnly
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
                id="hospital"
                value={hospital}
                readOnly
                required
              />
              <label htmlFor="hospital" className="label">
                Hospital Name
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
                id="timeSlot"
                value={timeslot}
                readOnly
                required
              />
              <label htmlFor="timeSlot" className="label">
                Time Slot
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <input
                type="text"
                id="payment"
                value={remuneration}
                readOnly
                required
              />
              <label htmlFor="remuneration" className="label">
                Remuneration
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div">
          <StyledWrapper>
            <div className="input-container">
              <input
                type="date"
                id="appointmentDate"
                value={appointmentDate}
                onChange={(e) => setAppointmentDate(e.target.value)}
                required
                style={{ color: appointmentDate ? "black" : "transparent" }}
              />
              <label htmlFor="dateOfBirth" className="label">
                Select Appointment Date
              </label>
              <div className="underline" />
            </div>
          </StyledWrapper>
          <StyledWrapper>
            <div className="input-container">
              <select
                id="selectTime"
                value={selectedTime}
                onChange={(e) => setSelectedTime(e.target.value)}
                required
              >
                <option value="" disabled></option>
                {times.map((time, index) => (
                  <option key={index} value={time}>
                    {time}
                  </option>
                ))}
              </select>
              <label htmlFor="gender" className="label">
                Select Time Slot
              </label>
            </div>
          </StyledWrapper>
        </div>
        <div className="vitorer-div last-div">
          <div className="button-div">
            <StyledWrapper>
              <button onClick={handleConfirmAppointment}>
                Book Appointment
                <div className="arrow-wrapper">
                  <div className="arrow" />
                </div>
              </button>
            </StyledWrapper>
          </div>
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

export default ViewDoctorProfile;
