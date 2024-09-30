const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
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
      return res.status(401).json({ message: "Invalid token format" });
    }

    jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        if (err.name === "TokenExpiredError") {
          return res.status(403).json({ message: "Token has expired" });
        }
        return res.status(403).json({ message: "Invalid token" });
      }

      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = { createToken, verifyToken };
