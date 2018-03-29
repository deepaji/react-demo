let mongoose = require("mongoose");
let validator = require("validator");

let notificationSchema = new mongoose.Schema({
  // NOTIFICATION_ID

  // MESSAGE
  message: {
    type: String,
    required: true,
    validate: value => {
      return validator.isAlphanumeric(value);
    }
  },

  // ACTION
  action: { type: String },
  // TIMESTAMP_SENT
  time_sent: { type: Date, required: true, default: Date.now },
  // EXPIRATION DATE
  expiration_date: {
    type: Date,
    validate: value => {
      return validator.isAfter(value);
    }
  },
  // EXPIRED
  expired: { type: Boolean, default: false }
});
