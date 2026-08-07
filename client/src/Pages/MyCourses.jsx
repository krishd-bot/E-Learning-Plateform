import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getMyCourses } from "../Redux/Slices/EnrollmentSlice.js";
import ProgressBar from "../Components/ProgressBar.jsx";
import Loader from "../Components/Loader.jsx";

const MyCourses = () => {
  const dispatch = useDispatch();
  const { myCourses, loading } = useSelector((state) => state.enrollment);

  useEffect(() => {
    dispatch(getMyCourses());
  }, [dispatch]);

  if (loading) return <Loader />;

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">My Courses</h1>

      {myCourses.length === 0 ? (
        <div className="text-center py-16">
          <p className="opacity-70 mb-4">
            You haven't enrolled in any courses yet.
          </p>
          <Link to="/courses" className="btn btn-primary">
            Browse Courses
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {myCourses.map(
            (item) =>
              item.course && (
                <div
                  key={item.course._id}
                  className="card border border-base-200 shadow-sm overflow-hidden"
                >
                  <div className="flex">
                    <img
                      src={item.course.thumbnail?.secure_url}
                      alt={item.course.title}
                      className="w-32 h-32 object-cover"
                    />
                    <div className="p-4 flex-1">
                      <h3 className="font-bold line-clamp-1">
                        {item.course.title}
                      </h3>
                      <p className="text-xs opacity-60 mb-2">
                        {item.course.category}
                      </p>
                      <ProgressBar progress={item.progress} />
                      <div className="flex gap-2 mt-3">
                        <Link
                          to={`/courses/${item.course._id}`}
                          className="btn btn-xs btn-primary"
                        >
                          Continue
                        </Link>
                        {item.progress === 100 && (
                          <Link
                            to={`/certificate/${item.course._id}`}
                            className="btn btn-xs btn-secondary"
                          >
                            Certificate
                          </Link>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      )}
    </div>
  );
};

export default MyCourses;
