const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal Server Error";

    // Mongoose Validation Error
    if (err.name === "ValidationError") {
        message = Object.values(err.errors)
            .map((val) => val.message)
            .join(", ");
        statusCode = 400;
    }

    // Duplicate Key Error
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        message = `${field} already exists`;
        statusCode = 400;
    }

    // Invalid JWT
    if (err.name === "JsonWebTokenError") {
        message = "Invalid token";
        statusCode = 401;
    }

    // Expired JWT
    if (err.name === "TokenExpiredError") {
        message = "Token has expired";
        statusCode = 401;
    }

    res.status(statusCode).json({
        success: false,
        message,
    });
};

export default errorMiddleware;