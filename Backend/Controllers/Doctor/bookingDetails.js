const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");

const fetchUsersBookings = async (req, res) => {
  try {
    const {doctor_id} = req.query;
    const fetchDetails = await Doctor.aggregate([
      { $match: { _id: new ObjectId(doctor_id) } },
      { $unwind: "$sotBookingForPatients" },
      { $project: { sotBookingForPatients: 1 } },
    ]);
    console.log("here is==", fetchDetails);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

/// lookup userdetails

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
