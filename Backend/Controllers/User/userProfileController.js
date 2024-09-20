const User = require("../../Model/userModel");

const updateUserProfile = async (req, res) => {
  try {
    const { userID, username, mobile } = req.body;
    const file = req.file;
    const updateData = {
      username: username,
      mobile: mobile,
      ...(file && { profileImage: file.originalname }),
    };
    const updateUser = await User.updateOne({ _id: userID }, updateData);
    res.json(updateUser);
  } catch (error) {
    console.log(error.message);
  }
};

const checkIsBlockUserProfile = async (req, res) => {
  try {
    const userID = req.query.userId;
    const findUser = await User.findOne({ _id: userID });
    if (findUser.isBlocked === true) {
      res.json("userblocked");
    }
  } catch (err) {
    console.log(err.message);
  }
};

module.exports = {
  updateUserProfile,
  checkIsBlockUserProfile,
};
