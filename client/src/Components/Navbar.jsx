import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Menu, X } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
    navigate("/login");
  };

  return (
    <header className="sticky top-0 z-50 border-b border-white/20 bg-white/80 backdrop-blur-xl">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">
        {/* Logo */}

        <Link to="/" className="text-3xl font-extrabold tracking-tight">
          <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Dudemy
          </span>
        </Link>

        {/* Desktop Menu */}

        <nav className="hidden items-center gap-8 lg:flex">
          <Link to="/" className="font-medium transition hover:text-indigo-600">
            Home
          </Link>
          <Link
            to="/about"
            className="font-medium transition hover:text-indigo-600"
          >
            About
          </Link>
          <Link
            to="/courses"
            className="font-medium transition hover:text-indigo-600"
          >
            Courses
          </Link>

          <Link
            to="/my-courses"
            className="font-medium transition hover:text-indigo-600"
          >
            My Courses
          </Link>

          {user?.role === "ADMIN" && (
            <>
              <Link
                to="/dashboard"
                className="font-medium transition hover:text-indigo-600"
              >
                Dashboard
              </Link>

              <Link
                to="/dashboard/create-course"
                className="font-medium transition hover:text-indigo-600"
              >
                Create Course
              </Link>

              <Link
                to="/dashboard/courses"
                className="font-medium transition hover:text-indigo-600"
              >
                Manage Courses
              </Link>
            </>
          )}
        </nav>

        {/* Right */}

        <div className="hidden items-center gap-4 lg:flex">
          {user ? (
            <>
              <Link
                to="/profile"
                className="flex items-center gap-3 rounded-full border border-slate-200 bg-white px-3 py-2 shadow-sm transition hover:shadow-lg"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 font-bold text-white">
                  {user.fullName?.charAt(0).toUpperCase()}
                </div>

                <div>
                  <p className="font-semibold">{user.fullName}</p>

                  <p className="text-xs uppercase tracking-wide text-slate-500">
                    {user.role}
                  </p>
                </div>
              </Link>

              <button
                onClick={handleLogout}
                className="rounded-xl bg-red-500 px-5 py-2 text-white transition hover:bg-red-600"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link
                to="/login"
                className="rounded-xl border border-slate-300 px-5 py-2 transition hover:border-indigo-500 hover:text-indigo-600"
              >
                Login
              </Link>

              <Link
                to="/signup"
                className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 px-5 py-2 font-semibold text-white shadow transition hover:shadow-lg"
              >
                Signup
              </Link>
            </>
          )}
        </div>

        {/* Mobile Button */}

        <button onClick={() => setOpen(!open)} className="lg:hidden">
          {open ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}

      {open && (
        <div className="border-t bg-white lg:hidden">
          <div className="flex flex-col p-6 space-y-5">
            <Link onClick={() => setOpen(false)} to="/">
              Home
            </Link>
            <Link
              to="/about"
              className="font-medium transition hover:text-indigo-600"
            >
              About
            </Link>

            <Link onClick={() => setOpen(false)} to="/courses">
              Courses
            </Link>

            <Link onClick={() => setOpen(false)} to="/my-courses">
              My Courses
            </Link>

            {user?.role === "ADMIN" && (
              <>
                <Link onClick={() => setOpen(false)} to="/dashboard">
                  Dashboard
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/dashboard/create-course"
                >
                  Create Course
                </Link>

                <Link onClick={() => setOpen(false)} to="/dashboard/courses">
                  Manage Courses
                </Link>
              </>
            )}

            {user ? (
              <>
                <Link onClick={() => setOpen(false)} to="/profile">
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="rounded-xl bg-red-500 py-3 text-white"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  onClick={() => setOpen(false)}
                  to="/login"
                  className="rounded-xl border py-3 text-center"
                >
                  Login
                </Link>

                <Link
                  onClick={() => setOpen(false)}
                  to="/signup"
                  className="rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 py-3 text-center text-white"
                >
                  Signup
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
