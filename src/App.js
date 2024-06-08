import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddProduct from "./Components/AddProduct";
import Footer from "./Components/Footer";
import Home from "./Components/Home";
import LogOut from "./Components/LogOut";
import Nav from "./Components/Nav";
import Profile from "./Components/Profile";
import SignUp from "./Components/SignUp";
import UpdateProduct from "./Components/UpdateProduct";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Nav />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/addproduct" element={<AddProduct/>} />
            <Route path="/updateproduct" element={<UpdateProduct />} />
            <Route path="/logout" element={<LogOut />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/signup" element={<SignUp />} />
          </Routes>
        </main>
      </BrowserRouter>
      <Footer />
    </div>
  );
}

export default App;
