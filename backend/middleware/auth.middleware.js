import jwt from "jsonwebtoken";
import AppError from "../utils/error.utils.js";

const isLoggedIn = async (req, res, next) => {
    try {
        const { token } = req.cookies;

        if (!token) {
            return next(new AppError("Please login to continue.", 401));
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded;

        next();
    } catch (error) {
        return next(new AppError("Invalid or expired token.", 401));
    }
};

const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return next(
                new AppError("You are not authorized to access this resource.", 403)
            );
        }

        next();
    };
};

export {
    isLoggedIn,
    authorizeRoles,
};