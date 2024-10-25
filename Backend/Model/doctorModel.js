const mongoose = require("mongoose");
const doctorSchema = new mongoose.Schema(
  {
    nameOfDoctor: {
      type: String,
    },
    degreeOfDoctor:{
      type:String
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
      default:false
    },
    isBlocked:{
      type:Boolean,
      default:false
    },
    profileImageOfDoctor:{
      type:String,

    },
    yearsOfExperience:{
      type:Number
    },
    stateOfDoctor:{
      type:String
    },
    countryOfDoctor:{
      type:String
    },
    locationOfDoctor:{
      type:String
    },
    aboutOfDoctor:{
      type:String
    },
    doctorFollowers:[{
      userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
      followStatus:{
        type:Boolean,
        default:false
      }
    }],
    timeAllocation:[{
      storedDate:{
        type:String
      },
      selectedTimes:{
        type:[String]
      }
    }]
  },
  { versionKey: false }
);

const Doctor = mongoose.model("Doctor", doctorSchema);
module.exports = Doctor;
