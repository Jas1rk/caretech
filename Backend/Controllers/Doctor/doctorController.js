const Doctor = require("../../Model/doctorModel");
const Notification = require("../../Model/notificationModel");
const { sendRequestToAdmin ,responseToDoctor} = require("../../Utils/modemailer");

const registerForDoctor = async (req, res) => {
  try {
    const { doctorName, doctorEmail, doctorMobile, specialization } = req.body;
    const certificate = req.file;
    const findExist = await Doctor.findOne({ emailOfDoctor: doctorEmail });
    if (findExist) {
      res.json("doctorExist");
    } else {
      const requestSend = await sendRequestToAdmin(
        doctorName,
        doctorEmail,
        doctorMobile,
        specialization,
        certificate
      );
      await Notification.updateOne(
        {},
        {
          $push: {
            notifications: {
              doctorname: doctorName,
              doctoremail: doctorEmail,
            },
          },
        },
        { upsert: true }
      );
      console.log("here is the dataa", requestSend);
      res.json(requestSend);
    }
  } catch (err) {
    console.log(err);
  }
};

const fetchNewDoctorsRequest = async(req,res) => {
  try {
    const findNewDoctors = await Notification.aggregate([
      { $project: { notifications: 1, _id: 0 } }, 
      { $unwind: "$notifications" }, 
      { $match: { "notifications.doctoremail": { $exists: true } } } 
    ]);
    console.log("here is the all ",findNewDoctors)
    res.json(findNewDoctors)
  }catch(err){
    console.log(err.message)
  }
}

const sendOtpToDoctor = async (req, res) => {
  try {
    const {drEmail,drName} = req.body
    const genaratedOTP = await responseToDoctor(drEmail,drName)
    // await Notification.updateOne({'notifications.doctoremail':drEmail},{
    //   $pull:{
    //     notifications:{
    //       doctoremail:drEmail,
    //       doctorname:drName
    //     }
    //   }
    // })
    // res.json(genaratedOTP)
  } catch (err) {
    console.log(err.message);
  }
};



module.exports = {
  registerForDoctor,
  sendOtpToDoctor,
  fetchNewDoctorsRequest
};
