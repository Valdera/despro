const mongoose = require("mongoose");

const lockerSchema = new mongoose.Schema({
  number: {
    type: Number,
    required: [true, "Please enter your number"],
  },
  isOpen: {
    type: Boolean,
    default: false,
  },
  isUsed: {
    type: Boolean,
    default: false,
  },
});

const Locker = mongoose.model("Locker", lockerSchema);

module.exports = Locker;
