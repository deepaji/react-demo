let mongoose = require("mongoose");

let MachineNotificationSchema = new mongoose.Schema(
  {
    machineId: String,
    email: String,
    notificationId: mongoose.Schema.Types.ObjectId,
    action: {
      type: String,
      enum: ["dispatched", "offline", "acknowledged", "accepted", "dismissed"]
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "MachineNotification",
  MachineNotificationSchema
);
