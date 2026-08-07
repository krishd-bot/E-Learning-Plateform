import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const progressSchema = new Schema(
  {
    lectureId: { type: String, required: true },
    completedAt: { type: Date, default: Date.now },
  },
  { _id: false }
);

const enrollmentSchema = new Schema(
  {
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    enrolledAt: { type: Date, default: Date.now },
    completedLectures: { type: [progressSchema], default: [] },
    certificateIssued: { type: Boolean, default: false },
    certificateIssuedAt: { type: Date },
  },
  { _id: false }
);

const userSchema = new Schema(
  {
    fullName: {
      type: String,
      required: [true, "Name is required"],
      minlength: [3, "Name must be at least 3 characters"],
      maxlength: [50, "Name cannot exceed 50 characters"],
      trim: true,
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
    },

    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [6, "Password must be at least 6 characters"],
      select: false,
    },

    role: {
      type: String,
      enum: ["USER", "ADMIN"],
      default: "USER",
    },

    avatar: {
      public_id: { type: String, default: "" },
      secure_url: {
        type: String,
        default:
          "https://api.dicebear.com/7.x/initials/svg?seed=Student&backgroundColor=6366f1",
      },
    },

    bio: { type: String, default: "", maxlength: 300 },

    enrolledCourses: {
      type: [enrollmentSchema],
      default: [],
    },

    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "Course",
      },
    ],

    forgotPasswordToken: String,
    forgotPasswordExpiry: Date,
  },
  {
    timestamps: true,
  }
);

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.comparePassword = async function (plainTextPassword) {
  return await bcrypt.compare(plainTextPassword, this.password);
};

userSchema.methods.generateJWTToken = function () {
  return jwt.sign(
    {
      id: this._id,
      email: this.email,
      role: this.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXPIRY || "7d",
    }
  );
};

userSchema.methods.generatePasswordResetToken = function () {
  const resetToken = crypto.randomBytes(20).toString("hex");
  this.forgotPasswordToken = crypto
    .createHash("sha256")
    .update(resetToken)
    .digest("hex");
  this.forgotPasswordExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes
  return resetToken;
};

export default model("User", userSchema);
