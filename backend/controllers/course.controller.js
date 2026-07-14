import courseModel from "../models/course.model.js";
import AppError from "../utils/error.utils.js";

const getAllCourses = async (req, res, next) => {
  try {
    const courses = await courseModel
      .find()
      .populate("createdBy", "fullName email");

    res.status(200).json({
      success: true,
      message: "Courses fetched successfully.",
      courses,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const getCourseById = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await courseModel
      .findById(id)
      .populate("createdBy", "fullName email");

    if (!course) {
      return next(new AppError("Course not found.", 404));
    }

    res.status(200).json({
      success: true,
      message: "Course fetched successfully.",
      course,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const createCourse = async (req, res, next) => {
  try {
    const {
      title,
      description,
      category,
      level,
      price,
      thumbnail,
    } = req.body;

    if (!title || !description || !category || price === undefined) {
      return next(new AppError("All required fields are mandatory.", 400));
    }

    const existingCourse = await courseModel.findOne({ title });

    if (existingCourse) {
      return next(new AppError("Course already exists.", 409));
    }

    const course = await courseModel.create({
      title,
      description,
      category,
      level,
      price: Number(price),
      thumbnail,
      createdBy: req.user.id,
    });

    res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const updateCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return next(new AppError("Course not found.", 404));
    }

    Object.assign(course, req.body);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course updated successfully.",
      course,
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

const deleteCourse = async (req, res, next) => {
  try {
    const { id } = req.params;

    const course = await courseModel.findById(id);

    if (!course) {
      return next(new AppError("Course not found.", 404));
    }

    await course.deleteOne();

    res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export {
  getAllCourses,
  getCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
};