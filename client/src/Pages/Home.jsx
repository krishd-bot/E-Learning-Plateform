import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaGraduationCap, FaCertificate, FaChartLine } from "react-icons/fa";

import { getAllCourses } from "../Redux/Slices/CourseSlice.js";
import CourseCard from "../Components/CourseCard.jsx";
import Loader from "../Components/Loader.jsx";
import heroImg from "../assets/hero.png";

const Home = () => {
  const dispatch = useDispatch();
  const { courses, categories, loading } = useSelector((state) => state.course);

  useEffect(() => {
    dispatch(getAllCourses({ sort: "popular" }));
  }, [dispatch]);

  const featured = courses.slice(0, 6);

  return (
    <div>
  {/* Hero */}
  <section className="relative overflow-hidden bg-gradient-to-br from-primary/10 via-base-100 to-secondary/10">
    <div className="absolute top-0 left-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl -translate-x-24 -translate-y-24"></div>
    <div className="absolute bottom-0 right-0 w-80 h-80 bg-secondary/10 rounded-full blur-3xl translate-x-20 translate-y-20"></div>

    <div className="max-w-7xl mx-auto px-6 py-20 grid lg:grid-cols-2 gap-12 items-center relative">
      <div>
        <span className="badge badge-primary badge-outline mb-5 px-4 py-3">
          🚀 #1 Learning Platform
        </span>

        <h1 className="text-5xl lg:text-6xl font-black leading-tight">
          Learn Without{" "}
          <span className="text-primary">Limits</span>
        </h1>

        <p className="text-lg opacity-70 mt-6 leading-8 max-w-xl">
          Explore expertly crafted courses, track your progress,
          earn certificates, and build real-world skills at your own pace.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <Link
            to="/courses"
            className="btn btn-primary btn-lg shadow-lg hover:scale-105 transition-all"
          >
            Browse Courses
          </Link>

          <Link
            to="/signup"
            className="btn btn-outline btn-lg hover:scale-105 transition-all"
          >
            Get Started Free
          </Link>
        </div>
      </div>

      <div className="flex justify-center">
        <img
          src={heroImg}
          alt="Learning illustration"
          className="w-full max-w-lg drop-shadow-2xl hover:scale-105 duration-300"
        />
      </div>
    </div>
  </section>

  {/* Features */}
  <section className="max-w-7xl mx-auto px-6 py-20">
    <div className="grid md:grid-cols-3 gap-8">
      <div className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-2">
        <div className="card-body items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <FaGraduationCap className="text-3xl text-primary" />
          </div>

          <h3 className="font-bold text-xl">
            Expert-Led Courses
          </h3>

          <p className="opacity-70">
            Learn from carefully structured lectures across
            multiple categories and career paths.
          </p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-2">
        <div className="card-body items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <FaChartLine className="text-3xl text-primary" />
          </div>

          <h3 className="font-bold text-xl">
            Track Progress
          </h3>

          <p className="opacity-70">
            Stay motivated with progress tracking and complete
            every course confidently.
          </p>
        </div>
      </div>

      <div className="card bg-base-100 border border-base-200 shadow-xl hover:shadow-2xl transition duration-300 hover:-translate-y-2">
        <div className="card-body items-center text-center">
          <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-3">
            <FaCertificate className="text-3xl text-primary" />
          </div>

          <h3 className="font-bold text-xl">
            Earn Certificates
          </h3>

          <p className="opacity-70">
            Showcase your skills with professional certificates
            after completing courses.
          </p>
        </div>
      </div>
    </div>
  </section>

  {/* Categories */}
  {categories?.length > 0 && (
    <section className="max-w-7xl mx-auto px-6 py-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">
          Explore Categories
        </h2>

        <div className="w-20 h-1 bg-primary rounded-full"></div>
      </div>

      <div className="flex flex-wrap gap-4">
        {categories.map((cat) => (
          <Link
            key={cat}
            to={`/courses?category=${encodeURIComponent(cat)}`}
            className="badge badge-outline badge-lg px-6 py-5 hover:badge-primary hover:scale-105 transition-all cursor-pointer shadow-sm"
          >
            {cat}
          </Link>
        ))}
      </div>
    </section>
  )}

  {/* Popular Courses */}
  <section className="max-w-7xl mx-auto px-6 py-16">
    <div className="flex justify-between items-center mb-10">
      <div>
        <h2 className="text-3xl font-bold">
          Popular Courses
        </h2>

        <p className="opacity-70 mt-2">
          Most loved courses by our students
        </p>
      </div>

      <Link
        to="/courses"
        className="btn btn-outline btn-primary"
      >
        View All →
      </Link>
    </div>

    {loading ? (
      <Loader />
    ) : (
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {featured.map((course) => (
          <CourseCard
            key={course._id}
            course={course}
          />
        ))}
      </div>
    )}
  </section>
</div>
  );
};

export default Home;
