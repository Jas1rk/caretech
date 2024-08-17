const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/User/userController");
const userProfileController = require("../Controllers/User/userProfileController");
const upload = require("../Utils/multer");
const { verifyToken } = require("../Utils/jwt");

const {
  userRegister,
  verifyOtp,
  verifyResendOtp,
  userLogin,
  forgetPassword,
  forgetPassOtpVerify,
  forgetPassResendOtp,
  userNewPassword,
} = userController;

const { updateUserProfile, checkIsBlockUserProfile } = userProfileController;

userRouter
  .post("/register", userRegister)
  .post("/otp", verifyOtp)
  .post("/resendOtp", verifyResendOtp)
  .post("/login", userLogin)
  .post("/forgetPassword", forgetPassword)
  .post("/forgetPassOtp", forgetPassOtpVerify)
  .post("/forgetPassResendotp", forgetPassResendOtp)
  .post("/newPassword", userNewPassword)
  .post(
    "/editProfile",
    verifyToken,
    upload.single("profileImage"),
    updateUserProfile
  )
  .get("/profile", checkIsBlockUserProfile);

module.exports = userRouter;
