const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/User/userController");

const { userRegister, verifyOtp, verifyResendOtp, userLogin, forgetPassword } =
  userController;

userRouter
  .post("/register", userRegister)
  .post("/otp", verifyOtp)
  .post("/resendOtp", verifyResendOtp)
  .post("/login", userLogin)
  .post("/forgetPassword", forgetPassword);

module.exports = userRouter;
