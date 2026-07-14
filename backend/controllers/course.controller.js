import courseModel from "../models/course.model.js";
import AppError from "../utils/error.utils.js";

// Get all courses
const getAllCourses = async (req, res, next) => {
    try {
        const courses = await courseModel
  .find({})
  .populate("createdBy", "fullName");

        res.status(200).json({
            success: true,
            message: "Courses fetched successfully",
            courses
        });

    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


// Get single course
const getCourseById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const course = await courseModel.findById(id).populate("createdBy", "fullName");

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        res.status(200).json({
            success: true,
            message: "Course fetched successfully",
            course
        });

    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


// Create course (Admin only)
const createCourse = async (req, res, next) => {
    try {
        const {
            title,
            description,
            category,
            price
        } = req.body;


        if (!title || !description || !category || !price) {
            return next(
                new AppError("All fields are required", 400)
            );
        }


        const course = await courseModel.create({
            title,
            description,
            category,
            price,
            createdBy: req.user.id
        });


        res.status(201).json({
            success: true,
            message: "Course created successfully",
            course
        });


    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


// Update course (Admin only)
const updateCourse = async (req, res, next) => {
    try {
        const { id } = req.params;


        const course = await courseModel.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        );


        if (!course) {
            return next(new AppError("Course not found", 404));
        }


        res.status(200).json({
            success: true,
            message: "Course updated successfully",
            course
        });


    } catch (error) {
        next(new AppError(error.message, 500));
    }
};


// Delete course (Admin only)
const deleteCourse = async (req, res, next) => {
    try {
        const { id } = req.params;


        const course = await courseModel.findById(id);


        if (!course) {
            return next(new AppError("Course not found", 404));
        }


        await courseModel.findByIdAndDelete(id);


        res.status(200).json({
            success: true,
            message: "Course deleted successfully"
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
    deleteCourse
};