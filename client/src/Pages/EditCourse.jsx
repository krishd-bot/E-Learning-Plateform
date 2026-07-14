import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function EditCourse() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [course, setCourse] = useState({
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    category: "",
  });

  useEffect(() => {
    fetchCourse();
  }, []);

  const fetchCourse = async () => {
    try {
      const res = await api.get(`/course/${id}`);

      setCourse(res.data.course);
    } catch (error) {
      toast.error("Failed to load course");
    }
  };

  const handleChange = (e) => {
    setCourse({
      ...course,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await api.put(`/course/update/${id}`, course);

      toast.success("Course updated successfully");

      navigate("/dashboard");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Update failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-10">
      <h1 className="text-3xl font-bold mb-8">
        Edit Course
      </h1>

      <form
        onSubmit={handleSubmit}
        className="space-y-5"
      >
        <input
          name="title"
          value={course.title}
          onChange={handleChange}
          placeholder="Title"
          className="w-full border p-3 rounded"
        />

        <textarea
          name="description"
          value={course.description}
          onChange={handleChange}
          placeholder="Description"
          className="w-full border p-3 rounded"
        />

        <input
          name="price"
          type="number"
          value={course.price}
          onChange={handleChange}
          placeholder="Price"
          className="w-full border p-3 rounded"
        />

        <input
          name="thumbnail"
          value={course.thumbnail}
          onChange={handleChange}
          placeholder="Thumbnail URL"
          className="w-full border p-3 rounded"
        />

        <input
          name="category"
          value={course.category}
          onChange={handleChange}
          placeholder="Category"
          className="w-full border p-3 rounded"
        />

        <button
          disabled={loading}
          className="bg-primary px-6 py-3 rounded font-bold"
        >
          {loading ? "Updating..." : "Update Course"}
        </button>
      </form>
    </div>
  );
}