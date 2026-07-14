import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import api from "../api/axios";

export default function ManageLectures() {
  const { courseId } = useParams();

  const [lectures, setLectures] = useState([]);
  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    title: "",
    description: "",
    videoUrl: "",
  });

  const fetchLectures = async () => {
    try {
      const res = await api.get(`/lecture/${courseId}`);

      if (res.data.success) {
        setLectures(res.data.lectures);
      }
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to fetch lectures"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLectures();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const addLecture = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post(
        `/lecture/${courseId}`,
        form
      );

      toast.success(res.data.message);

      setForm({
        title: "",
        description: "",
        videoUrl: "",
      });

      fetchLectures();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Failed to add lecture"
      );
    }
  };

  const deleteLecture = async (lectureId) => {
    const ok = window.confirm(
      "Delete this lecture?"
    );

    if (!ok) return;

    try {
      const res = await api.delete(
        `/lecture/${courseId}/${lectureId}`
      );

      toast.success(res.data.message);

      fetchLectures();
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Delete failed"
      );
    }
  };

  if (loading) {
    return (
      <div className="p-10 text-center text-2xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl p-6">

      <h1 className="mb-8 text-4xl font-bold">
        🎥 Manage Lectures
      </h1>

      {/* Add Lecture */}

      <form
        onSubmit={addLecture}
        className="mb-10 rounded-2xl bg-white p-6 shadow-lg"
      >
        <h2 className="mb-5 text-2xl font-bold">
          Add New Lecture
        </h2>

        <div className="grid gap-4">

          <input
            type="text"
            name="title"
            placeholder="Lecture Title"
            value={form.title}
            onChange={handleChange}
            required
            className="rounded-lg border p-3"
          />

          <textarea
            name="description"
            placeholder="Lecture Description"
            rows="4"
            value={form.description}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <input
            type="text"
            name="videoUrl"
            placeholder="Video URL"
            value={form.videoUrl}
            onChange={handleChange}
            className="rounded-lg border p-3"
          />

          <button
            className="rounded-lg bg-primary py-3 font-semibold text-black"
          >
            Add Lecture
          </button>

        </div>
      </form>

      {/* Lecture List */}

      <h2 className="mb-5 text-2xl font-bold">
        Lectures ({lectures.length})
      </h2>

      {lectures.length === 0 ? (
        <div className="rounded-xl border p-8 text-center">
          No lectures found.
        </div>
      ) : (
        <div className="space-y-5">

          {lectures.map((lecture, index) => (
            <div
              key={lecture._id}
              className="rounded-xl bg-white p-5 shadow"
            >
              <div className="flex items-center justify-between">

                <div>

                  <h3 className="text-xl font-bold">
                    {index + 1}. {lecture.title}
                  </h3>

                  <p className="mt-2 text-gray-600">
                    {lecture.description}
                  </p>

                  {lecture.videoUrl && (
                    <a
                      href={lecture.videoUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-blue-600 underline"
                    >
                      ▶ Watch Video
                    </a>
                  )}

                </div>

                <button
                  onClick={() =>
                    deleteLecture(lecture._id)
                  }
                  className="rounded-lg bg-red-500 px-5 py-2 text-white"
                >
                  Delete
                </button>

              </div>
            </div>
          ))}

        </div>
      )}

    </div>
  );
}