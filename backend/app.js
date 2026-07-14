import { configDotenv } from "dotenv";
configDotenv();

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

import connectToDb from "./config/db.config.js";
import errorMiddleware from "./middleware/error.middleware.js";

import userRoutes from "./routes/user.routes.js";
import courseRoutes from "./routes/course.routes.js";
import paymentRoutes from "./routes/payment.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("dev"));

app.use(
    cors({
        origin: process.env.CLIENT_URL,
        credentials: true
    })
);

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