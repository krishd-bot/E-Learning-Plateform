import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, BookOpen, PlusCircle, LogOut } from "lucide-react";

export default function Sidebar() {
  const { pathname } = useLocation();

  const menus = [
    {
      name: "Dashboard",
      path: "/dashboard",
      icon: <LayoutDashboard size={20} />,
    },
    {
      name: "Courses",
      path: "/dashboard/courses",
      icon: <BookOpen size={20} />,
    },
    {
      name: "Create Course",
      path: "/dashboard/create-course",
      icon: <PlusCircle size={20} />,
    },
  ];

  return (
    <aside className="w-72 border-r border-slate-200 bg-white p-6">
      <h1 className="mb-10 text-3xl font-bold text-primary">LMS Admin</h1>

      <div className="space-y-2">
        {menus.map((menu) => (
          <Link
            key={menu.path}
            to={menu.path}
            className={`flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              pathname === menu.path
                ? "bg-primary font-semibold text-black"
                : "hover:bg-slate-100"
            }`}
          >
            {menu.icon}
            {menu.name}
          </Link>
        ))}

        <button className="mt-10 flex w-full items-center gap-3 rounded-xl bg-red-500 px-4 py-3 font-semibold text-white transition hover:bg-red-600">
          <LogOut size={20} />
          Logout
        </button>
      </div>
    </aside>
  );
}