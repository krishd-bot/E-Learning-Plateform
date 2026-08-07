import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getCourseLectures = asyncHandler(async (req, res, next) => {
  const course = await Course.findById(req.params.id);
  if (!course) return next(new AppError("Course not found", 404));

  res.status(200).json({
    success: true,
    lectures: course.lectures,
  });
});

export const addLectureToCourse = asyncHandler(async (req, res, next) => {
  const { title, description, videoUrl, duration } = req.body;
  const course = await Course.findById(req.params.id);

  if (!course) return next(new AppError("Course not found", 404));
  if (!title) return next(new AppError("Lecture title is required", 400));

  course.lectures.push({
    title,
    description: description || "",
    videoUrl: videoUrl || "",
    duration: duration || 0,
  });

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture added successfully",
    lectures: course.lectures,
  });
});

export const updateCourseLecture = asyncHandler(async (req, res, next) => {
  const { lectureId } = req.params;
  const { title, description, videoUrl, duration } = req.body;

  const course = await Course.findById(req.params.id);
  if (!course) return next(new AppError("Course not found", 404));

  const lecture = course.lectures.id(lectureId);
  if (!lecture) return next(new AppError("Lecture not found", 404));

  if (title) lecture.title = title;
  if (description !== undefined) lecture.description = description;
  if (videoUrl !== undefined) lecture.videoUrl = videoUrl;
  if (duration !== undefined) lecture.duration = duration;

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture updated successfully",
    lectures: course.lectures,
  });
});

export const deleteCourseLecture = asyncHandler(async (req, res, next) => {
  const { lectureId } = req.params;

  const course = await Course.findById(req.params.id);
  if (!course) return next(new AppError("Course not found", 404));

  course.lectures = course.lectures.filter(
    (lec) => lec._id.toString() !== lectureId
  );

  await course.save();

  res.status(200).json({
    success: true,
    message: "Lecture deleted successfully",
    lectures: course.lectures,
  });
});
