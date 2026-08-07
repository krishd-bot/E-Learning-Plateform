import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";

import Inputbox from "../Components/Inputbox.jsx";
import { loginUser } from "../Redux/Slices/AuthSlice.js";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const res = await dispatch(loginUser(formData));
    setLoading(false);
    if (!res.error) {
      const redirectTo = location.state?.from?.pathname || "/";
      navigate(redirectTo);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-12">
      <div className="card w-full max-w-md border border-base-200 shadow-md p-8">
        <h1 className="text-2xl font-bold text-center mb-1">Welcome Back</h1>
        <p className="text-center opacity-70 text-sm mb-6">
          Login to continue learning
        </p>

        <form onSubmit={handleSubmit}>
          <Inputbox
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="you@example.com"
            required
          />
          <Inputbox
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="••••••••"
            required
          />

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full mt-2"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <p className="text-center text-sm mt-4">
          Don't have an account?{" "}
          <Link to="/signup" className="link link-primary">
            Sign up
          </Link>
        </p>

        <div className="alert mt-6 text-xs">
          <span>
            Demo admin: admin@dudemy.com / admin123 · Demo student:
            student@dudemy.com / student123
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
