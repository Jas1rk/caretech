const Doctor = require("../../Model/doctorModel");

const fetchUsersBookings = async (req, res) => {
  try {
  } catch (error) {
    console.log(error.message);
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
  changeStatus
};
