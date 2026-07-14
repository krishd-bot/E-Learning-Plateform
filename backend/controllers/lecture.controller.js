import Course from "../models/course.model.js";
import AppError from "../utils/error.utils.js";

export const addLecture = async (req, res, next) => {
  try {
    const { courseId } = req.params;
    const { title, description, videoUrl } = req.body;

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    course.lectures.push({
      title,
      description,
      videoUrl,
    });

    await course.save();

    res.status(201).json({
      success: true,
      message: "Lecture added successfully",
      lectures: course.lectures,
    });
  } catch (error) {
    next(error);
  }
};

export const getLectures = async (req, res, next) => {
  try {
    const course = await Course.findById(
      req.params.courseId
    );

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    res.status(200).json({
      success: true,
      lectures: course.lectures,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteLecture = async (req, res, next) => {
  try {
    const { courseId, lectureId } = req.params;

    const course = await Course.findById(courseId);

    if (!course) {
      return next(new AppError("Course not found", 404));
    }

    course.lectures = course.lectures.filter(
      (lecture) =>
        lecture._id.toString() !== lectureId
    );

    await course.save();

    res.status(200).json({
      success: true,
      message: "Lecture deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};