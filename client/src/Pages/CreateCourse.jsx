import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";

import Inputbox from "../Components/Inputbox.jsx";
import { createCourse } from "../Redux/Slices/CourseSlice.js";

const CATEGORIES = [
  "Web Development",
  "Data Science",
  "Design",
  "Marketing",
  "Business",
  "Mobile Development",
  "Other",
];

const CreateCourse = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "Web Development",
    level: "Beginner",
    price: 0,
  });
  const [thumbnail, setThumbnail] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleThumbnail = (e) => {
    const file = e.target.files[0];
    if (file) {
      setThumbnail(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.category) {
      toast.error("Please fill all required fields");
      return;
    }

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));
    if (thumbnail) data.append("thumbnail", thumbnail);

    const res = await dispatch(createCourse(data));
    setLoading(false);

    if (!res.error) {
      navigate(`/admin/courses/${res.payload.course._id}/lectures`);
    }
  };

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-6">Create New Course</h1>

      <form onSubmit={handleSubmit} className="card border border-base-200 p-6 space-y-2">
        <Inputbox
          label="Course Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Inputbox
          label="Description"
          name="description"
          textarea
          rows={5}
          value={formData.description}
          onChange={handleChange}
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Category</span>
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-medium">Level</span>
            </label>
            <select
              name="level"
              value={formData.level}
              onChange={handleChange}
              className="select select-bordered w-full"
            >
              <option>Beginner</option>
              <option>Intermediate</option>
              <option>Advanced</option>
            </select>
          </div>
        </div>

        <Inputbox
          label="Price (USD, set 0 for free)"
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
        />

        <div className="form-control mb-4">
          <label className="label">
            <span className="label-text font-medium">Thumbnail</span>
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleThumbnail}
            className="file-input file-input-bordered w-full"
          />
          {preview && (
            <img
              src={preview}
              alt="preview"
              className="w-40 h-24 object-cover rounded mt-2"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Creating..." : "Create Course & Add Lectures"}
        </button>
      </form>
    </div>
  );
};

export default CreateCourse;
