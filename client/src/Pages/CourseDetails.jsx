import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function CourseDetails() {
  const { id } = useParams();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCourse = async () => {
    try {
      const res = await api.get(`/course/${id}`);

      if (res.data.success) {
        setCourse(res.data.course);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCourse();
  }, [id]);

  if (loading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </div>
    );
  }

  if (!course) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <h1 className="text-2xl font-semibold">Course not found.</h1>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      <div className="grid gap-10 lg:grid-cols-2">
        <img
          src={course.thumbnail || "https://placehold.co/700x450?text=Course"}
          alt={course.title}
          className="h-[400px] w-full rounded-2xl object-cover shadow-lg"
        />

        <div className="space-y-5">
          <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-semibold text-primary">
            {course.category}
          </span>

          <h1 className="text-4xl font-bold">
            {course.title}
          </h1>

          <p className="text-slate-600">
            {course.description}
          </p>

          <div className="space-y-2">
            <p>
              <span className="font-semibold">Instructor:</span>{" "}
              {course.createdBy?.fullName || "Admin"}
            </p>

            <p>
              <span className="font-semibold">Level:</span>{" "}
              {course.level}
            </p>

            <p className="text-3xl font-bold text-primary">
              ₹{course.price || 0}
            </p>
          </div>

          <button className="rounded-xl bg-primary px-8 py-3 font-semibold text-black transition hover:opacity-90">
            Enroll Now
          </button>
        </div>
      </div>
    </div>
  );
}