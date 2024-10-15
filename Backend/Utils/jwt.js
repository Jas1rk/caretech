const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();

const createAccessToken = (userId) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
    expiresIn: "1h",
  });
  return token;
};

const createRefreshToken = (userId) => {
  const refreshToken = jwt.sign(
    { userId },
    process.env.JWT_REFRESH_SECRET_KEY,
    { expiresIn: "7d" }
  );
  return refreshToken;
};

const verifyAccessToken = (req, res, next) => {
  try {
    const accessToken = req.cookies["accessToken"];
    if (!accessToken) {
      return res.status(401).json({ message: "No access token provided" });
    }

    jwt.verify(accessToken, process.env.JWT_SECRET_KEY, (err, decoded) => {
      if (err) {
        return res
          .status(403)
          .json({ message: "Invalid or expired access token" });
      }
      req.userId = decoded.userId;
      next();
    });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

const refreshToken = async (req, res) => {
  try {
    const refresh_token = req.cookies["refreshToken"];
    if (!refresh_token) {
      return res.status(401).json({ message: "No refresh token provided" });
    }

    jwt.verify(
      refresh_token,
      process.env.JWT_REFRESH_SECRET_KEY,
      (err, decoded) => {
        if (err) {
          return res
            .status(403)
            .json({ message: "Invalid or expired refresh token" });
        }

        const newAccessToken = createAccessToken(decoded.userId);
        res.cookie("accessToken", newAccessToken, {
          httpOnly: true,
          secure: true,
          sameSite: "Strict",
          maxAge: 1 * 60 * 60 * 1000,
        });

        res.json({ accessToken: newAccessToken });
      }
    );
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

module.exports = {
  createAccessToken,
  createRefreshToken,
  verifyAccessToken,
  refreshToken,
};
