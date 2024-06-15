import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const LogOut = () => {
  const navigate = useNavigate();
  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (!user) {
      navigate("/signin");
    }
  });
  return (
    <div>
      <h1>Log Out</h1>
      <Link to="/logout"></Link>
    </div>
  );
};

export default LogOut;
