const Locker = require("../models/lockerModel");
const { filterObj } = require("../utils/filter");

exports.createLocker = async (number) => {
  try {
    const locker = await Locker.create({
      number: number,
    });
    return locker;
  } catch (err) {
    throw err;
  }
};

exports.updateLockerById = async (id, body) => {
  try {
    const filteredBody = filterObj(body, "number", "isOpen", "isUsed");
    const locker = await Locker.findByIdAndUpdate(id, filteredBody, {
      new: true,
      runValidators: true,
    });
    return locker;
  } catch (err) {
    throw err;
  }
};

exports.deleteLockerById = async (id) => {
  try {
    await Locker.findByIdAndDelete(id);
  } catch (err) {
    throw err;
  }
};

exports.getLockerById = async (id) => {
  try {
    const locker = await Locker.findById(id);
    return locker;
  } catch (err) {
    throw err;
  }
};

exports.getLockerByNumber = async (number) => {
  try {
    const locker = await Locker.findOne({ number: number });
    return locker;
  } catch (err) {
    throw err;
  }
};

exports.getAllLocker = async (id) => {
  try {
    const lockers = await Locker.find();
    return lockers;
  } catch (err) {
    throw err;
  }
};
