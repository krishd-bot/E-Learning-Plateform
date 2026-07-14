import { configDotenv } from "dotenv";
configDotenv();
import enrollmentRoutes from "./routes/enrollment.routes.js";
import lectureRoutes from "./routes/lecture.routes.js";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectToDb from "./config/db.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";
import dashboardRoutes from "./routes/dashboard.routes.js";


const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  "/api/v1/lecture",
  lectureRoutes
);
app.use("/api/v1/dashboard", dashboardRoutes);

app.use(
  "/api/v1/enrollment",
  enrollmentRoutes
);

app.use("/api/v1/payment", paymentRoutes);
app.get("/", (req, res) => {
    res.status(200).json({
        success: true,
        message: "API is running"
    });
});

app.use("/api/v1/user", userRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentRoutes);

app.all("*", (req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

app.use(errorMiddleware);

connectToDb();

export default app;