import { Routes, Route } from "react-router-dom";
import "./App.css";
import SignInPage from "./components/Pages/SignInPage";
import SignUpPage from "./components/Pages/SignUpPage";
import EmailVerificationPage from "./components/Pages/EmailVerificationPage";
import Admin from "./components/AdminDashboard/MainDashboard/MainDashboard";



function App() {
  return (
    
      <Routes>
        <Route path="/" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/verify-email" element={<EmailVerificationPage />} />

      </Routes>
  );
}

export default App;

