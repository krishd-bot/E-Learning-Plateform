import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaSearch, FaMoon, FaSun, FaBars } from "react-icons/fa";

import { logoutUser } from "../Redux/Slices/AuthSlice.js";
import { toggleTheme } from "../Redux/Slices/ThemeSlice.js";

const Navbar = () => {
  const [search, setSearch] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { theme } = useSelector((state) => state.theme);

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/courses?search=${encodeURIComponent(search)}`);
    setMenuOpen(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUser());
    navigate("/");
  };

  return (
    <nav className="sticky top-0 z-50 bg-base-100/90 backdrop-blur-lg border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-5 py-3 flex items-center gap-5">
        {/* Logo */}
        <Link
          to="/"
          className="text-3xl font-black tracking-tight text-primary hover:scale-105 transition-transform duration-200 shrink-0"
        >
          Dudemy
        </Link>

      
        <form
          onSubmit={handleSearch}
          className="hidden md:flex flex-1 max-w-2xl"
        >
          <div className="join w-full">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search for courses..."
              className="input input-bordered join-item w-full focus:border-primary focus:outline-none"
            />

            <button type="submit" className="btn btn-primary join-item px-5">
              <FaSearch />
            </button>
          </div>
        </form>

        {/* Desktop Navigation */}
        <div className="hidden md:flex items-center gap-2 ml-auto">
          <Link to="/courses" className="btn btn-ghost btn-sm rounded-full">
            Courses
          </Link>

          <Link to="/about" className="btn btn-ghost btn-sm rounded-full">
            About
          </Link>

          <button
            onClick={() => dispatch(toggleTheme())}
            className="btn btn-ghost btn-circle hover:bg-base-200"
            aria-label="Toggle theme"
          >
            {theme === "dudemy" ? <FaMoon /> : <FaSun />}
          </button>

          {isLoggedIn ? (
            <div className="dropdown dropdown-end">
              <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                <div className="w-10 rounded-full ring ring-primary ring-offset-2 ring-offset-base-100">
                  <img src={user?.avatar?.secure_url} alt={user?.fullName} />
                </div>
              </label>

              <ul
                tabIndex={0}
                className="mt-4 p-2 menu menu-sm dropdown-content bg-base-100 rounded-2xl w-56 border border-base-300 shadow-xl z-50"
              >
                {user?.role === "ADMIN" && (
                  <li>
                    <Link to="/admin/dashboard">Admin Dashboard</Link>
                  </li>
                )}

                <li>
                  <Link to="/my-courses">My Courses</Link>
                </li>

                <li>
                  <Link to="/wishlist">Wishlist</Link>
                </li>

                <li>
                  <Link to="/profile">Profile</Link>
                </li>

                <li>
                  <button
                    onClick={handleLogout}
                    className="text-error hover:bg-error hover:text-error-content font-semibold"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <div className="flex gap-2">
              <Link to="/login" className="btn btn-ghost btn-sm rounded-full">
                Login
              </Link>

              <Link
                to="/signup"
                className="btn btn-primary btn-sm rounded-full px-5"
              >
                Sign up
              </Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden ml-auto btn btn-ghost btn-circle"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <FaBars />
        </button>
      </div>
      {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-300 shadow-lg">
          <div className="px-5 py-5 flex flex-col gap-3">
            {/* Search */}
            <form onSubmit={handleSearch} className="join w-full">
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search for courses..."
                className="input input-bordered join-item w-full focus:border-primary"
              />
              <button type="submit" className="btn btn-primary join-item">
                <FaSearch />
              </button>
            </form>

            <div className="divider my-1"></div>

            <Link
              to="/courses"
              onClick={() => setMenuOpen(false)}
              className="btn btn-ghost justify-start rounded-xl"
            >
              Courses
            </Link>

            <Link
              to="/about"
              onClick={() => setMenuOpen(false)}
              className="btn btn-ghost justify-start rounded-xl"
            >
              About
            </Link>

            <button
              onClick={() => dispatch(toggleTheme())}
              className="btn btn-ghost justify-start rounded-xl"
            >
              {theme === "dudemy" ? (
                <>
                  <FaMoon className="mr-2" />
                  Dark Mode
                </>
              ) : (
                <>
                  <FaSun className="mr-2" />
                  Light Mode
                </>
              )}
            </button>

            {isLoggedIn ? (
              <>
                <div className="divider my-1"></div>

                <div className="flex items-center gap-3 px-2 py-2">
                  <div className="avatar">
                    <div className="w-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                      <img
                        src={user?.avatar?.secure_url}
                        alt={user?.fullName}
                      />
                    </div>
                  </div>

                  <div>
                    <p className="font-semibold">{user?.fullName}</p>
                    <p className="text-xs opacity-60">{user?.email}</p>
                  </div>
                </div>

                {user?.role === "ADMIN" && (
                  <Link
                    to="/admin/dashboard"
                    onClick={() => setMenuOpen(false)}
                    className="btn btn-ghost justify-start rounded-xl"
                  >
                    Admin Dashboard
                  </Link>
                )}

                <Link
                  to="/my-courses"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost justify-start rounded-xl"
                >
                  My Courses
                </Link>

                <Link
                  to="/wishlist"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost justify-start rounded-xl"
                >
                  Wishlist
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-ghost justify-start rounded-xl"
                >
                  Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="btn btn-error btn-outline justify-start mt-2"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <div className="divider my-1"></div>

                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="btn btn-outline"
                >
                  Login
                </Link>

                <Link
                  to="/signup"
                  className="btn btn-primary rounded-full px-6 shadow-md hover:shadow-xl hover:scale-105 transition-all duration-300"
                >
                  Sign up
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
