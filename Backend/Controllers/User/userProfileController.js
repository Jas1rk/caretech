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
    console.log("data updated", updateUser);
    res.json(updateUser);
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  updateUserProfile,
};
