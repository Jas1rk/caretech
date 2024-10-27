const express = require("express");
const doctorRoute = express.Router();
const doctorController = require("../Controllers/Doctor/doctorController");
const doctorSlotAllocationController = require("../Controllers/Doctor/slotAllocateController")
const upload = require("../Utils/multer");
const { verifyAccessToken } = require("../Utils/jwt");

const {
  registerForDoctor,
  doctorVerificationWithOtp,
  loginDoctor,
  drProfileEdit,
} = doctorController;


const {doctorSlotAllocate,doctorFetchSlots} = doctorSlotAllocationController


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
  .post("/doctorlogin", loginDoctor)
  .put(
    "/profile-edit-dr",
    upload.single("doctorprofile"),
    verifyAccessToken,
    drProfileEdit
  )
  .post("/doctor-slot-allocate",verifyAccessToken,doctorSlotAllocate)
  .get('/doctor-get-slot',verifyAccessToken,doctorFetchSlots)

module.exports = doctorRoute;
