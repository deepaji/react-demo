let mongoose = require("mongoose");
let validator = require("validator");

let userSchema = new mongoose.Schema(
  {
    user_id: {
      type: String,
      required: false,
      unique: true,
      validate: value => {
        return validator.isAlphanumeric(value);
      }
    },
    active_dir_id: { type: String },
    user_email: {
      type: String,
      required: true,
      unique: true,
      validate: value => {
        return validator.isLowercase(value);
      }
    }
  },
  {
    timestamps: true
  }
);

let UserModel = mongoose.model("User", userSchema);

userSchema.statics.createUser = function(email, cb) {
  let model = new UserModel({
    user_email: email
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

module.exports = UserModel;
