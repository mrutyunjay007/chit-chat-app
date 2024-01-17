//internal models imports
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");

/*------------------------- CREATE CHAT-CONTROLLER ------------------------ */
/*  
    description :  create a new chat
    api : /chat/createchat
    method : POST [PROTECTED]
    req : connection-{id,name}
    res : chatId [201]/[200 present]/[403]  
*/
const createChatController = async (req, res) => {
  const user1 = { id: req.userId, name: req.userName }; //Loggedin User
  const user2 = { id: req.body.connection.id, name: req.body.connection.name }; //Other User

  try {
    //check Chat is present or not
    const isChat = await Chat.find({
      $and: [
        { users: { $elemMatch: { id: user1.id } } },
        { users: { $elemMatch: { id: user2.id } } },
      ],
    });

    //Not
    if (!isChat[0]) {
      const usersInformation = [user1, user2];
      const chat = await Chat.create({ users: usersInformation });
      await chat.save();

      //for ping operation
      const currentUser = await User.findById({ _id: req.userId });
      const currentUserCheetCode = currentUser.cheetCode;

      await User.findByIdAndUpdate(
        {
          _id: user2.id,
        },
        {
          $push: {
            ping: [
              { code: currentUserCheetCode, connectionName: req.userName },
            ],
          },
        }
      );

      res.status(201).json({
        success: true,
        chatId: chat._id,
        msg: "A new chat has been successfully created!",
      });
    }
    //Present
    else {
      res.status(200).json({
        success: true,
        chatId: isChat[0]._id,
        msg: "this chat already been present!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(403).json({
      success: false,
      msg: "Forbidden!",
    });
  }
};

/*  
    description :  get all messages of a chat
    api : /chat/data
    method : GET [PROTECTED]
    req : chat-id
    res : msgList-[{content,id,position,senderId,receiverId,chatId},...] [200]/[404]/[500]
*/
const getChatDataController = async (req, res) => {
  const { chatId } = req.body;

  try {
    const messages = await Message.find({ chatId });

    if (messages && messages.length > 0) {
      const msgList = messages.map((msg) => {
        return {
          content: msg.content,
          msgId: msg._id,
          position:
            req.userId.toString() === msg.senderId.toString() ? "r" : "l",
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          chatId: msg.chatId,
        };
      });
      res.status(200).json({
        success: true,
        msgList,
        msg: "getting messages successfull!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "message not found!",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "message not found!",
    });
  }
};

//export all chat-handlers
module.exports = {
  createChatController,
  getChatDataController,
};
