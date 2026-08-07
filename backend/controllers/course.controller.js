import fs from "fs";
import path from "path";

import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAllCourses = asyncHandler(async (req, res) => {
  const { search, category, level, sort } = req.query;

  const filter = {};

  if (search) {
    filter.$or = [
      { title: { $regex: search, $options: "i" } },
      { description: { $regex: search, $options: "i" } },
      { category: { $regex: search, $options: "i" } },
    ];
  }

  if (category && category !== "All") {
    filter.category = category;
  }

  if (level && level !== "All") {
    filter.level = level;
  }

  let sortOption = { createdAt: -1 };
  if (sort === "price-asc") sortOption = { price: 1 };
  if (sort === "price-desc") sortOption = { price: -1 };
  if (sort === "rating") sortOption = { ratingsAverage: -1 };
  if (sort === "popular") sortOption = { numOfEnrollments: -1 };

  const courses = await Course.find(filter)
    .select("-lectures.videoUrl")
    .sort(sortOption);

  const categories = await Course.distinct("category");

  res.status(200).json({
    success: true,
    count: courses.length,
    categories,
    courses,
  });
});

export const getCourseById = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);

  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  res.status(200).json({
    success: true,
    course,
  });
});

export const createCourse = asyncHandler(async (req, res, next) => {
  const { title, description, category, price, level } = req.body;

  if (!title || !description || !category) {
    return next(new AppError("Title, description and category are required", 400));
  }

  const course = await Course.create({
    title,
    description,
    category,
    price: price || 0,
    level: level || "Beginner",
    createdBy: req.user.id,
    createdByName: req.body.createdByName || "Admin",
  });

  if (req.file) {
    course.thumbnail = {
      public_id: req.file.filename,
      secure_url: `/uploads/${req.file.filename}`,
    };
    await course.save();
  }

  res.status(201).json({
    success: true,
    message: "Course created successfully",
    course,
  });
});

export const updateCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  const { title, description, category, price, level } = req.body;

  if (title) course.title = title;
  if (description) course.description = description;
  if (category) course.category = category;
  if (price !== undefined) course.price = price;
  if (level) course.level = level;

  if (req.file) {
    if (course.thumbnail?.public_id) {
      const oldPath = path.resolve("uploads", course.thumbnail.public_id);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    course.thumbnail = {
      public_id: req.file.filename,
      secure_url: `/uploads/${req.file.filename}`,
    };
  }

  await course.save();

  res.status(200).json({
    success: true,
    message: "Course updated successfully",
    course,
  });
});

export const removeCourse = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) {
    return next(new AppError("Course not found", 404));
  }

  if (course.thumbnail?.public_id) {
    const oldPath = path.resolve("uploads", course.thumbnail.public_id);
    if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
  }

  await course.deleteOne();

  res.status(200).json({
    success: true,
    message: "Course removed successfully",
  });
});

export const addReview = asyncHandler(async (req, res, next) => {
  const { rating, comment } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) return next(new AppError("Course not found", 404));

  if (!rating) return next(new AppError("Rating is required", 400));

  const alreadyReviewed = course.reviews.find(
    (r) => r.user.toString() === req.user.id
  );

  if (alreadyReviewed) {
    alreadyReviewed.rating = rating;
    alreadyReviewed.comment = comment || alreadyReviewed.comment;
  } else {
    course.reviews.push({
      user: req.user.id,
      userName: req.user.fullName || req.body.userName || "Student",
      rating,
      comment,
    });
  }

  course.recalculateRatings();
  await course.save();

  res.status(200).json({
    success: true,
    message: "Review submitted successfully",
    reviews: course.reviews,
    ratingsAverage: course.ratingsAverage,
    ratingsCount: course.ratingsCount,
  });
});

export const deleteReview = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new AppError("Course not found", 404));

  course.reviews = course.reviews.filter(
    (r) => r.user.toString() !== req.user.id
  );
  course.recalculateRatings();
  await course.save();

  res.status(200).json({
    success: true,
    message: "Review deleted successfully",
  });
});
