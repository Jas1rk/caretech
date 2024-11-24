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
    const receiptId = uuidv4();
   
    const options = {
      amount: totalAmount * 100,
      currency: "INR",
      receipt: "" + receiptId,
    };
    
    await razorPayInstance.orders.create(options, (error, order) => {
      if (!error) {
        console.log("here is the ordder", order);
        res.status(200).json({ razorpayOrder: order });
      } else {
        console.log("in the else case", error);
        res.status(400).json({ message: "Failed to make payment try again!" });
      }
    });
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
