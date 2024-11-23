const Razorpay = require("razorpay");
const Crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();
const { v4: uuidv4 } = require("uuid");

const { razorpayKeyId, razorpayKeySecret } = process.env;

let razorPayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const proceedPayment = async (req, res) => {
  try {
    const { totalAmount } = req.body;
    const receiptId = `receipt_${uuidv4()}`;

    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: receiptId,
    };

    const order = await razorPayInstance.orders.create(options);
    if (order) {
      res.status(200).json({ razorpayOrder: order });
    } else {
      res.status(500).json({ message: "Failed to make payment try again!" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

const paymentSuccess = async (req, res) => {
  try {
    const { response } = req.body;
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  proceedPayment,
  paymentSuccess,
};
