const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");

const { userRegister, verifyOtp, verifyResendOtp } = userController;

userRouter
  .post("/register", userRegister)
  .post("/otp", verifyOtp)
  .post("/resendOtp", verifyResendOtp);

module.exports = userRouter;
