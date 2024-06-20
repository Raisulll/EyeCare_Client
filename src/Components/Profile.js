import React ,{useEffect} from "react";
import { Link, useNavigate } from "react-router-dom";

const Profile = () => {

    const navigate = useNavigate();

    // if a user is not logged in, they should be redirected to the home page
    useEffect(() => {
      const user = localStorage.getItem("user");
      if (!user) {
        navigate("/signin");
      }
    });
  return (
    <div>
      <Link to="/profile"></Link>
    </div>
  );
}

export default Profile;