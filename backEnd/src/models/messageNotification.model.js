const mongoose = require("mongoose");
const { Schema } = require("mongoose");

// Create MessageNotification Schema
const MessageNotificationSchema = new Schema({
  chatId: {
    type: Schema.Types.ObjectId,
    ref: "Chat",
  },
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  senderUserName: {
    type: String,
  },
  count: {
    type: Number,
  },
});

//export
const MessageNotification = mongoose.model(
  "messageNotification",
  MessageNotificationSchema
);

module.exports = MessageNotification;
