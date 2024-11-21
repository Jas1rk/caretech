const mongoose = require("mongoose");
const notificationSchema = new mongoose.Schema({
  notifications: [
    {
      content: {
        type: String,
      },
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

const Notification = mongoose.model("Notification", notificationSchema);
module.exports = Notification;
