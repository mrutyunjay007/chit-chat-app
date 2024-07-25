//internal models imports
const User = require("../models/user.model");
const Chat = require("../models/chat.model");
const Message = require("../models/message.model");
const uploadOnCloudinary = require("../utils/couldinary");
const MessageNotification = require("../models/messageNotification.model");

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

const searchChat = async (req, res) => {
  try {
    const user_1_id = req.userId;
    const user_2_id = req.query.userId;

    // Not getting any id from query
    if (!user_2_id) {
      res.status(404).json({
        success: false,
        msg: "user not defiend!",
      });
      return;
    }

    //prevent self messaging
    if (user_1_id == user_2_id) {
      res.status(400).json({
        success: false,
        msg: "self messsaging not allow!",
      });
      return;
    }

    // Find chat is present or not
    const chat = await Chat.findOne({
      $and: [
        {
          $or: [{ admin: user_1_id }, { member: user_1_id }],
        },
        {
          $or: [{ admin: user_2_id }, { member: user_2_id }],
        },
      ],
    }).select("_id");

    if (chat) {
      // Send existed chat
      res.status(200).json({
        success: true,
        chat,
        msg: "chat is present",
      });
    } else {
      // Create new chat
      const newChat = await Chat.create({
        admin: user_1_id,
        member: user_2_id,
      });
      await newChat.save();

      res.status(201).json({
        success: true,
        chat: newChat,
        msg: "new chat created successfully!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "user no found",
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
  const page = parseInt(req.query.page);

  const range = 25;
  const skip = (page - 1) * range;

  try {
    const messages = await Message.find({ chatId })
      .sort({ createdAt: -1 })
      .limit(range)
      .skip(skip);

    if (messages.length > 0) {
      const msgList = messages.reverse().map((msg) => {
        return {
          content: msg.content,
          msgId: msg._id,
          position:
            req.userId.toString() === msg.senderId.toString() ? true : false,
          senderId: msg.senderId,
          receiverId: msg.receiverId,
          chatId: msg.chatId,
          isFile: msg.isFile,
        };
      });
      res.status(200).json({
        success: true,
        msgList,
        msg: "getting messages successfully!",
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

const sendMessageController = async (req, res) => {
  const senderId = req.userId;
  const senderUserName = req.userName;

  const { content, chatId, receiverId } = req.body;

  try {
    if (!chatId) {
      res.status(404).json({
        success: false,
        msg: "chat is not available",
      });
    }

    const msgInformation = {
      content,
      chatId,
      senderId,
      receiverId,
      isFile: false,
    };
    //store new msg in DB
    const message = await Message.create(msgInformation);
    await message.save();

    // nead to save notification or not
    const isReciverOnline = await User.findById(receiverId).select("online");

    // in-case of offline save notificatin
    if (!isReciverOnline.online) {
      //find notificaton allready present or not
      const notification = await MessageNotification.findOne({
        $and: [{ senderId }, { receiverId }],
      });

      if (notification) {
        console.log("haaaaa");
        // present -> update
        await MessageNotification.updateOne(
          {
            $and: [{ senderId }, { receiverId }],
          },
          {
            count: notification.count + 1,
          }
        );
      } else {
        // not present -> create
        const newNotification = await MessageNotification.create({
          chatId,
          receiverId,
          senderId,
          senderUserName,
          count: 1,
        });
        await newNotification.save();
      }
    }

    //msg successfully stored
    res.status(201).json({
      success: true,
      messageInfo: {
        content: content,
        msgId: message._id,
        senderId,
        receiverId,
        chatId,
        position: true,
        isFile: false,
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

const sendImageController = async (req, res) => {
  try {
    const senderId = req.userId;

    const { chatId, receiverId } = req.body;

    const contentLocalPath = req.file.path;
    console.log(contentLocalPath);

    //upload in cloudinary and get url
    const content = await uploadOnCloudinary(contentLocalPath);

    const msgInformation = {
      content: content.url,
      chatId,
      senderId,
      receiverId,
      isFile: true,
    };
    // store new msg in DB
    const message = await Message.create(msgInformation);
    await message.save();

    //msg successfully stored
    res.status(201).json({
      success: true,
      messageInfo: {
        content: content.url,
        msgId: message._id,
        senderId,
        receiverId,
        chatId,
        position: true,
        isFile: true,
      },
      msg: "new image message successfully created!",
    });
  } catch (error) {
    console.log(error.message);

    res.status(500).json({
      success: false,
      msg: "message creation failed!",
    });
  }
};

//export all chat-handlers
module.exports = {
  createChatController,
  getChatDataController,
  sendMessageController,
  searchChat,
  sendImageController,
};
