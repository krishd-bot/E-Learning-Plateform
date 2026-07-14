import courseModel from "../models/course.model.js";
import AppError from "../utils/error.utils.js";

export const enrollCourse = async (req, res, next) => {
  try {
    const { courseId } = req.params;

    const course = await courseModel.findById(courseId);

    if (!course) {
      return next(new AppError("Course not found.", 404));
    }
//    console.log("Logged User:", req.user);
    const userId = req.user.id;

//     console.log("USER FROM TOKEN:", req.user);
// console.log("USER ID:", userId);
// console.log("COURSE STUDENTS:", course.students);

    const alreadyEnrolled = course.students.some(
      (student) => student.toString() === userId.toString()
    );

    if (alreadyEnrolled) {
      return next(
        new AppError("You are already enrolled in this course.", 400)
      );
    }

    course.students.push(userId);

    await course.save();

    res.status(200).json({
      success: true,
      message: "Course enrolled successfully.",
      course,
    });

  } catch (error) {
    next(new AppError(error.message, 500));
  }
};