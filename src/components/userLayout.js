import React from 'react';
import { useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "./header";
import Sidebar from "./sidebar";

const UserLayout = () => {
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);

  const toggleSidebar = () => setIsSidebarCollapsed(!isSidebarCollapsed);

  return (
    <div className="h-screen flex flex-col">
      <Header />
      {/* Sidebar and Content Below */}
      <div className="flex flex-grow overflow-hidden">
        {/* Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleSidebar={toggleSidebar}
        />

        {/* Main Content */}
        <div className="flex-grow p-4 overflow-y-auto bg-white">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default UserLayout;