import { Routes, Route } from "react-router-dom";
import UserManagement from "../DashboardChilds/UserManagement/UserManagement.jsx";
import CreateQuiz from "../DashboardChilds/Quiz/Quiz";
import DashboardStats from "../DashboardChilds/DashboardStats/DashboardStats";
// import UserData from "../DashboardChilds/UserManagement/UserData.jsx";

function AdminRoutes() {
  return (
    <div className="main-container">
      <Routes>
        <Route path="/" element={<DashboardStats />} />
        <Route path="/users" element={<UserManagement />} />
        {/* <Route path="/users/adduser" element={<UserData />} /> */}
        <Route path="/quiz" element={<CreateQuiz />} />
        <Route path="*" element={<UserManagement />} />
      </Routes>
    </div>
  );
}

export default AdminRoutes;
