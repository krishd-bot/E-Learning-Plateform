import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import api from "../api/axios";
import CourseCard from "../components/CourseCard";

export default function Courses() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCourses = async () => {
    try {
      const res = await api.get("/course");

      if (res.data.success) {
        setCourses(res.data.courses);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourses();
  }, []);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading Courses...</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="mb-10 text-center">
        <h1 className="text-4xl font-bold">Explore Courses</h1>
        <p className="mt-2 text-slate-500">
          Learn from industry experts and level up your skills.
        </p>
      </div>

      {courses.length === 0 ? (
        <div className="flex h-60 items-center justify-center">
          <h2 className="text-xl font-semibold text-slate-500">
            No courses available.
          </h2>
        </div>
      ) : (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {courses.map((course) => (
            <CourseCard key={course._id} course={course} />
          ))}
        </div>
      )}
    </div>
  );
}