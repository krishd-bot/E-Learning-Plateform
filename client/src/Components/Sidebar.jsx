import React from "react";
import { NavLink } from "react-router-dom";
import {
  FaChartBar,
  FaBook,
  FaPlusCircle,
  FaHome,
} from "react-icons/fa";

const linkClass = ({ isActive }) =>
  `flex items-center gap-3 px-4 py-2 rounded-lg transition-colors ${
    isActive ? "bg-primary text-primary-content" : "hover:bg-base-200"
  }`;

const Sidebar = () => {
  return (
    <aside className="w-full md:w-64 shrink-0 border-r border-base-200 md:min-h-[calc(100vh-64px)] p-4">
      <p className="text-xs font-semibold uppercase opacity-60 mb-3 px-2">
        Admin Panel
      </p>
      <nav className="flex flex-col gap-1">
        <NavLink to="/admin/dashboard" className={linkClass} end>
          <FaChartBar /> Dashboard
        </NavLink>
        <NavLink to="/admin/courses" className={linkClass}>
          <FaBook /> Manage Courses
        </NavLink>
        <NavLink to="/admin/courses/create" className={linkClass}>
          <FaPlusCircle /> Create Course
        </NavLink>
        <NavLink to="/" className={linkClass}>
          <FaHome /> Back to Site
        </NavLink>
      </nav>
    </aside>
  );
};

export default Sidebar;
