const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGOURL);
    console.log("MongoDB connected");
  } catch (err) {
    console.log("error is connection", err);
  }
};

module.exports = connectDb;
