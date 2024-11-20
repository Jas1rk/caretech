const Razorpay = require("razorpay");
const Crypto = require("crypto");
const dotenv = require("dotenv");
dotenv.config();

const { razorpayKeyId, razorpayKeySecret } = process.env;

let razorPayInstance = new Razorpay({
  key_id: razorpayKeyId,
  key_secret: razorpayKeySecret,
});

const paymentSuccess = async (req, res) => {
  try {
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  paymentSuccess,
};
