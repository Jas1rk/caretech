const Razorpay = require("razorpay");
const Crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");
const Doctor = require("../../Model/doctorModel");
const Booking = require("../../Model/BookingModel");
const User = require("../../Model/userModel");

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
      paymentId,
      totalAmount,
      selectedDate,
      selectedTimes,
      userId: { userId: extractedUserId },
      doctorId,
    } = req.body;
   
    const [findUser,findDoctor] = await Promise.all([
      User.findOne({ _id: extractedUserId }),
      Doctor.findOne({ _id: doctorId }),
    ]);
    
   
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  proceedPayment,
  paymentSuccess,
};
