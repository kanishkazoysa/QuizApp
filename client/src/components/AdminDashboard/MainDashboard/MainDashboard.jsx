import React from "react";
import SideMenu from "../MainDashboard/SideMenu";
import AdminRoutes from "./AdminRoutes";
import "./MainDashboard.css";

const MainDashboard = () => {
  return (
    <>
      <div className="Admin_DashboardContainer">
        <div className="Admin_SideMenuAndPageContent">
          <div className="admin_sidebar_container">
            <SideMenu />
          </div>
          <div className="Admin_PageContent">
            <AdminRoutes />
          </div>
        </div>
      </div>
    </>
  );
};

export default MainDashboard;
