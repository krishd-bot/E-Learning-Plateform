import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function DashboardCourses() {
  const [courses, setCourses] = useState([]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/course");
      setCourses(res.data.courses);
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch courses");
    }
  };

  const deleteCourse = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this course?"
    );

    if (!confirmDelete) return;

    try {
      const res = await api.delete(`/course/${id}`);

      toast.success(res.data.message);

      setCourses((prevCourses) =>
        prevCourses.filter((course) => course._id !== id)
      );
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to delete course"
      );
    }
  };

  useEffect(() => {
    fetchCourses();
  }, []);

  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
  {courses.map((course) => (
    <div
      key={course._id}
      className="rounded-xl border bg-white p-5 shadow"
    >
      <h2 className="text-xl font-bold">
        {course.title}
      </h2>

      <p className="mt-3 line-clamp-3 text-gray-600">
        {course.description}
      </p>

      <div className="mt-4 space-y-2 text-sm">
        <p>
          <strong>Category:</strong> {course.category}
        </p>

        <p>
          <strong>Level:</strong> {course.level}
        </p>

        <p>
          <strong>Price:</strong> ₹{course.price}
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link
          to={`/dashboard/edit-course/${course._id}`}
          className="rounded-lg bg-blue-500 px-4 py-2 text-white transition hover:bg-blue-600"
        >
          Edit
        </Link>

        <Link
          to={`/dashboard/course/${course._id}/lectures`}
          className="rounded-lg bg-purple-600 px-4 py-2 text-white transition hover:bg-purple-700"
        >
          Lectures
        </Link>

        <button
          onClick={() => deleteCourse(course._id)}
          className="rounded-lg bg-red-500 px-4 py-2 text-white transition hover:bg-red-600"
        >
          Delete
        </button>
      </div>
    </div>
  ))}
</div>
  );
}