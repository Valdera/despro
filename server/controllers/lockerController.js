const catchAsync = require("../utils/catchAsync");
const CustomError = require("../utils/customError");

const lockerRepository = require("../repositories/lockerRepository");
const userRepository = require("../repositories/userRepository");

exports.createLocker = catchAsync(async (req, res, next) => {
  const { number } = req.body;

  if (!number) {
    return next(new CustomError("Please insert locker number", 404));
  }

  if ((await lockerRepository.getLockerByNumber(number)) != null) {
    return next(new CustomError("Locker number already exits", 404));
  }

  const locker = await lockerRepository.createLocker(number);

  res.status(201).json({
    status: "success",
    data: locker,
  });
});

exports.getAllLocker = catchAsync(async (req, res, next) => {
  const lockers = await lockerRepository.getAllLocker();

  res.status(200).json({
    status: "success",
    data: lockers,
  });
});

exports.getLockerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("Please input a correct id", 401));
  }

  const locker = await lockerRepository.getLockerById(id);

  res.status(200).json({
    status: "success",
    data: locker,
  });
});

exports.updateLockerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("Please input a correct id", 401));
  }

  const locker = await lockerRepository.updateLockerById(id, req.body);

  res.status(200).json({
    status: "success",
    data: locker,
  });
});

exports.deleteLockerById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  if (!id) {
    return next(new CustomError("Please input a correct id", 401));
  }

  await lockerRepository.deleteLockerById(id);

  res.status(200).json({
    status: "success",
  });
});

exports.useLocker = catchAsync(async (req, res, next) => {
  const user = req.user;
  const { number } = req.params;

  if (user.locker != null) {
    return next(
      new CustomError("Please end your locker before use another locker", 401)
    );
  }

  const locker = await lockerRepository.getLockerByNumber(number);

  await lockerRepository.updateLockerById(locker._id, {
    isUsed: true,
    isOpen: true,
  });

  console.log("user: ", user);
  console.log("locker: ", locker);

  await userRepository.updateUserById(user._id, {
    locker: locker._id,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.endLocker = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.locker._id == null) {
    return next(new CustomError("You do not have a locker", 401));
  }

  await lockerRepository.updateLockerById(user.locker._id, {
    isUsed: false,
    isOpen: false,
  });

  await userRepository.updateUserById(user._id, {
    locker: null,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.toggleLocker = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.locker._id == null) {
    return next(new CustomError("You do not have a locker", 401));
  }

  await lockerRepository.updateLockerById(user.locker._id, {
    isOpen: !user.locker.isOpen,
  });

  res.status(200).json({
    status: "success",
  });
});

exports.meLocker = catchAsync(async (req, res, next) => {
  const user = req.user;

  if (user.locker._id == null) {
    return next(new CustomError("You do not have a locker", 401));
  }

  res.status(200).json({
    status: "success",
    data: user.locker,
  });
});
