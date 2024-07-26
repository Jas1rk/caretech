const User = require("../Model/userModel");
const emailVerification = require("../Utils/modemailer");
const bcrypt = require("bcrypt");

const OTPstore = {};
const userRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      res.json("userExist");
    } else {
      const genaratedOTP = await emailVerification(email);
      OTPstore[email] = genaratedOTP;
      console.log("this is otp getting", OTPstore[email]);
      res.json(genaratedOTP);
    }
  } catch (err) {
    console.log(err.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, username, email, mobile, password } = req.body;
    console.log("Entered,otp", otp);
    console.log("this is otp getting", OTPstore[email]);
    if (otp === OTPstore[email]) {
      const passwordHash = await bcrypt.hash(password, 10);
      const newUser = new User({
        username: username,
        email: email,
        mobile: mobile,
        password: passwordHash,
      });
      await newUser.save();
      delete OTPstore[email];
      res.json("userRegistered");
    } else {
      console.log("invalid otp");
      res.json("invalidOtp");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const verifyResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const genaratedOTP = await emailVerification(email);
    OTPstore[email] = genaratedOTP;
    res.json(genaratedOTP);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = { userRegister, verifyOtp, verifyResendOtp };
