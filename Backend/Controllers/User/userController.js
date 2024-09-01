const User = require("../../Model/userModel");
const {emailVerification} = require("../../Utils/modemailer");
const bcrypt = require("bcrypt");
const { createToken } = require("../../Utils/jwt");

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
    console.log("resendotp getting ", OTPstore[email]);
    res.json(genaratedOTP);
  } catch (err) {
    console.log(err.message);
  }
};

const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });
    if (findUser) {
      if (findUser.isBlocked) {
        res.json("userBlocked");
      } else {
        const comparePassword = await bcrypt.compare(
          password,
          findUser.password
        );
        if (comparePassword) {
          const userData = {
            id: findUser._id,
            username: findUser.username,
            email: findUser.email,
            mobile: findUser.mobile,
            isBlocked: findUser.isBlocked,
            profileImage: findUser.profileImage
          };
          const usertoken = createToken(userData.id);
          res.json({ userData,usertoken});
        } else {
          res.json("invalidPassword")
        }
      }
    } else {
      res.json("userNotFound");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findEmail = await User.findOne({ email });
    if (findEmail) {
      const genaratedOTP = await emailVerification(email);
      OTPstore[email] = genaratedOTP;
      console.log("otp getting for forgetpassword", OTPstore[email]);
      res.json(genaratedOTP);
    } else {
      res.json("emailNotFound");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const forgetPassOtpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (otp === OTPstore[email]) {
      delete OTPstore[email];
      res.json("otpCorrect");
    } else {
      res.json("incorrectOtp");
    }
  } catch (err) {
    console.log(err.message);
  }
};

const forgetPassResendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const genaratedOTP = await emailVerification(email);
    OTPstore[email] = genaratedOTP;
    console.log("resendotp for forgetpassword", OTPstore[email]);
    res.json(genaratedOTP);
  } catch (err) {
    console.log(err.message);
  }
};

const userNewPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;
    const passwordHash = await bcrypt.hash(newPassword, 10);
    const updatePassword = await User.findOneAndUpdate(
      { email: email },
      { $set: { password: passwordHash } }
    );
    res.json(updatePassword);
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  userRegister,
  verifyOtp,
  verifyResendOtp,
  userLogin,
  forgetPassword,
  forgetPassOtpVerify,
  forgetPassResendOtp,
  userNewPassword,
};
