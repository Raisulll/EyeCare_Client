import { useState } from "react";
import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import "./App.css";
import DeliveryProfile from "./Components/Delivery Agency/DeliveryProfile";
import DoctorAppointments from "./Components/Doctor/DoctorAppointments";
import DoctorEditProfile from "./Components/Doctor/DoctorEditProfile";
import DoctorProfile from "./Components/Doctor/DoctorProfile";
import DoctorTransaction from "./Components/Doctor/DoctorTransaction";
import Prescription from "./Components/Doctor/Prescription";
import Hospital from "./Components/Hospital/Hospital";
import Banner from "./Components/Others/Banner";
import Card from "./Components/Others/Card";
import Home from "./Components/Others/Home";
import Nav from "./Components/Others/Nav";
import PrivateComponent from "./Components/Others/PrivateComponent";
import Cart from "./Components/Patient/Cart";
import GetAppointment from "./Components/Patient/GetAppointment";
import PatientTransaction from "./Components/Patient/PatientTransaction";
import Products from "./Components/Patient/Products";
import UserProfile from "./Components/Patient/UserProfile";
import ViewPrescription from "./Components/Patient/ViewPrescription";
import AddProduct from "./Components/Shop/AddProduct";
import Shop from "./Components/Shop/Shop";
import UpdateProduct from "./Components/Shop/UpdateProduct";
import DeliverySignUp from "./Components/Signin-Signup/DeliverySignUp";
import DoctorSignUP from "./Components/Signin-Signup/DoctorSignUp";
import Forgot from "./Components/Signin-Signup/Forgot";
import HospitalSignUP from "./Components/Signin-Signup/HospitalSignUp";
import OTP from "./Components/Signin-Signup/OTP";
import OtherUserSignin from "./Components/Signin-Signup/OtherUserSIgnin";
import OtherUserSignUp from "./Components/Signin-Signup/OtherUserSignUp";
import ResetPassword from "./Components/Signin-Signup/ResetPassword";
import ShopSignUp from "./Components/Signin-Signup/ShopSignUp";
import SignUp from "./Components/Signin-Signup/SignUp";
import SignIn from "./Components/Signin-Signup/Signin";
import ProductDetails from "./Components/Patient/ProductDetails";
import AllDoctors from "./Components/Others/AllDoctors";
import AllAppointments from "./Components/Patient/AllAppointments";
import ViewDoctorProfile from "./Components/Doctor/ViewDoctorProfile";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AppContent /> {/* Moved the logic inside AppContent */}
      </BrowserRouter>
    </div>
  );
}

function AppContent() {
  const location = useLocation(); // Now inside the BrowserRouter context
  const [user, setUser] = useState(localStorage.getItem("user"));
  return (
    <>
      {/* Render Nav only if not on the landing page */}
      {location.pathname !== "/"  && <Nav user={user} />}

      <main>
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/shopprofile" element={<Shop />} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route
              path="/profile"
              element={<UserProfile setUser={setUser} />}
            />
            <Route path="/cart" element={<Cart />} />
            <Route path="/doctorprofile" element={<DoctorProfile />} />
            <Route path="/doctoreditprofile" element={<DoctorEditProfile />} />
            <Route
              path="/doctorappointments"
              element={<DoctorAppointments />}
            />
            <Route path="/hospitalprofile" element={<Hospital />} />
            <Route path="/prescription" element={<Prescription />} />
            <Route path="/doctortransaction" element={<DoctorTransaction />} />
            <Route
              path="/patienttransaction"
              element={<PatientTransaction />}
            />
            <Route path="/viewprescription" element={<ViewPrescription />} />
            <Route path="/products" element={<Products />} />
            <Route path="/card" element={<Card />} />
            <Route path="/deliveryprofile" element={<DeliveryProfile />} />
            <Route path="/alldoctors" element={<AllDoctors />} />
            <Route path="/allappointments" element={<AllAppointments />} />
            <Route path="/viewdoctorprofile/:doctorId" element={<ViewDoctorProfile />} />
          </Route>

          <Route path="/" element={<Banner />} />
          <Route path="/home" element={<Home />} />
          <Route path="/signup" element={<SignUp />} />
          <Route
            path="/signin"
            element={<SignIn user={user} setUser={setUser} />}
          />
          <Route path="/otheruserssignin" element={<OtherUserSignin />} />
          <Route path="/otheruserssignup" element={<OtherUserSignUp />} />
          <Route path="/forgotpassword" element={<Forgot />} />
          <Route path="/otp" element={<OTP />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/doctorsignup" element={<DoctorSignUP />} />
          <Route path="/shopsignup" element={<ShopSignUp />} />
          <Route path="/hospitalsignup" element={<HospitalSignUP />} />
          <Route path="/doctorProfile" element={<DoctorProfile />} />
          <Route path="/DoctorAppointment" element={<DoctorAppointments />} />
          <Route path="/GetAppointment" element={<GetAppointment />} />
          <Route path="/deliverysignup" element={<DeliverySignUp />} />
          <Route path="/productdetails" element={<ProductDetails />} />
        </Routes>
      </main>
    </>
  );
}

export default App;
