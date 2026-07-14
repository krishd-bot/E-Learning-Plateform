import { Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import CreateCourse from "./pages/CreateCourse";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Courses from "./pages/Courses";
import CourseDetails from "./pages/CourseDetails";
import DashboardLayout from "./layouts/DashBoardLayout";
import Dashboard from "./pages/DashBoard";
function App() {
  return (
    <>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/course/:id" element={<CourseDetails />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<Dashboard />} />
        </Route>
       <Route path="/dashboard/create-course" element={<CreateCourse />} />
      </Routes>
    </>
  );
}

export default App;
