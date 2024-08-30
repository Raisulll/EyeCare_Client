import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Row,
  Toast,
} from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import "../../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function OtherUserSignin() {
  const [userType, setUserType] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // if a user is already logged in, they should be redirected to the home page
  useEffect(() => {
    const user = localStorage.getItem("user");
    if (user) {
      navigate("/");
    }
  });

  const collectData = async (e) => {
    e.preventDefault();
    const data = {
      userType: userType,
      doctorEmail: email,
      doctorPassword: password,
    };

    if (userType === "doctor") {
      delete data.userType;
      console.log("Doctor Data: ", data);
      try {
        const result = await fetch("http://localhost:5000/auth/doctorsignin", {
          method: "POST",
          body: JSON.stringify(data),
          headers: {
            "Content-Type": "application/json",
          },
        });
        console.log(result);
        if (result.status === 200) {
          const userInfo = await result.json();
          localStorage.setItem("user", JSON.stringify(userInfo));
          window.dispatchEvent(new Event("storage"));
          navigate("/doctorprofile", { state: { userInfo } });
          console.log("Doctor Sign In Successful");
        } else if (result.status === 401) {
          toast.error("Invalid Password!", {
            position: "top-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: undefined,
            theme: "colored",
          });
        } else if (result.status === 404) {
          toast.error("User not exists!", {
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
          toast.error("Server Issue!", {
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
        console.log(error);
      }
    } else if (userType === "shopOwner") {
      const shopData = {
        shopMail: email,
        shopPassword: password,
      };
      console.log("Shop Owner Data: ", shopData);
      const result = await fetch("http://localhost:5000/auth/shopsignin", {
        method: "POST",
        body: JSON.stringify(shopData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
        navigate("/shopprofile", { state: { userInfo } });
        console.log("Shop Owner Sign In Successful");
      } else if(result.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (result.status === 404) {
        toast.error("User not exists!", {
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
        toast.error("Server Issue!", {
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
    } else if (userType === "eyeHospitalManager") {
      const hospitalData = {
        hospitalMail: email,
        hospitalPassword: password,
      };
      console.log("Hospital Manager Data: ", hospitalData);
      const result = await fetch("http://localhost:5000/auth/hospitalsignin", {
        method: "POST",
        body: JSON.stringify(hospitalData),
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log(result);
      if (result.status === 200) {
        const userInfo = await result.json();
        localStorage.setItem("user", JSON.stringify(userInfo));
        window.dispatchEvent(new Event("storage"));
        navigate("/hospitalProfile", { state: { userInfo } });
        console.log("Hospital Sign In Successful");
      } else if (result.status === 401) {
        toast.error("Invalid Password!", {
          position: "top-right",
          autoClose: 2500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
      } else if (result.status === 404) {
        toast.error("User not exists!", {
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
        toast.error("Server Issue!", {
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
    } else {
      toast.error("Invalid UserType!!", {
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
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: "100vh" }}
    >
      <Row className="w-100 justify-content-center">
        <Col md={8} lg={6}>
          <Card className="cardcolor">
            <Card.Body>
              <Card.Title className="text-center mb-4">
                Other Users Sign In
              </Card.Title>
              <Form>
                <Form.Group className="mb-3" controlId="formUserType">
                  <Form.Label>Select User Type</Form.Label>
                  <Form.Control
                    as="select"
                    value={userType}
                    onChange={(e) => setUserType(e.target.value)}
                  >
                    <option value="">Select...</option>
                    <option value="doctor">Doctor</option>
                    <option value="shopOwner">Shop Owner</option>
                    <option value="eyeHospitalManager">
                      Eye Hospital Manager
                    </option>
                  </Form.Control>
                </Form.Group>
                <Form.Group
                  className="mb-3"
                  controlId="formBasicEmail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                >
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" placeholder="test@example.com" />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <div className="password-input-container">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      placeholder="Your Password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="password-input"
                    />
                    <FontAwesomeIcon
                      icon={showPassword ? faEye : faEyeSlash}
                      className="password-toggle-icon"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  </div>
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  onClick={collectData}
                >
                  Sign In
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>Forgot your password? </span>
                <NavLink
                  to="/forgotpassword"
                  className="forgot-password-link"
                  style={{ textDecoration: "none" }}
                >
                  Reset Password
                </NavLink>
              </div>
              <div className="d-flex justify-content-center mt-3">
                <NavLink
                  to="/signin"
                  className="other-users-signin-link"
                  style={{ textDecoration: "none" }}
                >
                  Patient Login
                </NavLink>
              </div>
              <div className="text-center mt-3">
                <span>Don't have an account? </span>
                <NavLink
                  to="/otheruserssignup"
                  className="other-users-signup-link"
                  style={{ textDecoration: "none" }}
                >
                  Other User Sign Up
                </NavLink>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ToastContainer />
    </Container>
  );
}

export default OtherUserSignin;
