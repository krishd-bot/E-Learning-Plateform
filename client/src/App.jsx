import React, { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import MainLayout from "./layouts/MainLayout.jsx";
import DashboardLayout from "./layouts/DashboardLayout.jsx";
import ProtectedRoute from "./Components/ProtectedRoute.jsx";

import Home from "./Pages/Home.jsx";
import Courses from "./Pages/Courses.jsx";
import CourseDetails from "./Pages/CourseDetails.jsx";
import Login from "./Pages/Login.jsx";
import Signup from "./Pages/Signup.jsx";
import Profile from "./Pages/Profile.jsx";
import MyCourses from "./Pages/MyCourses.jsx";
import Wishlist from "./Pages/Wishlist.jsx";
import Certificate from "./Pages/Certificate.jsx";
import Payment from "./Pages/Payment.jsx";
import About from "./Pages/About.jsx";
import NotFound from "./Pages/NotFound.jsx";

import CreateCourse from "./Pages/CreateCourse.jsx";
import EditCourse from "./Pages/EditCourse.jsx";
import ManageLectures from "./Pages/ManageLectures.jsx";
import DashboardCourses from "./Pages/DashboardCourses.jsx";
import DashBoard from "./Pages/DashBoard.jsx";

import { getProfile } from "./Redux/Slices/AuthSlice.js";

function App() {
  const dispatch = useDispatch();
  const { theme } = useSelector((state) => state.theme);
  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
  }, [theme]);

  useEffect(() => {
    if (isLoggedIn) dispatch(getProfile());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/courses/:id" element={<CourseDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/my-courses"
          element={
            <ProtectedRoute>
              <MyCourses />
            </ProtectedRoute>
          }
        />
        <Route
          path="/wishlist"
          element={
            <ProtectedRoute>
              <Wishlist />
            </ProtectedRoute>
          }
        />
        <Route
          path="/certificate/:courseId"
          element={
            <ProtectedRoute>
              <Certificate />
            </ProtectedRoute>
          }
        />
        <Route
          path="/payment/:id"
          element={
            <ProtectedRoute>
              <Payment />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Route>

      <Route
        path="/admin"
        element={
          <ProtectedRoute adminOnly>
            <DashboardLayout />
          </ProtectedRoute>
        }
      >
        <Route path="dashboard" element={<DashBoard />} />
        <Route path="courses" element={<DashboardCourses />} />
        <Route path="courses/create" element={<CreateCourse />} />
        <Route path="courses/:id/edit" element={<EditCourse />} />
        <Route path="courses/:id/lectures" element={<ManageLectures />} />
      </Route>
    </Routes>
  );
}

export default App;
