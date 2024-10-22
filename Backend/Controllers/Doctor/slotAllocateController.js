const Doctor = require("../../Model/doctorModel");

const doctorSlotAllocate = async (req, res) => {
  try {
    const { doctorId, selectedDate, pickedTimes } = req.body;
    const doctorTime = await Doctor.findOneAndUpdate(
      {_id:doctorId},
      {
        $push: {
          timeAllocation: {
            selectedDate: selectedDate,
            selectedTimes: pickedTimes,
          },
        },
      },
      { upsert: true }
    );
    res.json(doctorTime)
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  doctorSlotAllocate,
};
