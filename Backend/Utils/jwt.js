const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.Jwt_Secret_Key, {
    expiresIn: "1h",
  });
  return token;
};

const verifyToken = (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ message: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    jwt.verify(token, process.env.Jwt_Secret_Key, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid token" });
      } else {
        next();
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { createToken ,verifyToken };
