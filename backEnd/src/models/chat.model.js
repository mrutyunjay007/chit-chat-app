const { Schema } = require("mongoose");

//Create Chat Schema
const ChatSchema = new Schema(
  {
    users: [
      {
        id: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        name: {
          type: String,
          require: true,
        },
      },
    ],
  },
  { timestamps: true }
);

//export
const Chat = mongoose.model("Chat", ChatSchema);
module.exports = Chat;
