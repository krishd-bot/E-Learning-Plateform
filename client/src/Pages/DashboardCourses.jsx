import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaEdit, FaTrash, FaBookOpen } from "react-icons/fa";

import { getAllCourses, deleteCourse } from "../Redux/Slices/CourseSlice.js";
import Loader from "../Components/Loader.jsx";

const DashboardCourses = () => {
  const dispatch = useDispatch();
  const { courses, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this course?")) {
      dispatch(deleteCourse(id));
    }
  };

  if (loading) return <Loader />;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Manage Courses</h1>
        <Link to="/admin/courses/create" className="btn btn-primary btn-sm">
          + New Course
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table">
          <thead>
            <tr>
              <th>Course</th>
              <th>Category</th>
              <th>Price</th>
              <th>Lectures</th>
              <th>Enrollments</th>
              <th>Rating</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courses.map((course) => (
              <tr key={course._id}>
                <td className="flex items-center gap-2">
                  <img
                    src={course.thumbnail?.secure_url}
                    alt={course.title}
                    className="w-10 h-10 rounded object-cover"
                  />
                  <span className="line-clamp-1 max-w-[200px]">
                    {course.title}
                  </span>
                </td>
                <td>{course.category}</td>
                <td>{course.price > 0 ? `$${course.price}` : "Free"}</td>
                <td>{course.lectures?.length || 0}</td>
                <td>{course.numOfEnrollments}</td>
                <td>{course.ratingsAverage || "—"}</td>
                <td>
                  <div className="flex gap-2">
                    <Link
                      to={`/admin/courses/${course._id}/edit`}
                      className="btn btn-xs btn-outline"
                      aria-label="Edit course"
                    >
                      <FaEdit />
                    </Link>
                    <Link
                      to={`/admin/courses/${course._id}/lectures`}
                      className="btn btn-xs btn-outline"
                      aria-label="Manage lectures"
                    >
                      <FaBookOpen />
                    </Link>
                    <button
                      onClick={() => handleDelete(course._id)}
                      className="btn btn-xs btn-error btn-outline"
                      aria-label="Delete course"
                    >
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {courses.length === 0 && (
          <p className="text-center py-10 opacity-60">No courses yet.</p>
        )}
      </div>
    </div>
  );
};

export default DashboardCourses;
