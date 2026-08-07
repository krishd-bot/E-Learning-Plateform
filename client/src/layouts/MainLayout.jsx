import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../Components/Navbar.jsx";
import Footer from "../Components/Footer.jsx";

const MainLayout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-base-100 text-base-content">
      <Navbar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
