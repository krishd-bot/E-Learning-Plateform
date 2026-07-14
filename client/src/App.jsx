import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import About from "./pages/About";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import Payment from "./pages/Payment";
import Profile from "./pages/Profile";
import MyCourses from "./pages/MyCourses";

import DashboardLayout from "./layouts/DashBoardLayout";
import Dashboard from "./pages/DashBoard";
import DashboardCourses from "./pages/DashboardCourses";
import CreateCourse from "./pages/CreateCourse";
import ManageLectures from "./pages/ManageLectures";

function App() {
  return (
    <>
      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/payment/:courseId" element={<Payment />} />
        <Route path="/my-courses" element={<MyCourses />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Dashboard Routes */}
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />

          <Route
            path="courses"
            element={<DashboardCourses />}
          />

          <Route
            path="create-course"
            element={<CreateCourse />}
          />

          <Route
            path="course/:courseId/lectures"
            element={<ManageLectures />}
          />
        </Route>
      </Routes>
    </>
  );
}

export default App;