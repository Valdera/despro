const errorHandler = require("../utils/errorHandler");
const config = require("../config");

const errorController = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";

  console.log("MASUKIN", err);

  if (config.NodeEnv === "PRODUCTION") {
    let error = { ...err };
    error.message = err.message;

    if (error.name === "CastError")
      error = errorHandler.handleCastErrorDB(error);
    if (error.code === 11000)
      error = errorHandler.handleDuplicateFieldsDB(error);
    if (error.name === "ValidationError")
      error = errorHandler.handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError")
      error = errorHandler.handleJWTError();
    if (error.name === "TokenExpiredError")
      error = errorHandler.handleJWTExpiredError();

    sendErrorProd(error, req, res);
    return;
  }

  sendErrorDev(err, req, res);
};

// To send a generic error message on dev mode
const sendErrorDev = (err, req, res) => {
  return res.status(err.statusCode).json({
    status: err.status,
    error: err,
    message: err.message,
    stack: err.stack,
  });
};

// To send a generic error message on prod mode
const sendErrorProd = (err, req, res) => {
  // A) Operational, trusted error: send message to client
  if (err.isOperational) {
    return res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // B) Programming or other unknown error: don't leak error details
  // Log error
  console.error("ERROR 💥", err);
  // Send generic message
  return res.status(500).json({
    status: "error",
    message: "Something went very wrong!",
  });
};

module.exports = errorController;
