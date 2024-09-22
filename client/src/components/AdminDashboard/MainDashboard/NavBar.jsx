import React from "react"
import "./MainDashboard.css";

const NavBar = () => {

  return (
    <div style={{ marginLeft: 15, marginBottom: 10 }}>
      <div className="admin-dashboard-header">
        <div className="header-text">
          <h4 style={{color:"#dbdbdb"}}>KOREAN LANGUAGE COURSE</h4>
        </div>

        <div className="avatar-container">
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="avatar"
            className="avatar"
            />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
