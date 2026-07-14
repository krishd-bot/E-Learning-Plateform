import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function CreateCourse() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    title: "",
    description: "",
    category: "",
    level: "Beginner",
    price: "",
  });

  const handleChange = (e) => {
    setData({
      ...data,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !data.title ||
      !data.description ||
      !data.category ||
      !data.price
    ) {
      return toast.error("Please fill all fields");
    }

    try {
      setLoading(true);

      const res = await api.post("/course", data);

      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/dashboard/courses");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create course");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl rounded-2xl bg-white p-8 shadow-lg">
      <h1 className="mb-8 text-3xl font-bold">
        Create New Course
      </h1>

      <form onSubmit={handleSubmit} className="space-y-5">

        <input
          type="text"
          name="title"
          placeholder="Course Title"
          value={data.title}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />

        <textarea
          rows={5}
          name="description"
          placeholder="Course Description"
          value={data.description}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />

        <input
          type="text"
          name="category"
          placeholder="Category"
          value={data.category}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />

        <select
          name="level"
          value={data.level}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        >
          <option>Beginner</option>
          <option>Intermediate</option>
          <option>Advanced</option>
        </select>

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={data.price}
          onChange={handleChange}
          className="w-full rounded-xl border px-4 py-3 outline-none focus:ring-2 focus:ring-primary"
        />

        <button
          disabled={loading}
          className="w-full rounded-xl bg-primary py-3 font-semibold text-black transition hover:opacity-90 disabled:opacity-50"
        >
          {loading ? "Creating..." : "Create Course"}
        </button>

      </form>
    </div>
  );
}