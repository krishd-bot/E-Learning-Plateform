import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { configDotenv } from "dotenv";
configDotenv();

import path from "path";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectToDb from "./config/db.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";
import enrollmentRoutes from "./routes/enrollment.routes.js";
import wishlistRoutes from "./routes/wishlist.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";
import miscellaneousRoutes from "./routes/miscellaneous.routes.js";

const app = express();

const allowedOrigins = [
  "http://localhost:5173",
  "https://e-learning-plateform-qx9c-eo43r8fug-deepak392003s-projects.vercel.app"
];

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use("/uploads", express.static(path.resolve("uploads")));

app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "LMS API is running",
  });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/lecture", lectureRoutes);
app.use("/api/v1/enrollment", enrollmentRoutes);
app.use("/api/v1/wishlist", wishlistRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/misc", miscellaneousRoutes);

app.all("*", (req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

app.use(errorMiddleware);

connectToDb();

export default app;
