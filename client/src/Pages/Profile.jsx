import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Profile() {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMyCourses();
  }, []);

  const getMyCourses = async () => {
    try {
      const res = await api.get("/user/my-courses");

      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to load courses"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <h1 className="mb-8 text-4xl font-bold">
        My Profile
      </h1>

      <div className="mb-10 rounded-2xl bg-white p-8 shadow">
        <div className="flex items-center gap-6">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-primary text-4xl font-bold text-black">
            {user?.fullName?.charAt(0).toUpperCase()}
          </div>

          <div>
            <h2 className="text-3xl font-bold">
              {user?.fullName}
            </h2>

            <p className="text-slate-600">
              {user?.email}
            </p>

            <span className="mt-2 inline-block rounded-full bg-primary px-4 py-1 text-sm font-semibold text-black">
              {user?.role}
            </span>
          </div>
        </div>
      </div>

      <h2 className="mb-6 text-3xl font-bold">
        Purchased Courses
      </h2>

      {loading ? (
        <div className="text-xl font-semibold">
          Loading...
        </div>
      ) : courses.length === 0 ? (
        <div className="rounded-xl bg-white p-10 text-center shadow">
          <h3 className="text-2xl font-semibold">
            No purchased courses yet.
          </h3>

          <p className="mt-2 text-slate-500">
            Purchase a course to start learning.
          </p>

          <Link
            to="/courses"
            className="mt-6 inline-block rounded-xl bg-primary px-6 py-3 font-semibold text-black"
          >
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {courses.map((course) => (
            <div
              key={course._id}
              className="overflow-hidden rounded-2xl bg-white shadow"
            >
              <img
                src={
                  course.thumbnail ||
                  "https://placehold.co/600x400?text=Course"
                }
                alt={course.title}
                className="h-52 w-full object-cover"
              />

              <div className="p-5">
                <h3 className="text-xl font-bold">
                  {course.title}
                </h3>

                <p className="mt-2 text-slate-600">
                  {course.category}
                </p>

                <p className="mt-3 text-2xl font-bold text-primary">
                  ₹{course.price}
                </p>

                <Link
                  to={`/course/${course._id}`}
                  className="mt-5 inline-block w-full rounded-xl bg-primary py-3 text-center font-semibold text-black"
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