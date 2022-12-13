const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const { filterObj } = require("../utils/filter");

exports.createUser = async (email, password) => {
  try {
    const user = await User.create({
      email: email,
      password: password,
    });
    return user;
  } catch (err) {
    throw err;
  }
};

exports.getUserByEmail = async (email) => {
  try {
    const user = await User.findOne({ email }).select("+password");
    return user;
  } catch (err) {
    throw err;
  }
};

exports.getUserById = async (id) => {
  try {
    const user = await User.findById(id);
    return user;
  } catch (err) {
    throw err;
  }
};

exports.getAllUser = async () => {
  try {
    const user = await User.find();
    return user;
  } catch (err) {
    throw err;
  }
};

exports.updateUserById = async (id, body) => {
  try {
    const filteredBody = filterObj(body, "locker");
    const locker = await User.findByIdAndUpdate(id, filteredBody, {
      new: true,
      runValidators: true,
    });
    return locker;
  } catch (err) {
    throw err;
  }
};

exports.deleteUserById = async (id) => {
  try {
    await User.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};
