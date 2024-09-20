const Doctor = require("../../Model/doctorModel");
const {
  responseToDoctor,
  requestForVerification,
} = require("../../Utils/modemailer");
const bcrypt = require("bcrypt");
const Category = require("../../Model/categoryModel");
const { createToken } = require("../../Utils/jwt");
const { findById } = require("../../Model/userModel");

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
      drExperience,
      drState,
      drCountry,
      drLocation,
      drAbout,
    } = req.body;
    const certificate = req.files["certificate"][0];
    const profile = req.files["profile"][0];
    const specialization = await Category.findOne({ categoryName: drCat });
    if (!doctorOtp === doctorOtpStore[drEmail]) {
      return res.json("InvalidOTP");
    }
    const passwordHash = await bcrypt.hash(drPassword, 10);
    const newDoctor = new Doctor({
      nameOfDoctor: drName,
      degreeOfDoctor: drDegree,
      emailOfDoctor: drEmail,
      mobileOfDoctor: drMobile,
      passwordOfDoctor: passwordHash,
      category: specialization,
      certificate: certificate ? certificate.originalname : null,
      profileImageOfDoctor: profile ? profile.originalname : null,
      yearsOfExperience: drExperience,
      stateOfDoctor: drState,
      countryOfDoctor: drCountry,
      locationOfDoctor: drLocation,
      aboutOfDoctor: drAbout,
    });
    console.log("new doctor,ddk", newDoctor);
    await newDoctor.save();
    delete doctorOtpStore[drEmail];
    await requestForVerification(drEmail, drName, drDegree);
    res.json("doctorRegister");
  } catch (err) {
    console.log(err);
  }
};

const loginDoctor = async (req, res) => {
  try {
    const { doctorEmail, doctorPass } = req.body;
    const findDoctor = await Doctor.findOne({
      emailOfDoctor: doctorEmail,
    }).populate("category");
    if (!findDoctor) {
      return res.json("invalidemail");
    }
    if (!findDoctor.isVerified) {
      return res.json("notverified");
    }
    const matchPassword = await bcrypt.compare(
      doctorPass,
      findDoctor.passwordOfDoctor
    );

    if (!matchPassword) {
      return res.json("invalidpassword");
    }

    const doctorData = {
      id: findDoctor._id,
      drname: findDoctor.nameOfDoctor,
      drdegree: findDoctor.degreeOfDoctor,
      drEmail: findDoctor.emailOfDoctor,
      drMobile: findDoctor.mobileOfDoctor,
      drSpecialization: findDoctor.category,
      drCertificate: findDoctor.certificate,
      isVerified: findDoctor.isVerified,
      profileimage: findDoctor.profileImageOfDoctor,
      location: findDoctor.locationOfDoctor,
      about: findDoctor.aboutOfDoctor,
      state: findDoctor.stateOfDoctor,
      country: findDoctor.countryOfDoctor,
      experience: findDoctor.yearsOfExperience,
    };

    const doctorToken = createToken(doctorData.id);
    res.json({ doctorData, doctorToken });
  } catch (err) {
    throw err;
  }
};

const drProfileEdit = async (req, res) => {
  try {
    const {
      doctorId,
      doctorname,
      doctormobile,
      doctorstate,
      doctorcountry,
      doctorlocation,
      doctorexperience,
      doctordescription,
    } = req.body;
    const profilefile = req.file;
    const doctorUpdateData = {
      nameOfDoctor: doctorname,
      mobileOfDoctor: doctormobile,
      stateOfDoctor: doctorstate,
      countryOfDoctor: doctorcountry,
      locationOfDoctor: doctorlocation,
      yearsOfExperience: doctorexperience,
      aboutOfDoctor: doctordescription,
      ...(profilefile && { profileImageOfDoctor: profilefile.originalname }),
    };
    const updateData = await Doctor.updateOne(
      { _id: doctorId },
      doctorUpdateData
    );
    console.log("data is updated====", updateData);
    res.json(updateData);
  } catch (err) {
    throw err;
  }
};

module.exports = {
  registerForDoctor,
  doctorVerificationWithOtp,
  loginDoctor,
  drProfileEdit,
};
