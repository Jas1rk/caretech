const Doctor = require("../../Model/doctorModel");
const {
  responseToDoctor,
  requestForVerification,
} = require("../../Utils/modemailer");
const bcrypt = require("bcrypt");
const Category = require("../../Model/categoryModel");

const doctorOtpStore = {};
const registerForDoctor = async (req, res) => {
  try {
    const { drName, drEmail, drDegree } = req.body;
    const findExist = await Doctor.findOne({ emailOfDoctor: drEmail });
    if (findExist) {
      res.json("doctorExist");
    } else {
      const genaratedOTP = await responseToDoctor(drEmail, drName, drDegree);
      doctorOtpStore[drEmail] = genaratedOTP;
      console.log("doctor otp", genaratedOTP);
      res.json(genaratedOTP);
    }
  } catch (err) {
    console.log(err);
  }
};

const doctorVerificationWithOtp = async (req, res) => {
  try {
    const {
      doctorOtp,
      drName,
      drDegree,
      drEmail,
      drMobile,
      drPassword,
      drCat,
    } = req.body;
    const certificate = req.file;
    const specialization = await Category.findOne({ categoryName: drCat });
    if (doctorOtp === doctorOtpStore[drEmail]) {
      const passwordHash = await bcrypt.hash(drPassword, 10);
      const newDoctor = new Doctor({
        nameOfDoctor: drName,
        degreeOfDoctor: drDegree,
        emailOfDoctor: drEmail,
        mobileOfDoctor: drMobile,
        passwordOfDoctor: passwordHash,
        category: specialization,
        certificate: certificate.originalname,
      });
      await newDoctor.save();
      delete doctorOtpStore[drEmail];
      await requestForVerification(drEmail, drName, drDegree);
      res.json("doctorRegister");
    } else {
      res.json("Invalid OTP");
    }
  } catch (err) {
    console.log(err);
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { doctorEmail, doctorPass } = req.body;
    console.log("datas are here from body", doctorEmail, doctorPass);
  } catch (err) {
    throw new err();
  }
};

module.exports = {
  registerForDoctor,
  doctorVerificationWithOtp,
  loginDoctor,
};
