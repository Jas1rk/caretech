const Doctor = require("../../Model/doctorModel");
const { ObjectId } = require("mongodb");

const handleDisplayTimes = async (req, res) => {
  try {
    const { doctorId, selectedDate } = req.query;
    console.log("here is selected date", selectedDate);
    const findDoctorWithDate = await Doctor.findOne({
      _id: doctorId,
      timeAllocation: {
        $elemMatch: { storedDate: selectedDate },
      },
    });
    if (findDoctorWithDate) {
      const result = await Doctor.aggregate([
        { $match: { _id: new ObjectId(doctorId) } },
        { $unwind: "$timeAllocation" },
        { $match: { "timeAllocation.storedDate": selectedDate } },
        { $project: { _id: 0, times: "$timeAllocation.selectedTimes" } },
      ]);
      const da = result.flat()
      console.log("here is result", da);
    } else {
      console.log(`sorry times not fond on ${selectedDate}`);
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  handleDisplayTimes,
};
