const Doctor = require("../../Model/doctorModel")
const {sendRequestToAdmin} = require('../../Utils/modemailer')

const registerForDoctor = async (req, res) => {
  try {
    const { doctorName, doctorEmail, doctorMobile, specialization } = req.body;
    const certificate = req.file;
    const findExist = await Doctor.findOne({ emailOfDoctor: doctorEmail });
    if (findExist) {
      res.json("doctorExist");
    } else {
        const requestSend = await sendRequestToAdmin(doctorName,doctorEmail,doctorMobile,specialization,certificate)
        console.log("here is the dataa",requestSend)
        res.json(requestSend)
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  registerForDoctor,
};
