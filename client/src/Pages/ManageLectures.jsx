import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";

import Inputbox from "../Components/Inputbox.jsx";
import Loader from "../Components/Loader.jsx";
import {
  getCourseLectures,
  addLecture,
  deleteLecture,
} from "../Redux/Slices/LectureSlice.js";

const ManageLectures = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { lectures, loading } = useSelector((state) => state.lecture);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    videoUrl: "",
    duration: "",
  });
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    dispatch(getCourseLectures(id));
  }, [dispatch, id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.title) {
      toast.error("Lecture title is required");
      return;
    }
    setAdding(true);
    const res = await dispatch(addLecture({ courseId: id, data: formData }));
    setAdding(false);
    if (!res.error) {
      setFormData({ title: "", description: "", videoUrl: "", duration: "" });
    }
  };

  const handleDelete = (lectureId) => {
    dispatch(deleteLecture({ courseId: id, lectureId }));
  };

  return (
    <div className="max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Lectures</h1>
        <Link to="/admin/courses" className="btn btn-sm btn-outline">
          Back to Courses
        </Link>
      </div>

      <form onSubmit={handleAdd} className="card border border-base-200 p-6 mb-8 space-y-2">
        <h2 className="font-semibold mb-2">Add New Lecture</h2>
        <Inputbox
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          required
        />
        <Inputbox
          label="Description"
          name="description"
          textarea
          rows={2}
          value={formData.description}
          onChange={handleChange}
        />
        <Inputbox
          label="Video URL (YouTube embed link or direct video URL)"
          name="videoUrl"
          value={formData.videoUrl}
          onChange={handleChange}
          placeholder="https://www.youtube.com/embed/..."
        />
        <Inputbox
          label="Duration (minutes)"
          type="number"
          name="duration"
          value={formData.duration}
          onChange={handleChange}
        />
        <button type="submit" disabled={adding} className="btn btn-primary">
          {adding ? "Adding..." : "Add Lecture"}
        </button>
      </form>

      <h2 className="font-semibold mb-3">Existing Lectures</h2>
      {loading ? (
        <Loader />
      ) : lectures.length === 0 ? (
        <p className="opacity-60 text-sm">No lectures added yet.</p>
      ) : (
        <div className="space-y-2">
          {lectures.map((lecture, i) => (
            <div
              key={lecture._id}
              className="flex items-center justify-between border border-base-200 rounded-lg p-3"
            >
              <div>
                <p className="font-medium">
                  {i + 1}. {lecture.title}
                </p>
                {lecture.description && (
                  <p className="text-xs opacity-60">{lecture.description}</p>
                )}
                {lecture.duration > 0 && (
                  <p className="text-xs opacity-50">{lecture.duration} min</p>
                )}
              </div>
              <button
                onClick={() => handleDelete(lecture._id)}
                className="btn btn-sm btn-ghost text-error"
                aria-label="Delete lecture"
              >
                <FaTrash />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ManageLectures;
