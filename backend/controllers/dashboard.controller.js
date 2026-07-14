import Course from "../models/course.model.js";
import User from "../models/user.model.js";
import Payment from "../models/payment.model.js";
import AppError from "../utils/error.utils.js";

const getDashboardStats = async (req, res, next) => {
  try {
    const totalCourses = await Course.countDocuments();

    const totalStudents = await User.countDocuments({
      role: "USER",
    });

    const totalAdmins = await User.countDocuments({
      role: "ADMIN",
    });

    const revenue = await Payment.aggregate([
      {
        $match: {
          status: "SUCCESS",
        },
      },
      {
        $group: {
          _id: null,
          total: {
            $sum: "$amount",
          },
        },
      },
    ]);

    const recentCourses = await Course.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("createdBy", "fullName");

    const recentUsers = await User.find({
      role: "USER",
    })
      .sort({ createdAt: -1 })
      .limit(5);

    const recentPayments = await Payment.find({
      status: "SUCCESS",
    })
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("user", "fullName")
      .populate("course", "title");

    res.status(200).json({
      success: true,

      stats: {
        totalCourses,
        totalStudents,
        totalAdmins,

        revenue:
          revenue.length > 0
            ? revenue[0].total
            : 0,

        recentCourses,
        recentUsers,
        recentPayments,
      },
    });
  } catch (error) {
    next(new AppError(error.message, 500));
  }
};

export { getDashboardStats };