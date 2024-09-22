import React from "react";
import SideMenu from "../MainDashboard/SideMenu";
import AdminRoutes from "./AdminRoutes";
import "./MainDashboard.css";
import NavBar from "./NavBar";

const MainDashboard = () => {
  return (
    <>
      <div className="Admin_DashboardContainer">
        <div className="Admin_SideMenuAndPageContent">
          <div className="admin_sidebar_container">
            <SideMenu />
          </div>
          <div className="Admin_PageContent">
            <NavBar />
            <AdminRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
