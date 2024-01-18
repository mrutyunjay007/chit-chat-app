//internal models imports
const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

/*------------------------- CREATE HANDLERS ------------------------ */
/*  
    description :  send new message
    api : /message/send
    method : POST [PROTECTED]
    req : content,chat-id
    res : messageInfo-{content,msgId,position,senderId,receiverId,chatId} [201]/[500]  
*/
const sendMessageController = async (req, res) => {
  const senderId = req.userId;
  const { content, chatId } = req.body;

  try {
    //get receiverId
    const chat = await Chat.findById({ _id: chatId });

    const receiverId = chat.users.filter((user) => {
      return user.id.toString() !== senderId.toString();
    });

    const msgInformation = {
      content,
      chatId,
      senderId,
      receiverId: receiverId[0].id,
    };
    //store new msg in DB
    const message = await Message.create(msgInformation);
    await message.save();

    //msg successfully stored
    res.status(201).json({
      success: true,
      messageInfo: {
        content: content,
        msgId: message._id,
        senderId,
        receiverId: receiverId[0].id,
        chatId,
        position: "r",
      },
      msg: "new message successfully created!",
    });
  } catch (err) {
    console.log(err);
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "message creation failed!",
    });
  }
};

/*  
    description :  get single message [NOTE** get all message of a chat done in chat Router]
    api : /message/
    method : GET [PROTECTED]
    req : msg-id
    res : content [200]/[404]/[500]  
*/
const getMessageController = async (req, res) => {
  const { msgId } = req.body;
  try {
    const { content } = await Message.findById({ _id: msgId });

    if (content) {
      //getting msg successfull
      res.status(200).json({
        success: true,
        content,
        msg: "getting single msg successfull!",
      });
    } else {
      //getting msg failed
      res.status(404).json({
        success: false,
        msg: "getting msg failed!",
      });
    }
  } catch (err) {
    //getting msg failed
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "getting msg failed!",
    });
  }
};

//export all handler
module.exports = {
  sendMessageController,
  getMessageController,
};
