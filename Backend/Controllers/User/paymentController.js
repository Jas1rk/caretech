const Razorpay = require("razorpay");
const crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const Doctor = require("../../Model/doctorModel");
const Booking = require("../../Model/BookingModel");
const User = require("../../Model/userModel");
const Notification = require('../../Model/notificationModel')

const { razorpayKeyId, razorpayKeySecret } = process.env;

let razorPayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const proceedPayment = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const receiptId = uuidv4();

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: receiptId,
    };

    const order = await razorPayInstance.orders.create(options);
    res.status(200).json({ razorpayOrder: order });
  } catch (err) {
    res.status(500).json({ message: "Failed to make payment try again!" });
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const {
      razorpay_payment_id,
      razorpay_signature,
      razorpay_order_id,
      paymentId,
      totalAmount,
      selectedDate,
      selectedTimes,
      userId: { userId: extractedUserId },
      doctorId,
    } = req.body;

    const isValidSignature = validSignature(
      razorpay_payment_id,
      razorpay_signature,
      razorpay_order_id
    );

    if (!isValidSignature) {
      return res.status(409).json({ message: "Invalid payment signature" });
    }

    const [companyShare, doctorShare] = [0.6, 0.4].map(
      (share) => share * totalAmount
    );

    const [findUser, findDoctor] = await Promise.all([
      User.findOne({ _id: extractedUserId }),
      Doctor.findOne({ _id: doctorId }),
    ]);

    const dateAndTime = findDoctor.timeAllocation.find(
      (allocate) => allocate.storedDate === selectedDate
    );
    const times = dateAndTime.selectedTimes;

    const updateSlot =
      times.length === 1
        ? { $pull: { timeAllocation: { storedDate: selectedDate } } }
        : {
            $pull: {
              "timeAllocation.$.selectedTimes": { $in: selectedTimes },
            },
          };

    const bookingDetails = {
      userId: findUser,
      paymentId: paymentId,
      bookingStatus: "Processing",
      bookingCost: doctorShare,
    };

    const newBooking = {
      userId: findUser,
      bookingId: paymentId,
      slots: [
        {
          doctorId: findDoctor,
          bookedDate: selectedDate,
          BookedSeats: selectedTimes,
        },
      ],
      shareOfCompany: companyShare,
    };

    const slotUpdate = {
      $push: { sotBookingForPatients: bookingDetails },
      ...updateSlot,
    };

    await Promise.all([
      Doctor.updateOne(
        {
          _id: doctorId,
          "timeAllocation.storedDate": selectedDate,
        },
        slotUpdate
      ),
      Booking.create(newBooking),
    ]);
    res.status(200).json({ bookingDetails, newBooking });
  } catch (err) {
    console.log(err.message);
  }
};

const validSignature = (
  razorpay_payment_id,
  razorpay_signature,
  razorpay_order_id
) => {
  const hmacSignature = crypto
    .createHmac("sha256", razorpayKeySecret)
    .update(`${razorpay_order_id}|${razorpay_payment_id}`)
    .digest("hex");
  return hmacSignature === razorpay_signature;
};

module.exports = {
  proceedPayment,
  paymentSuccess,
};
