import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar.jsx";
import Sidebar from "../Components/Sidebar.jsx";

const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      <div className="flex flex-col md:flex-row flex-1 max-w-7xl mx-auto w-full">
        <Sidebar />
        <main className="flex-1 p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
