let mongoose = require("mongoose");
let validator = require("validator");

let notificationSchema = new mongoose.Schema(
  {
    // NOTIFICATION_ID

    // MESSAGE
    // message: {
    //   type: String,
    //   required: true,
    //   validate: value => {
    //     return validator.isAlphanumeric(value);
    //   }
    // },

    // validate: {
    //   validator: value => {
    //     return validator.isEmail(value);
    //   },
    //   message: "{VALUE} is not a valid email"
    // }

    message: {
      type: String,
      required: true
    },

    // ACTION
    action: { type: String },
    // TIMESTAMP_SENT
    time_sent: { type: Date, required: true, default: Date.now },
    // EXPIRATION DATE
    expiration_date: {
      type: Date // validate: value => {
      //   return validator.isAfter(value);
      // }
    },
    // EXPIRED
    expired: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

let NotificationModel = mongoose.model("Notification", notificationSchema);

notificationSchema.statics.createNotification = function(
  msg,
  expirationDate,
  cb
) {
  let model = new NotificationModel({
    message: { message },
    expiration_date: { expirationDate },
    expired: false
  });

  model
    .save()
    .then(doc => {
      console.log(doc);
      cb(null, doc);
    })
    .catch(err => {
      console.error(err);
      cb(err);
    });
};
module.exports = NotificationModel;
