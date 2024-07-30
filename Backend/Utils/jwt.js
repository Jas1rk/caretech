const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.Jwt_Secret_Key, {
    expiresIn: "1h",
  });
  return token;
};

module.exports = { createToken };
