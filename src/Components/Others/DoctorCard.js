import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const DoctorCard = ({
  image = "https://placehold.co/600x400",
  name = "Dr. John Doe",
  role = "Ophthalmologist",
  doctorId = "1",
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/viewdoctorprofile/${doctorId}`);
    console.log("Doctor ID:", doctorId);
  };

  return (
    <DoctorCardWrapper onClick={handleClick}>
      <DoctorImage src={image} alt={`${name}'s photo`} />
      <DoctorName>{name}</DoctorName>
      <DoctorRole>{role}</DoctorRole>
    </DoctorCardWrapper>
  );
};

const DoctorCardWrapper = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  text-align: center;
  width: 300px;
  margin: 20px;
  cursor: pointer;
`;

const DoctorImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 15px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(0, 0, 0, 0.1);
`;

const DoctorName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
`;

const DoctorRole = styled.p`
  font-size: 16px;
  color: #666;
`;

export default DoctorCard;
