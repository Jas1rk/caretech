const mongoose = require("mongoose");
const BookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    bookingId: {
      type: String,
    },

    slots: [
      {
        doctorId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Doctor",
        },
        bookedDate: {
          type: String,
        },
        BookedSeats: {
          type: [String],
        },
        
      },
    ],

    shareOfCompany: {
      type: Number,
      default: 0,
    },
  },
  { versionKey: false }
);

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;
