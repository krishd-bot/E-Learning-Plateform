import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useEffect, useState } from "react";

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [user, setUser] = useState(null);

  useEffect(() => {
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    setUser(loggedInUser);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link to="/" className="text-2xl font-bold text-primary">
          Dudemy
        </Link>

        <div className="flex items-center gap-8">
          <Link to="/" className="font-medium hover:text-primary">
            Home
          </Link>

          <Link to="/courses" className="font-medium hover:text-primary">
            Courses
          </Link>

          {user?.role === "ADMIN" && (
            <Link
              to="/dashboard/create-course"
              className="font-medium text-primary"
            >
              Create Course
            </Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-full border px-3 py-2"
              >
                <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary font-bold text-black">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>

                <div className="hidden md:block">
                  <p className="font-semibold">{user.fullName}</p>
                  <p className="text-xs text-slate-500">{user.role}</p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-lg bg-red-500 px-4 py-2 text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-lg border px-4 py-2"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-lg bg-primary px-4 py-2 text-black"
              >
                Signup
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}