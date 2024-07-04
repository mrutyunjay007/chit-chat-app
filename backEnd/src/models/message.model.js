const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// create Message Schema
const MessageSchema = new Schema(
  {
    content: {
      type: String,
      require: true,
    },
    chatId: {
      type: Schema.Types.ObjectId,
      ref: "Chat",
    },
    senderId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    receiverId: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    isFile: {
      type: Boolean,
    },
  },
  {
    timestamps: true,
  }
);

//export
const Message = mongoose.model("Message", MessageSchema);
module.exports = Message;
