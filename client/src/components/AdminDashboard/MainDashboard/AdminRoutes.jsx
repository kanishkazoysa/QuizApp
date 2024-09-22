import React from "react";
import { Routes, Route } from "react-router-dom";
import UserManagement from "../DashboardChilds/UserManagement/UserManagement";
import CreateQuiz from "../DashboardChilds/Quiz/Quiz";
import DashboardStats from "../DashboardChilds/DashboardStats/DashboardStats";

function AdminRoutes() {
    return (
        <div className="main-container">
                <Routes>
                    <Route path="/" element={<DashboardStats />} />
                    <Route path="/users" element={<UserManagement />} />
                    <Route path="/quiz" element={<CreateQuiz />} />
                    <Route path="*" element={<UserManagement />} />
                </Routes>
        </div>
    );
}

export default AdminRoutes;