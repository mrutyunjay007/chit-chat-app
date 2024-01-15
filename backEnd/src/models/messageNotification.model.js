const { Schema } = require("mongoose");

// Create MessageNotification Schema
const MessageNotificationSchema = new Schema({
  receiverId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  senderId: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
});

//export
const MessageNotification = mongoose.model(
  "messageNotification",
  MessageNotificationSchema
);

module.exports = MessageNotification;
