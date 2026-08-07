import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import toast from "react-hot-toast";

import RatingStars from "./RatingStars.jsx";
import { toggleWishlist } from "../Redux/Slices/WishlistSlice.js";

const CourseCard = ({ course }) => {
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const isWishlisted = wishlist?.some((c) => c._id === course._id);

  const handleWishlist = (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      toast.error("Please login to use wishlist");
      return;
    }
    dispatch(toggleWishlist(course._id));
  };

  return (
    <Link
      to={`/courses/${course._id}`}
      className="card bg-base-100 shadow-md hover:shadow-xl transition-shadow border border-base-200 overflow-hidden group"
    >
      <div className="relative h-40 overflow-hidden">
        <img
          src={course.thumbnail?.secure_url}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <button
          onClick={handleWishlist}
          className="absolute top-2 right-2 bg-base-100/80 rounded-full p-2 hover:bg-base-100"
          aria-label="Toggle wishlist"
        >
          {isWishlisted ? (
            <FaHeart className="text-error" />
          ) : (
            <FaRegHeart className="text-base-content" />
          )}
        </button>
        <span className="absolute bottom-2 left-2 badge badge-primary badge-sm">
          {course.level}
        </span>
      </div>

      <div className="card-body p-4">
        <span className="text-xs uppercase tracking-wide text-primary font-semibold">
          {course.category}
        </span>
        <h3 className="font-bold text-base line-clamp-2">{course.title}</h3>
        <p className="text-sm opacity-70 line-clamp-2">{course.description}</p>

        <div className="flex items-center gap-2 mt-1">
          <RatingStars rating={course.ratingsAverage} />
          <span className="text-xs opacity-60">
            ({course.ratingsCount || 0})
          </span>
        </div>

        <div className="flex items-center justify-between mt-2">
          <span className="font-bold text-lg">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </span>
          <span className="text-xs opacity-60">
            {course.lectures?.length || 0} lectures
          </span>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
