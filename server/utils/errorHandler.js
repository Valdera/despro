const CustomError = require("./customError");

// Database CastError
exports.handleCastErrorDB = (err) => {
  const message = `Invalid ${err.path}: ${err.value}.`;
  return new CustomError(message, 400);
};

// Database Duplicate Fields
exports.handleDuplicateFieldsDB = (err) => {
  const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
  console.log(value);

  const message = `Duplicate field value: ${value}. Please use another value!`;
  return new CustomError(message, 400);
};

// Database Validation Error
exports.handleValidationErrorDB = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);

  const message = `Invalid input data. ${errors.join(". ")}`;
  return new CustomError(message, 400);
};

// JWT Invalid Error
exports.handleJWTInvalidError = () =>
  new CustomError("Invalid token. Please log in again!", 401);

// JWT Expired Error
exports.handleJWTExpiredError = () =>
  new CustomError("Your token has expired! Please log in again.", 401);
