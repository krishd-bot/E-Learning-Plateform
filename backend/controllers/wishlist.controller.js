import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getWishlist = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id).populate("wishlist");

  res.status(200).json({
    success: true,
    wishlist: user.wishlist,
  });
});

export const toggleWishlist = asyncHandler(async (req, res, next) => {
  const { courseId } = req.params;

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const user = await User.findById(req.user.id);

  const index = user.wishlist.findIndex((id) => id.toString() === courseId);

  let added;
  if (index > -1) {
    user.wishlist.splice(index, 1);
    added = false;
  } else {
    user.wishlist.push(courseId);
    added = true;
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: added ? "Added to wishlist" : "Removed from wishlist",
    added,
  });
});
