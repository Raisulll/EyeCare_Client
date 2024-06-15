import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import Home from "./Components/Home";
import LogOut from "./Components/LogOut";
import Nav from "./Components/Nav";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import UpdateProduct from "./Components/UpdateProduct";
import Shop from "./Components/Shop";
import SignIn from "./Components/Signin";
import Forgot from "./Components/Forgot";
import OtherUserSignin from "./Components/OtherUserSIgnin";
import PrivateComponent from "./Components/PrivateComponent";
import Cart from "./Components/Cart";

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
              <Route path="/logout" element={<LogOut />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/cart" element={<Cart />} />
            </Route>
              <Route path="/" element={<Home />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/signin" element={<SignIn />} />
              <Route path="/otheruserssignin" element={<OtherUserSignin />} />
              <Route path="/forgotpassword" element={<Forgot />} />
          </Routes>
        </main>
      </BrowserRouter>
    </div>
  );
}
export default App;
