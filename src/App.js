import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import Cart from "./Components/Cart";
import DoctorSignUP from "./Components/DoctorSignUp";
import Forgot from "./Components/Forgot";
import Home from "./Components/Home";
import HospitalSignUP from "./Components/HospitalSignUp";
import Nav from "./Components/Nav";
import OTP from "./Components/OTP";
import OtherUserSignin from "./Components/OtherUserSIgnin";
import OtherUserSignUp from "./Components/OtherUserSignUp";
import PrivateComponent from "./Components/PrivateComponent";
import Profile from "./Components/Profile";
import ResetPassword from "./Components/ResetPassword";
import Shop from "./Components/Shop";
import ShopSignUp from "./Components/ShopSignUp";
import SignUp from "./Components/SignUp";
import SignIn from "./Components/Signin";
import UpdateProduct from "./Components/UpdateProduct";
import DoctorProfile from "./Components/DoctorProfile";
import DoctorEditProfile from "./Components/DoctorEditProfile";
import DoctorAppointments from "./Components/DoctorAppointments";

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
              <Route path="/shop" element={<Shop />} />
              <Route path="/updateproduct" element={<UpdateProduct />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/doctorprofile" element={<DoctorProfile />} />
              <Route path="/doctoreditprofile" element={<DoctorEditProfile />} />
              <Route path="/doctorappointments" element={<DoctorAppointments />} />
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
            <Route path="/DoctorAppointment" element={<DoctorAppointment />} />
            <Route path="/DoctorSurgery" element={<DoctorSurgery />} />

            /*** Hospital */
            <Route path="/hospital" element={<Hospital/>} />
            <Route path="/schedulepage" element={<SchedulePage/>} />
            <Route path="/editprofile" element={<EditProfilePage/>} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
