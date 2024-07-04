const MessageNotification = require("../models/messageNotification.model");

const getNotification = async (req, res) => {
  try {
    const userId = req.userId;

    const notifications = await MessageNotification.find({
      receiverId: userId,
    });

    if (notifications.length > 0) {
      res.status(200).json({
        success: true,
        notifications,
        msg: "getting all notification successfull!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "no notification!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user not found",
    });
  }
};

const saveNewNotifiaction = async (req, res) => {
  try {
    const { chatId, receiverId, senderId, senderUserName } = req.body;

    const sameSenderNotification = await MessageNotification.findOne({
      $and: [{ senderId }, { receiverId }],
    });

    if (sameSenderNotification) {
      //upadate
      await MessageNotification.updateOne(
        {
          $and: [{ senderId }, { receiverId }],
        },
        {
          count: sameSenderNotification.count + 1,
        }
      );

      res.status(200).json({
        success: true,
        msg: "notification upadted successfully!",
      });
    } else {
      //create new one
      const newNotification = await MessageNotification.create({
        chatId,
        receiverId,
        senderId,
        senderUserName,
        count: 1,
      });
      await newNotification.save();

      res.status(201).json({
        success: true,
        msg: "new notification created successfully!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "notification creation failed!",
    });
  }
};

const deleteNotification = async (req, res) => {
  try {
    const { chatId, receiverId, senderId, senderUserName } = req.body;

    const deletedNotification = await MessageNotification.findOneAndDelete({
      $and: [{ senderId }, { receiverId }],
    });

    if (deletedNotification) {
      res.status(200).json({
        success: true,
        msg: "notification deleted successfully!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "notification not found!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "notification deletion failed!",
    });
  }
};

module.exports = {
  getNotification,
  saveNewNotifiaction,
  deleteNotification,
};
