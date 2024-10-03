import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import Login from "./components/Pages/Login/Login";
import ForgetPassword from "./components/Pages/ForgetPassword/ForgetPassword";
import OtpPage from "./components/Pages/OtpPage/OtpPage";
import ChangePassword from "./components/Pages/ChangePassword/ChangePassword";
// import ProtectedRoutes from "./utils/ProtectedRoutes";
import Admin from "./components/AdminDashboard/MainDashboard/MainDashboard";
import NavBar from "./components/MainPageUser/MainPage/NavBar";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/otp" element={<OtpPage />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/admin/*" element={<Admin />} />
          {/* <Route path="/navbar" element={<NavBar />} /> */}
          <Route path="/user/*" element={<User/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
