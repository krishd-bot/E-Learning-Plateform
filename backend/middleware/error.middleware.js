const errorMiddleware = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Something went wrong, please try again";

  if (err.code === 11000) {
    err.statusCode = 409;
    err.message = `Duplicate value entered for ${Object.keys(err.keyValue)} field`;
  }

  if (err.name === "CastError") {
    err.statusCode = 400;
    err.message = `Invalid value for ${err.path}`;
  }

  if (err.name === "ValidationError") {
    err.statusCode = 400;
    err.message = Object.values(err.errors)
      .map((val) => val.message)
      .join(", ");
  }

  res.status(err.statusCode).json({
    success: false,
    message: err.message,
  });
};

export default errorMiddleware;
