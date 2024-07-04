const mongoose = require("mongoose");
const { Schema, connection } = require("mongoose");

const ConnectionSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    connections: [
      {
        name: {
          type: String,
          require: true,
        },
        profilePic: {
          type: String,
        },
        chatId: {
          type: Schema.Types.ObjectId,
          ref: "Chat",
        },
      },
    ],
  },
  { timestamps: true }
);

//export
const Connection = mongoose.model("Connection", ConnectionSchema);
module.exports = Connection;
