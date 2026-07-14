import crypto from "crypto";
import Payment from "../models/payment.model.js";
import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

/**
 * Buy a Course (Dummy Payment)
 */
const buyCourse = async (req, res, next) => {
    try {
        const { courseId, paymentMethod } = req.body;
        const userId = req.user.id;

        if (!courseId) {
            return next(new AppError("Course ID is required", 400));
        }

        const course = await Course.findById(courseId);

        if (!course) {
            return next(new AppError("Course not found", 404));
        }

        const alreadyPurchased = await Payment.findOne({
            user: userId,
            course: courseId,
            status: "SUCCESS",
        });

        if (alreadyPurchased) {
            return next(new AppError("Course already purchased", 400));
        }

        const payment = await Payment.create({
            user: userId,
            course: courseId,
            amount: course.price,
            paymentMethod: paymentMethod || "UPI",
            transactionId: crypto.randomUUID(),
            status: "SUCCESS",
        });

        await User.findByIdAndUpdate(userId, {
            $addToSet: {
                enrolledCourses: courseId,
            },
        });

        res.status(201).json({
            success: true,
            message: "Course purchased successfully",
            payment,
        });

    } catch (error) {
        next(error);
    }
};

/**
 * Payment History
 */
const getPaymentHistory = async (req, res, next) => {
    try {
        const payments = await Payment.find({
            user: req.user.id,
        })
            .populate("course", "title category")
            .sort({ createdAt: -1 });

        res.status(200).json({
            success: true,
            payments,
        });

    } catch (error) {
        next(error);
    }
};

export {
    buyCourse,
    getPaymentHistory,
};