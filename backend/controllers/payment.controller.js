import crypto from "crypto";

import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";



export const checkout = asyncHandler(async (req, res, next) => {
  const { courseId } = req.body;

  const course = await Course.findById(courseId);
  if (!course) return next(new AppError("Course not found", 404));

  const user = await User.findById(req.user.id);
  const alreadyEnrolled =
  Array.isArray(user.enrolledCourses) &&
  user.enrolledCourses.some(
    (e) => e?.course?.toString() === courseId
  );
  if (alreadyEnrolled) {
    return next(new AppError("You are already enrolled in this course", 409));
  }

  const orderId = `order_${crypto.randomBytes(8).toString("hex")}`;

  res.status(200).json({
    success: true,
    order: {
      id: orderId,
      amount: course.price,
      currency: "USD",
      courseId,
      courseTitle: course.title,
    },
  });
});

export const verifyPayment = async (req, res) => {
  try {
    const { courseId, orderId } = req.body;

    if (!courseId) {
      return res.status(400).json({
        success: false,
        message: "Course ID is required",
      });
    }

    const course = await Course.findById(courseId);

    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const alreadyEnrolled =
      user.enrolledCourses?.some(
        (e) => e.course?.toString() === courseId
      ) || false;

    if (alreadyEnrolled) {
      return res.status(409).json({
        success: false,
        message: "Already enrolled",
      });
    }

    await Payment.create({
      user: user._id,
      course: course._id,
      amount: course.price,
      status: "SUCCESS",
      reference: orderId,
    });

    user.enrolledCourses.push({
      course: course._id,
    });

    await user.save();

    res.status(200).json({
      success: true,
      message: "Payment successful",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
