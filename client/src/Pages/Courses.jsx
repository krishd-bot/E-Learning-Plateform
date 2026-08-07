import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { getAllCourses } from "../Redux/Slices/CourseSlice.js";
import CourseCard from "../Components/CourseCard.jsx";
import Loader from "../Components/Loader.jsx";

const LEVELS = ["All", "Beginner", "Intermediate", "Advanced"];

const Courses = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const { courses, categories, loading } = useSelector((state) => state.course);

  const [search, setSearch] = useState(searchParams.get("search") || "");
  const category = searchParams.get("category") || "All";
  const level = searchParams.get("level") || "All";
  const sort = searchParams.get("sort") || "";

  useEffect(() => {
    dispatch(
      getAllCourses({
        search: searchParams.get("search") || undefined,
        category: category !== "All" ? category : undefined,
        level: level !== "All" ? level : undefined,
        sort: sort || undefined,
      })
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  const updateParam = (key, value) => {
    const next = new URLSearchParams(searchParams);
    if (value && value !== "All") next.set(key, value);
    else next.delete(key);
    setSearchParams(next);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    updateParam("search", search);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-6">All Courses</h1>

      <div className="flex flex-col lg:flex-row gap-6">
        <aside className="lg:w-64 shrink-0 space-y-6">
          <form onSubmit={handleSearchSubmit} className="join w-full">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="input input-bordered join-item w-full"
            />
            <button className="btn btn-primary join-item">Go</button>
          </form>

          <div>
            <h3 className="font-semibold mb-2">Category</h3>
            <div className="flex flex-col gap-1">
              <button
                onClick={() => updateParam("category", "All")}
                className={`text-left px-2 py-1 rounded ${
                  category === "All" ? "bg-primary text-primary-content" : "hover:bg-base-200"
                }`}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => updateParam("category", cat)}
                  className={`text-left px-2 py-1 rounded ${
                    category === cat ? "bg-primary text-primary-content" : "hover:bg-base-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Level</h3>
            <div className="flex flex-col gap-1">
              {LEVELS.map((lvl) => (
                <button
                  key={lvl}
                  onClick={() => updateParam("level", lvl)}
                  className={`text-left px-2 py-1 rounded ${
                    level === lvl ? "bg-primary text-primary-content" : "hover:bg-base-200"
                  }`}
                >
                  {lvl}
                </button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-semibold mb-2">Sort By</h3>
            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => updateParam("sort", e.target.value)}
            >
              <option value="">Newest</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </aside>

        <div className="flex-1">
          {loading ? (
            <Loader />
          ) : courses.length === 0 ? (
            <p className="opacity-70 py-10 text-center">
              No courses matched your filters.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {courses.map((course) => (
                <CourseCard key={course._id} course={course} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Courses;
