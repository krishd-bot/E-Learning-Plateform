import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function MyCourses() {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/user/my-courses");

      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load courses"
      );
    }
  };

  return (
    <div className="max-w-7xl mx-auto py-10 px-6">
      <h1 className="text-4xl font-bold mb-8">My Courses</h1>

      {courses.length === 0 ? (
        <h2 className="text-xl">No enrolled courses.</h2>
      ) : (
        <div className="grid md:grid-cols-3 gap-6">
          {courses.map((course) => (
            <div
              key={course._id}
              className="bg-white rounded-xl shadow overflow-hidden"
            >
              <img
                src={
                  course.thumbnail ||
                  "https://placehold.co/600x400?text=Course"
                }
                className="h-48 w-full object-cover"
              />

              <div className="p-5">
                <h2 className="text-xl font-bold">
                  {course.title}
                </h2>

                <p className="text-slate-600 mt-2">
                  {course.category}
                </p>

                <Link
                  to={`/course/${course._id}`}
                  className="mt-4 inline-block rounded-lg bg-primary px-5 py-2 font-semibold text-black"
                >
                  Continue Learning
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}