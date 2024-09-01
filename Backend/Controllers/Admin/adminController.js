const dotenv = require("dotenv");
dotenv.config();
const { createToken } = require("../../Utils/jwt");
const User = require("../../Model/userModel")

const adminLoginVerify = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email === process.env.admin_email) {
      if (password === process.env.admin_password) {
        const token = createToken(email);
        res.json(token);
      } else {
        res.json("incorrectpassaword");
      }
    } else {
      res.json("incorrectemail");
    }
  } catch (err) {
    console.log(err);
  }
};

const adminFetchUsers = async (req, res) => {
  try {
    const allUsers = await User.find({}).sort({_id:-1})
    res.json(allUsers);
  } catch (error) {
    console.log(error.message);
  }
};

const adminBlockUser = async (req, res) => {
  try {
    const userID = req.query.userid;
    const blockUser = await User.findByIdAndUpdate(userID, { isBlocked: true })
    res.json(blockUser);
  } catch (err) {
    console.log(err);
  }
};

const adminUnblockUser = async (req, res) => {
  try {
    const userID = req.query._userId
    const unblockUser = await User.findByIdAndUpdate(userID,{isBlocked:false})
    res.json(unblockUser)
  } catch (err) {
    console.log(err.message);
  }
};




module.exports = {
  adminLoginVerify,
  adminFetchUsers,
  adminBlockUser,
  adminUnblockUser,

};
