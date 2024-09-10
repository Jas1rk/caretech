const express = require("express");
const doctorRoute = express.Router();
const doctorController = require("../Controllers/Doctor/doctorController");
const upload = require("../Utils/multer");
const { verifyToken } = require("../Utils/jwt");

const { registerForDoctor, doctorVerificationWithOtp, loginDoctor } =
  doctorController;

doctorRoute
  .post("/doctorregister", registerForDoctor)
  .post(
    "/verify-otp",
    upload.fields([
      { name: "certificate", maxCount: 1 },
      { name: "profile", maxCount: 1 },
    ]),
    doctorVerificationWithOtp
  )
  .post("/doctorlogin", loginDoctor);

module.exports = doctorRoute;
