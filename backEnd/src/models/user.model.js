const { Schema } = require("mongoose");

// Create User Schema
const UserSchema = new Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    cheetCode: {
      type: String,
      unique: true,
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
    connectedUser: [
      {
        id: {
          type: Schema.Types.ObjectId,
          ref: "User",
        },
        name: String,
      },
    ],
  },
  { timestamps: true }
);

//export
const User = mongoose.model("User", UserSchema);
module.exports = User;
