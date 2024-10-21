const Doctor = require('../../Model/doctorModel')

const doctorSlotAllocate = async (req, res) => {
  try {
    const { selectedDate, pickedTimes } = req.body;
    
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  doctorSlotAllocate,
};
