const Doctor = require("../../Model/doctorModel");
const User = require("../../Model/userModel");

const userFollowDoctor = async (req, res) => {
  try {
    const { drid, userid } = req.body;
    const [followDr, findUser] = await Promise.all([
        Doctor.findByIdAndUpdate(
          drid,
          {
            $push: {
              doctorFollowers: { userId: userid, followStatus: true },
            },
          },
          { upsert: true, new: true } 
        ),
        User.findByIdAndUpdate(
          userid,
          {
            $push: {
              followingDoctors: { doctorId: drid, followingStatus: true },
            },
          },
          { upsert: true} 
        ).populate('followingDoctors')
      ]);
      res.json({followDr,findUser})
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  userFollowDoctor,
};
