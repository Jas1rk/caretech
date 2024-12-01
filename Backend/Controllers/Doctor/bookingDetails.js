const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");

const fetchUsersBookings = async (req, res) => {
  try {
    const { doctor_id } = req.query;
    const fetchDetails = await Doctor.aggregate([
      { $match: { _id: new ObjectId(doctor_id) } },
      { $unwind: "$sotBookingForPatients" },
      {
        $lookup: {
          from: "users",
          localField: "sotBookingForPatients.userId",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $project: { sotBookingForPatients: 1, userDetails: 1 } },
    ]);
    console.log("here is==", fetchDetails);
    res.status(200).json(fetchDetails);
  } catch (error) {
    res.status(500).json(error.message);
  }
};



const changeStatus = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
    res.status(500).json(error.message);
  }
};

module.exports = {
  fetchUsersBookings,
  changeStatus,
};
