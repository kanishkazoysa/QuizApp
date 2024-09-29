import React from "react";
import "./MainDashboard.css";
import { Avatar } from "antd";
import { LogoutOutlined } from "@ant-design/icons";
import { useAuthStore } from "../../../store/authStore";

const NavBar = () => {
  const { logout } = useAuthStore();

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="w-full flex items-center justify-center">
      <div className="w-11/12 h-16 rounded-full px-4 py-3 mt-3 flex justify-between items-center bg-white border-2 border-gray-300 shadow-md">
        <div className="flex">
          <h4 className="text-gray-400 ml-5">KOREAN LANGUAGE COURSE</h4>
        </div>
        <div className="flex gap-2">
          <img
            src="https://www.pngkey.com/png/full/114-1149878_setting-user-avatar-in-specific-size-without-breaking.png"
            alt="avatar"
            className="w-9 h-9 rounded-full cursor-pointer"
          />
          <button onClick={handleLogout} className="mr-2">
            <Avatar
              size={35}
              icon={<LogoutOutlined />}
              className="bg-transparent text-gray-900 rounded-full cursor-pointer"
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
