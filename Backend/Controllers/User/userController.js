const User = require("../../Model/userModel");
const { emailVerification } = require("../../Utils/modemailer");
const bcrypt = require("bcrypt");
const { createAccessToken ,createRefreshToken} = require("../../Utils/jwt");

const OTPstore = {};
const userRegister = async (req, res) => {
  try {
    const { email } = req.body;
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      return res.json("userExist");
    }
    const genaratedOTP = await emailVerification(email);
    OTPstore[email] = genaratedOTP;
    console.log("this is otp getting", OTPstore[email]);
    res.json(genaratedOTP);
  } catch (err) {
    console.log(err.message);
  }
};

const verifyOtp = async (req, res) => {
  try {
    const { otp, username, email, mobile, password } = req.body;
    if (!otp === OTPstore[email]) {
      return res.json("invalidOtp");
    }
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
    const findUser = await User.findOne({ email }).populate("followingDoctors");
    if (!findUser) {
      return res.json("userNotFound");
    }
    if (findUser.isBlocked) {
      return res.json("userBlocked");
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);
    if (!comparePassword) {
      return res.json("invalidPassword");
    }
    const userData = {
      id: findUser._id,
      username: findUser.username,
      email: findUser.email,
      mobile: findUser.mobile,
      isBlocked: findUser.isBlocked,
      profileImage: findUser.profileImage,
      followingDoctors: findUser.followingDoctors || [],
    };
    const accessToken = createAccessToken(userData.id);
    res.cookie("accessToken", accessToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    const refreshToken = createRefreshToken(userData.id);
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, 
    });
    res.json(userData);
  } catch (err) {
    console.log(err.message);
  }
};

const forgetPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const findEmail = await User.findOne({ email });
    if (!findEmail) {
      return res.json("emailNotFound");
    }
    const genaratedOTP = await emailVerification(email);
    OTPstore[email] = genaratedOTP;
    console.log("otp getting for forgetpassword", OTPstore[email]);
    res.json(genaratedOTP);
  } catch (err) {
    console.log(err.message);
  }
};

const forgetPassOtpVerify = async (req, res) => {
  try {
    const { email, otp } = req.body;
    if (!otp === OTPstore[email]) {
      return res.json("incorrectOtp");
    }
    delete OTPstore[email];
    res.json("otpCorrect");
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
