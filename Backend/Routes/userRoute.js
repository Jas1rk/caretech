const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/User/userController");
const userProfileController = require("../Controllers/User/userProfileController");
const upload = require("../Utils/multer");
const { verifyToken } = require("../Utils/jwt");
const landingPageController = require('../Controllers/User/lanidingPageController')

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

const {getCategories,fetchDoctors,doctorDetails} = landingPageController

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
  .get("/profile", checkIsBlockUserProfile)
  .get('/categories',getCategories)
  .get('/doctors',fetchDoctors)
  .get('/doctor-details/:doctorid',doctorDetails)

module.exports = userRouter;
