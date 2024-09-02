import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import DoctorAppointments from "./Components/Doctor/DoctorAppointments";
import DoctorEditProfile from "./Components/Doctor/DoctorEditProfile";
import DoctorProfile from "./Components/Doctor/DoctorProfile";
import Cart from "./Components/Patient/Cart";
import Home from "./Components/Others/Home";
import Nav from "./Components/Others/Nav";
import PrivateComponent from "./Components/Others/PrivateComponent";
import GetAppointment from "./Components/Patient/GetAppointment";
import AddProduct from "./Components/Shop/AddProduct";
import Shop from "./Components/Shop/Shop";
import UpdateProduct from "./Components/Shop/UpdateProduct";
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

import DoctorTransaction from "./Components/Doctor/DoctorTransaction";
import Prescription from "./Components/Doctor/Prescription";
import EditProfilePage from "./Components/Hospital/EditProfilePage";
import Hospital from "./Components/Hospital/Hospital";
import HospitalSchedule from "./Components/Hospital/HospitalSchedule";
import SchedulePage from "./Components/Hospital/SchedulePage";
import PatientTransaction from "./Components/Patient/PatientTransaction";
import Products from "./Components/Patient/Products";
import UserProfile from "./Components/Patient/UserProfile";
import ViewPrescription from "./Components/Patient/ViewPrescription";
import Card from "./Components/Others/Card";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            {/* Adding PrivateComponent here */}
            <Route element={<PrivateComponent />}>
              <Route path="/addproduct" element={<AddProduct />} />
              <Route path="/shopprofile" element={<Shop />} />
              <Route path="/updateproduct" element={<UpdateProduct />} />
              <Route path="/profile" element={<UserProfile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/doctorprofile" element={<DoctorProfile />} />
              <Route
                path="/doctoreditprofile"
                element={<DoctorEditProfile />}
              />
              <Route
                path="/doctorappointments"
                element={<DoctorAppointments />}
              />
              <Route path="/hospitalprofile" element={<Hospital />} />
              <Route path="/prescription" element={<Prescription />} />
              <Route
                path="/doctortransaction"
                element={<DoctorTransaction />}
              />
              <Route
                path="/patienttransaction"
                element={<PatientTransaction />}
              />
              <Route path="/hospitalschedule" element={<HospitalSchedule />} />
              <Route path="/viewprescription" element={<ViewPrescription />} />
              <Route path="/products" element={<Products />} />
              <Route path="/card" element={<Card />} />
              <Route path="/cart" element={<Cart />} /> 
            </Route>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/otheruserssignin" element={<OtherUserSignin />} />
            <Route path="/otheruserssignup" element={<OtherUserSignUp />} />
            <Route path="/forgotpassword" element={<Forgot />} />
            <Route path="/otp" element={<OTP />} />
            <Route path="/resetpassword" element={<ResetPassword />} />
            <Route path="/doctorsignup" element={<DoctorSignUP />} />
            <Route path="shopsignup" element={<ShopSignUp />} />
            <Route path="/hospitalsignup" element={<HospitalSignUP />} />
            <Route path="/doctorProfile" element={<DoctorProfile />} />
            <Route path="/DoctorAppointment" element={<DoctorAppointments />} />
            <Route path="/GetAppointment" element={<GetAppointment />} />
            /*** Hospital */
            <Route path="/hospital" element={<Hospital />} />
            <Route path="/schedulepage" element={<SchedulePage />} />
            <Route path="/editprofile" element={<EditProfilePage />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
