import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { FaHeart, FaRegHeart, FaLock, FaCheckCircle, FaPlayCircle } from "react-icons/fa";

import axiosInstance from "../api/axios.js";
import RatingStars from "../Components/RatingStars.jsx";
import RatingInput from "../Components/RatingInput.jsx";
import ProgressBar from "../Components/ProgressBar.jsx";
import Loader from "../Components/Loader.jsx";
import { enrollFreeCourse, markLectureComplete, getMyCourses } from "../Redux/Slices/EnrollmentSlice.js";
import { toggleWishlist, getWishlist } from "../Redux/Slices/WishlistSlice.js";
import { addReview } from "../Redux/Slices/ReviewSlice.js";

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const { isLoggedIn, user } = useSelector((state) => state.auth);
  const { myCourses } = useSelector((state) => state.enrollment);
  const wishlist = useSelector((state) => state.wishlist.wishlist);

  const enrollment = myCourses.find((e) => e.course?._id === id);
  const isEnrolled = !!enrollment;
  const isWishlisted = wishlist?.some((c) => c._id === id);

  const fetchCourse = async () => {
    setLoading(true);
    try {
      const res = await axiosInstance.get(`/course/${id}`);
      setCourse(res.data.course);
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to load course");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCourse();
    if (isLoggedIn) {
      dispatch(getMyCourses());
      dispatch(getWishlist());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, isLoggedIn]);

  const handleEnroll = async () => {
    if (!isLoggedIn) {
      toast.error("Please login to enroll");
      navigate("/login");
      return;
    }
    if (course.price > 0) {
      navigate(`/payment/${course._id}`);
      return;
    }
    await dispatch(enrollFreeCourse(course._id));
    dispatch(getMyCourses());
  };

  const handleWishlist = () => {
    if (!isLoggedIn) {
      toast.error("Please login to use wishlist");
      return;
    }
    dispatch(toggleWishlist(course._id));
  };

  const handleLectureComplete = async (lectureId) => {
    await dispatch(markLectureComplete({ courseId: course._id, lectureId }));
    dispatch(getMyCourses());
  };

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!rating) {
      toast.error("Please select a rating");
      return;
    }
    setSubmitting(true);
    const res = await dispatch(addReview({ courseId: course._id, rating, comment }));
    setSubmitting(false);
    if (!res.error) {
      setComment("");
      setRating(0);
      fetchCourse();
    }
  };

  if (loading) return <Loader />;
  if (!course) return <p className="text-center py-16">Course not found.</p>;

  const isCompletedLecture = (lectureId) =>
    enrollment?.completedLectures?.some((l) => l.lectureId === lectureId);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-8">
        <div>
          <span className="badge badge-primary mb-2">{course.category}</span>
          <h1 className="text-3xl font-bold mb-2">{course.title}</h1>
          <div className="flex items-center gap-3 mb-2">
            <RatingStars rating={course.ratingsAverage} />
            <span className="text-sm opacity-70">
              {course.ratingsAverage} ({course.ratingsCount} ratings)
            </span>
          </div>
          <p className="opacity-80">{course.description}</p>
          <p className="text-sm opacity-60 mt-2">
            Created by {course.createdByName} · {course.level}
          </p>
        </div>

        <img
          src={course.thumbnail?.secure_url}
          alt={course.title}
          className="w-full rounded-xl max-h-96 object-cover"
        />

        {isEnrolled && (
          <div className="card border border-base-200 p-4">
            <h3 className="font-semibold mb-2">Your Progress</h3>
            <ProgressBar progress={enrollment.progress} />
            {enrollment.progress === 100 && (
              <Link
                to={`/certificate/${course._id}`}
                className="btn btn-sm btn-secondary mt-3 w-fit"
              >
                View Certificate
              </Link>
            )}
          </div>
        )}

        <div>
          <h2 className="text-xl font-bold mb-3">Course Content</h2>
          <div className="space-y-2">
            {course.lectures.length === 0 && (
              <p className="opacity-60 text-sm">No lectures added yet.</p>
            )}
            {course.lectures.map((lecture, i) => {
              const done = isCompletedLecture(lecture._id);
              return (
                <div
                  key={lecture._id}
                  className="flex items-center justify-between border border-base-200 rounded-lg p-3"
                >
                  <div className="flex items-center gap-3">
                    {isEnrolled ? (
                      done ? (
                        <FaCheckCircle className="text-success" />
                      ) : (
                        <FaPlayCircle className="text-primary" />
                      )
                    ) : (
                      <FaLock className="opacity-50" />
                    )}
                    <div>
                      <p className="font-medium">
                        {i + 1}. {lecture.title}
                      </p>
                      {lecture.description && (
                        <p className="text-xs opacity-60">{lecture.description}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    {lecture.duration > 0 && (
                      <span className="text-xs opacity-60">{lecture.duration} min</span>
                    )}
                    {isEnrolled && !done && (
                      <button
                        onClick={() => handleLectureComplete(lecture._id)}
                        className="btn btn-xs btn-outline"
                      >
                        Mark complete
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-bold mb-3">Ratings & Reviews</h2>

          {isEnrolled && (
            <form
              onSubmit={handleReviewSubmit}
              className="card border border-base-200 p-4 mb-4 space-y-3"
            >
              <p className="font-medium">Leave a review</p>
              <RatingInput value={rating} onChange={setRating} />
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share your thoughts about this course..."
                className="textarea textarea-bordered w-full"
                rows={3}
              />
              <button
                type="submit"
                disabled={submitting}
                className="btn btn-primary btn-sm w-fit"
              >
                Submit Review
              </button>
            </form>
          )}

          <div className="space-y-3">
            {course.reviews.length === 0 && (
              <p className="opacity-60 text-sm">No reviews yet. Be the first!</p>
            )}
            {course.reviews.map((review) => (
              <div key={review._id} className="border border-base-200 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <p className="font-medium">{review.userName}</p>
                  <RatingStars rating={review.rating} />
                </div>
                {review.comment && (
                  <p className="text-sm opacity-70 mt-1">{review.comment}</p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div>
        <div className="card border border-base-200 shadow-md p-5 sticky top-24">
          <p className="text-3xl font-bold mb-4">
            {course.price > 0 ? `$${course.price.toFixed(2)}` : "Free"}
          </p>

          {isEnrolled ? (
            <button className="btn btn-success w-full mb-3" disabled>
              Enrolled
            </button>
          ) : (
            <button onClick={handleEnroll} className="btn btn-primary w-full mb-3">
              {course.price > 0 ? "Buy Now" : "Enroll for Free"}
            </button>
          )}

          <button
            onClick={handleWishlist}
            className="btn btn-outline w-full flex items-center gap-2"
          >
            {isWishlisted ? <FaHeart className="text-error" /> : <FaRegHeart />}
            {isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
          </button>

          <div className="divider" />

          <ul className="text-sm space-y-2 opacity-80">
            <li>📚 {course.lectures.length} lectures</li>
            <li>🎯 Level: {course.level}</li>
            <li>🎓 Certificate on completion</li>
            <li>♾️ Lifetime access</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
