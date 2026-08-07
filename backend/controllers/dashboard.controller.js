import User from "../models/user.model.js";
import Course from "../models/course.model.js";
import Payment from "../models/payment.model.js";
import asyncHandler from "../utils/asyncHandler.js";

export const getAdminStats = asyncHandler(async (req, res) => {
  const [usersCount, coursesCount, payments] = await Promise.all([
    User.countDocuments(),
    Course.countDocuments(),
    Payment.find({ status: "SUCCESS" }),
  ]);

  const totalRevenue = payments.reduce((sum, p) => sum + p.amount, 0);

  const topCourses = await Course.find()
    .sort({ numOfEnrollments: -1 })
    .limit(5)
    .select("title numOfEnrollments ratingsAverage category");

  const revenueByMonth = {};
  payments.forEach((p) => {
    const key = new Date(p.createdAt).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });
    revenueByMonth[key] = (revenueByMonth[key] || 0) + p.amount;
  });

  res.status(200).json({
    success: true,
    stats: {
      usersCount,
      coursesCount,
      totalEnrollments: payments.length,
      totalRevenue,
      topCourses,
      revenueByMonth,
    },
  });
});
