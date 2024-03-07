import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  RiHome2Line,
  RiFlashlightLine,
  RiSettings2Line,
  RiUserLine,
} from "react-icons/ri";

import Settings from "./Settings";

const Sidebar = ({ isDrawerOpen, setIsDrawerOpen, onComponentChange }) => {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  // const [activeComponent, setActiveComponent] = useState("dashboard");

  const handleSideNavClick = (path) => {
    if (path === "settings") {
      setIsSettingsDialogOpen(true);
    } else {
      // Check if the path is different from the current location pathname
      const newPath = `/${path}`;
      if (newPath !== pathname) {
        navigate(newPath);
        // Open the sidebar when switching to a different path
        setIsDrawerOpen(true);
        onComponentChange(path);
      }
    }
  };

  const handleCloseSettingsDialog = () => {
    setIsSettingsDialogOpen(false);
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full bg-gray-900 p-4 z-50 sidebar-menu cursor-pointer transition-transform overflow-hidden ${
        isDrawerOpen ? "translate-x-0" : "-translate-x-full"
      }`}
      style={{ width: "256px" }}
    >
      {/* Logo and Dashboard link */}
      <div
        onClick={() => handleSideNavClick("dashboard")}
        className={`flex items-center pb-4 border-b border-b-gray-400   `}
      >
        <div className="w-8 h-8 rounded overflow-hidden">
          <img
            src="https://placehold.co/32x32"
            alt="logo"
            className="w-full h-full object-cover"
          />
        </div>
        <span className="text-lg font-bold text-white ml-3">My App</span>
      </div>

      {/* Sidebar navigation div */}
      <ul className="mt-4">
        {/* Dashboard div */}
        <li className="mb-1">
          <div
            onClick={() => handleSideNavClick("dashboard")}
            className={`flex items-center py-2 px-4 text-gray-300 focus:bg-gray-800 focus:ring-2  hover:bg-gray-950 hover:text-gray-100 rounded-md focus:outline-none focus-visible:bg-gray-800 ${
              pathname === "/dashboard" ? "bg-gray-950 text-gray-100" : ""
            }`}
          >
            <RiHome2Line className="mr-3 text-lg" />
            <span className="text-sm">Dashboard</span>
          </div>
        </li>

        {/* Membership div */}
        <li className="mb-1">
          <div
            onClick={() => handleSideNavClick("membership")}
            className={`flex items-center py-2 px-4 text-gray-300 focus:bg-gray-800  focus:ring-2 hover:bg-gray-950 hover:text-gray-100 rounded-md focus:outline-none focus-visible:bg-gray-800 ${
              pathname === "/membership" ? "bg-gray-950 text-gray-100" : ""
            } `}
          >
            <RiFlashlightLine className="mr-3 text-lg" />
            <span className="text-sm">Membership</span>
          </div>
        </li>

        {/* User div */}
        <li className="mb-1">
          <div
            onClick={() => handleSideNavClick("user")}
            className={`flex items-center py-2 px-4 text-gray-300 focus:bg-gray-800  focus:ring-2 hover:bg-gray-950 hover:text-gray-100 rounded-md focus:outline-none focus-visible:bg-gray-800 ${
              pathname === "/User" ? "bg-gray-950 text-gray-100" : ""
            } `}
          >
            <RiUserLine className="mr-3 text-lg" />
            <span className="text-sm">User</span>
          </div>
        </li>

        {/* Settings div */}
        <li className="mb-1">
          <div
            onClick={() => handleSideNavClick("settings")}
            className="flex items-center py-2 px-4 text-gray-300 focus:bg-gray-800 focus:ring-2 hover:bg-gray-950 hover:text-gray-100 rounded-md focus:outline-none focus-visible:bg-gray-800 "
          >
            <RiSettings2Line className="mr-3 text-lg" />
            <span className="text-sm">Settings</span>
          </div>
        </li>
      </ul>
      <Settings
        open={isSettingsDialogOpen}
        handleClose={handleCloseSettingsDialog}
      />
    </div>
  );
};

export default Sidebar;
