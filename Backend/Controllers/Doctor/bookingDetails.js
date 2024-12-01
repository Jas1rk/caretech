const Doctor = require("../../Model/doctorModel");
const Booking = require("../../Model/BookingModel");
const { ObjectId } = require("mongodb");
const { default: mongoose } = require("mongoose");

const fetchUsersBookings = async (req, res) => {
  try {
    const { doctor_id } = req.query;
    const doctorId = new mongoose.Types.ObjectId(doctor_id);
    const [fetchDetails, fetchBooking] = await Promise.all([
      Doctor.aggregate([
        { $match: { _id: doctorId } },
        { $unwind: "$sotBookingForPatients" },
        {
          $lookup: {
            from: "users",
            localField: "sotBookingForPatients.userId",
            foreignField: "_id",
            as: "userDetails",
          },
        },
        { $project: { sotBookingForPatients: 1, userDetails: 1 } },
      ]),
      Booking.aggregate([
        { $unwind: "$slots" },
        {
          $match: { "slots.doctorId": doctorId },
        },
        {
          $project: {
            bookingId: 1,
            "slots.bookedDate": 1,
            "slots.BookedSeats": 1,
          },
        },
        {$sort:{_id: -1}}
      ]),
    ]);
    console.log(fetchDetails, fetchBooking);
    res.status(200).json({ fetchDetails, fetchBooking });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

const changeStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  fetchUsersBookings,
  changeStatus,
};
