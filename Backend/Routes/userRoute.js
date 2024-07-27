const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/userController");

const { userRegister, verifyOtp, verifyResendOtp, userLogin } = userController;

userRouter
  .post("/register", userRegister)
  .post("/otp", verifyOtp)
  .post("/resendOtp", verifyResendOtp)
  .post("/login", userLogin);

module.exports = userRouter;
