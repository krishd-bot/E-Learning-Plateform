import crypto from "crypto";
import fs from "fs";
import path from "path";

import User from "../models/user.model.js";
import AppError from "../utils/error.utils.js";
import asyncHandler from "../utils/asyncHandler.js";

const cookieOptions = {
  httpOnly: true,
  sameSite: "lax",
  secure: process.env.NODE_ENV === "production",
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
};

const sendToken = (user, statusCode, res, message) => {
  const token = user.generateJWTToken();
  user.password = undefined;

  res.cookie("token", token, cookieOptions);

  res.status(statusCode).json({
    success: true,
    message,
    token,
    user,
  });
};

export const register = asyncHandler(async (req, res, next) => {
  const { fullName, email, password } = req.body;

  if (!fullName || !email || !password) {
    return next(new AppError("All fields are required", 400));
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError("Email already registered", 409));
  }

  const user = await User.create({
    fullName,
    email,
    password,
    avatar: {
      secure_url: `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(
        fullName
      )}&backgroundColor=6366f1`,
    },
  });

  sendToken(user, 201, res, "User registered successfully");
});

export const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new AppError("Email and password are required", 400));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.comparePassword(password))) {
    return next(new AppError("Invalid email or password", 401));
  }

  sendToken(user, 200, res, "Logged in successfully");
});

export const logout = asyncHandler(async (req, res) => {
  res.cookie("token", null, { maxAge: 0, httpOnly: true });
  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const getProfile = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id).populate(
    "enrolledCourses.course",
    "title thumbnail lectures price category"
  );

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  res.status(200).json({
    success: true,
    user,
  });
});

export const updateProfile = asyncHandler(async (req, res, next) => {
  const { fullName, bio } = req.body;
  const user = await User.findById(req.user.id);

  if (!user) {
    return next(new AppError("User not found", 404));
  }

  if (fullName) user.fullName = fullName;
  if (bio !== undefined) user.bio = bio;

  if (req.file) {
    // remove old local avatar if it was locally uploaded
    if (user.avatar?.public_id) {
      const oldPath = path.resolve("uploads", user.avatar.public_id);
      if (fs.existsSync(oldPath)) fs.unlinkSync(oldPath);
    }
    user.avatar = {
      public_id: req.file.filename,
      secure_url: `/uploads/${req.file.filename}`,
    };
  }

  await user.save();

  res.status(200).json({
    success: true,
    message: "Profile updated successfully",
    user,
  });
});

export const changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(new AppError("Old and new password are required", 400));
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!user || !(await user.comparePassword(oldPassword))) {
    return next(new AppError("Old password is incorrect", 401));
  }

  user.password = newPassword;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password changed successfully",
  });
});

export const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next(new AppError("Email is required", 400));

  const user = await User.findOne({ email });
  if (!user) {
    return next(new AppError("No account found with this email", 404));
  }

  const resetToken = user.generatePasswordResetToken();
  await user.save();

  // In a production app this token would be emailed to the user.
  // Since no email service is configured, we return it directly for demo purposes.
  res.status(200).json({
    success: true,
    message: "Password reset token generated",
    resetToken,
  });
});

export const resetPassword = asyncHandler(async (req, res, next) => {
  const { resetToken } = req.params;
  const { password } = req.body;

  const forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");

  const user = await User.findOne({
    forgotPasswordToken,
    forgotPasswordExpiry: { $gt: Date.now() },
  });

  if (!user) {
    return next(new AppError("Reset token is invalid or has expired", 400));
  }

  user.password = password;
  user.forgotPasswordToken = undefined;
  user.forgotPasswordExpiry = undefined;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Password reset successfully",
  });
});
