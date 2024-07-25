const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Create User Schema
const UserSchema = new Schema(
  {
    userName: {
      type: String,
      unique: true,
      lowercase: true,
      index: true,
    },
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    password: {
      type: String,
      require: true,
    },
    profilePic: {
      type: String,
    },

    refreshToken: {
      type: String,
    },
    ping: [
      {
        code: String,
        connectionName: String,
      },
    ],
    online: Boolean,
    realTimeId: {
      type: String,
    },
  },

  { timestamps: true }
);

//export
const User = mongoose.model("User", UserSchema);
module.exports = User;
