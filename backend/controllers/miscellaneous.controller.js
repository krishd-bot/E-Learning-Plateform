import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

export const contactUs = asyncHandler(async (req, res, next) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return next(new AppError("All fields are required", 400));
  }

  // In production this would send an email or store the message.
  console.log(`New contact message from ${name} <${email}>: ${message}`);

  res.status(200).json({
    success: true,
    message: "Your message has been received, we'll get back to you soon",
  });
});
