const express = require("express");
const doctorRoute = express.Router();
const upload = require("../Utils/multer");
const { verifyAccessToken } = require("../Utils/jwt");
const doctorController = require("../Controllers/Doctor/doctorController");
const doctorSlotAllocationController = require("../Controllers/Doctor/slotAllocateController");
const bookingDetailsController = require("../Controllers/Doctor/bookingDetails");

const {
  registerForDoctor,
  doctorVerificationWithOtp,
  loginDoctor,
  drProfileEdit,
} = doctorController;

const { doctorSlotAllocate, doctorFetchSlots, cancelIndividualTime } =
  doctorSlotAllocationController;

const { fetchUsersBookings, changeStatus } = bookingDetailsController;

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
  .post("/doctor-slot-allocate", verifyAccessToken, doctorSlotAllocate)
  .get("/doctor-get-slot", verifyAccessToken, doctorFetchSlots)
  .post("/cancel-time", verifyAccessToken, cancelIndividualTime)
  .get("/fetch-booking-details", verifyAccessToken, fetchUsersBookings)
  .post("/change-status", verifyAccessToken, changeStatus);

module.exports = doctorRoute;
