const mongoose = require("mongoose");
const { Schema } = require("mongoose");

//Create Chat Schema
const ChatSchema = new Schema(
  {
    admin: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    member: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

//export
const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
