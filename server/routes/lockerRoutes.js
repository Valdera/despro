// Module import
const express = require("express");

// File import
const lockerController = require("../controllers/lockerController");
const authController = require("../controllers/authController");

const router = express.Router();
router.route("/").get(lockerController.getAllLocker);
router.route("/").post(lockerController.createLocker);

router
  .use(authController.protect)
  .route("/use/:number")
  .post(lockerController.useLocker);
router
  .use(authController.protect)
  .route("/end")
  .post(lockerController.endLocker);
router.use(authController.protect).route("/me").get(lockerController.meLocker);

router
  .use(authController.protect)
  .route("/toggle")
  .post(lockerController.toggleLocker);

module.exports = router;
