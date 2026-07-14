import bcrypt from "bcryptjs";
import userModel from "../models/user.model.js";
import AppError from "../utils/error.utils.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const register = async (req, res, next) => {
  try {
    let { fullName, email, password } = req.body;

    fullName = fullName?.trim();
    email = email?.trim().toLowerCase();

    if (!fullName || !email || !password) {
      return next(new AppError("All fields are required.", 400));
    }

    const existingUser = await userModel.findOne({ email });

    if (existingUser) {
      return next(new AppError("Email already exists.", 409));
    }

    const user = await userModel.create({
      fullName,
      email,
      password,
    });

    const token = user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    res.status(201).json({
      success: true,
      message: "Account created successfully.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return next(new AppError("Email and password are required.", 400));
    }

    const user = await userModel.findOne({ email }).select("+password");
    

    if (!user) {
      return next(new AppError("Invalid email or password.", 401));
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      return next(new AppError("Invalid email or password.", 401));
    }

    const token = user.generateJWTToken();

    res.cookie("token", token, cookieOptions);

    res.status(200).json({
      success: true,
      message: "Login successful.",
      user: {
        id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};

export { register, login };