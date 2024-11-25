const express = require("express");
const userRouter = express.Router();
const userController = require("../Controllers/User/userController");
const userProfileController = require("../Controllers/User/userProfileController");
const upload = require("../Utils/multer");
const { verifyAccessToken } = require("../Utils/jwt");
const landingPageController = require("../Controllers/User/lanidingPageController");
const followController = require("../Controllers/User/FollowRequest");
const slotBookingController = require("../Controllers/User/slotBooking");
const paymentController = require('../Controllers/User/paymentController')


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

const { getCategories, fetchDoctors, doctorDetails } = landingPageController;
const { userFollowDoctor } = followController;

const { handleDisplayTimes } = slotBookingController;

const {proceedPayment,paymentSuccess} = paymentController

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
    verifyAccessToken,
    upload.single("profileImage"),
    updateUserProfile
  )
  .get("/profile", checkIsBlockUserProfile)
  .get("/categories", getCategories)
  .get("/doctors", fetchDoctors)
  .get("/doctor-details/:doctorid", doctorDetails)
  .post("/follow-doctor", verifyAccessToken, userFollowDoctor)
  .get("/display-slots", handleDisplayTimes)
  .post('/proceed-to-payment',verifyAccessToken,proceedPayment)
  .post('/payment-success',verifyAccessToken,paymentSuccess)


module.exports = userRouter;
