const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");

const handleDisplayTimes = async (req, res) => {
  try {
    const { doctorId, selectedDate } = req.query;
    const findDoctorWithDate = await Doctor.aggregate([
      { $match: { _id: new ObjectId(doctorId) } },
      { $unwind: "$timeAllocation" },
      { $match: { "timeAllocation.storedDate": selectedDate } },
      { $project: { _id: 0, times: "$timeAllocation.selectedTimes" } },
    ]);
    if (findDoctorWithDate.length > 0) {
      res.status(200).json(findDoctorWithDate);
    } else {
      res.status(409).json({ message: "No times found for the selected date" });
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  handleDisplayTimes,
};
