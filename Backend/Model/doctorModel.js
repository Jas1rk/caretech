const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    nameOfDoctor: {
      type: String,
    },
    emailOfDoctor: {
      type: String,
    },
    mobileOfDoctor: {
      type: Number,
    },
    passwordOfDoctor:{
      type: String,
    },
    aboutDoctor: {
      type: String,
    },
    locationOfDoctor: {
      type: String,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
    },
    certificate: {
      type: String,
    },
    isVerified:{
      type:Boolean,
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    profileImageOfDoctor:{
      type:String,

    }
  },
  { versionKey: false }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
