const dotenv = require("dotenv");
dotenv.config();
const { createToken } = require("../../Utils/jwt");

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

module.exports = {
  adminLoginVerify,
};
