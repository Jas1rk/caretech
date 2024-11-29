const { default: mongoose } = require("mongoose");
const Booking = require("../../Model/BookingModel");

const viewBookingHistory = async (req, res) => {
  try {
    const user_id = req.query.userId;
    const fetchBookHistory = await Booking.aggregate([
      { $match: { userId: new mongoose.Types.ObjectId(user_id) } },
      { $unwind: "$slots" },
      {
        $lookup: {
          from: "doctors",
          localField: "slots.doctorId",
          foreignField: "_id",
          as: "doctorDetails",
        },
      },
      {
        $project: {
          doctorDetails: 1,
          bookingId: 1,
          "slots.bookedDate": 1,
          "slots.BookedSeats": 1,
        },
      },
    ]);
    res.status(200).json(fetchBookHistory)
  } catch (error) {
    res.status(500).json(error.message)
  }
};

module.exports = {
  viewBookingHistory,
};
