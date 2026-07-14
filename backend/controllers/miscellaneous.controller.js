import AppError from "../utils/error.utils.js";

import User from "../models/user.model.js";
import Course from "../models/course.model.js";
const contactUs = async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("All fields are required", 400));
  }

  try {
    const emailMessage = `Name: ${name}\nEmail: ${email}\nMessage: ${message}`;

    // Send email to the organization
    await sendEmail(process.env.CONTACT_US_EMAIL, "Student Course Management System - Contact Request", emailMessage);

    // Send confirmation email to the user
    const userMessage = `Hello ${name},

Thank you for contacting us. We have received your message and will get back to you as soon as possible.

Regards,
Student Course Management System Team`;

    await sendEmail(email, "Thank You for Contacting Student Course Management System", userMessage);

    res.status(200).json({
      success: true,
      message:
        "Thanks for contacting. We have sent you a confirmation email and will get in touch with you soon.",
    });
  } catch (error) {
    return next(new AppError(error.message, 500));
  }
};

const stats = async (req, res, next) => {
  try {
    const totalUsers = await userModel.countDocuments();
    const totalCourses = await Course.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalCourses,
      },
    });
  } catch (error) {
    next(error);
  }
};
export { contactUs, stats };
