// Module import
const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const hpp = require("hpp");
var cors = require("cors");

// File import
const CustomError = require("./utils/customError");
const errorController = require("./controllers/errorController");
const authRouter = require("./routes/authRoutes");
const userRouter = require("./routes/userRoutes");
const lockerRouter = require("./routes/lockerRoutes");
const expressWs = require("express-ws");
// Init express application
const { app, wsRoute } = expressWs(express());
const lockerRepository = require("./repositories/lockerRepository");

// Development logging
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

app.ws("/socket", (ws) => {
  ws.on("message", async (msg) => {
    console.log("Received from client: ", msg);
    const data = await lockerRepository.getAllLocker();
    console.log(data);
    const res = JSON.stringify(data);
    ws.send(res);
  });
});

// Body parser, reading data from the body into req.body
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true, limit: "10kb" }));
app.use(cookieParser());
app.use(cors({ origin: "*" }));

// ROUTES
// Ping Routes
app.use("/v1/locker", lockerRouter);
app.use("/v1/user", userRouter);
app.use("/v1/auth", authRouter);

// Global Routes
app.all("*", (req, res, next) => {
  next(new CustomError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Handle errors
app.use(errorController);

module.exports = app;
