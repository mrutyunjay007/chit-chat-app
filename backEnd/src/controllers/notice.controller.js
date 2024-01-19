//internal models imports
const User = require("../models/user.model");
const MessageNotification = require("../models/messageNotification.model");

/*------------------------- CREATE Notify-HANDLERS ------------------------ */

/*...........................NOTIFICATION TO JOIN.......................... */
/*  
    description :  get all pings in notification formate
    api : /notify/
    method : GET [PROTECTED]
    req : 
    res : notificationList-[code, connectionName] [200]/[404]/[500]
*/
const pingToNotify = async (req, res) => {
  try {
    const userId = req.userId;

    const currentUser = await User.findById({ _id: userId });

    const notificationList = currentUser.ping;

    if (notificationList && notificationList.length > 0) {
      res.status(200).json({
        success: true,
        notificationList,
        msg: "all notification successfully retrive!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "no ntification",
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "no ntification",
    });
  }
};

/*  
    description :  get all pings in notification formate
    api : /notify/delete/:id
    method : DELETE [PROTECTED]
    req : params : id - of iteam from ping arrray to delete
    res :  [200]/[500]
*/
const deleteNotification = async (req, res) => {
  const userId = req.userId;
  const notificationId = req.params.id;

  try {
    const data = await User.findByIdAndUpdate(
      { _id: userId },
      {
        $pull: {
          ping: { _id: notificationId },
        },
      }
    );
    console.log(data);
    res.status(200).json({
      success: false,
      msg: "one notification successfully deleted!",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      msg: "cann't able to delete!",
    });
  }
};

/*...........................NOTIFICATION TO MESSAGE.......................... */
/*  
    description :  getting message notification
    api : /notify/messageNotification/
    method : GET [PROTECTED]
    req :  
    res :  messageNotificationList-[] [200]/[500]
*/
const getMessageNotification = async (req, res) => {
  const currentUserId = req.userId;
  try {
    const allMessageNotification = await MessageNotification.find({
      receiverId: currentUserId,
    });

    if (allMessageNotification.length !== 0) {
      const messageNotificationList = allMessageNotification.map(
        (notification) => {
          return notification.senderId;
        }
      );

      res.status(200).json({
        success: true,
        messageNotificationList,
        msg: "all message notification getting successfull!",
      });
    } else {
      res.status(404).json({
        success: false,
        msg: "no new message!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(505).json({
      success: false,
      msg: "no new message!",
    });
  }
};

/*  
    description :  create message notification
    api : /notify/messageNotification/create
    method : POST [PROTECTED]
    req : connectionId 
    res :  connection_id  [201]/[200]/[500]
*/
const addMessageNotification = async (req, res) => {
  const currentUserId = req.userId;
  const { connectionId } = req.body;
  console.log("connectionId:", connectionId);

  try {
    const ismsgNotify = await MessageNotification.find({
      $and: [{ receiverId: currentUserId }, { senderId: connectionId }],
    });

    if (!ismsgNotify[0]) {
      const newMessageNotification = await MessageNotification.create({
        receiverId: currentUserId,
        senderId: connectionId,
      });

      await newMessageNotification.save();

      res.status(201).json({
        success: true,
        connection_id: newMessageNotification.senderId,
        msg: "new message notification created successfully!",
      });
    } else {
      res.status(200).json({
        success: true,
        msg: "current notification allready present!",
      });
    }
  } catch (err) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "no new message!",
    });
  }
};

/*  
    description :  delete message notification
    api : /notify/messageNotification/delete/:id
    method : DELETE [PROTECTED]
    req : params : connectionId 
    res :  [200]/[404]/[500]
*/
const deleteMessageNotification = async (req, res) => {
  const currentUserId = req.userId;
  const { connectionId } = req.params;
  console.log("connectionId:", connectionId);

  try {
    const ismsgNotify = await MessageNotification.find({
      $and: [{ receiverId: currentUserId }, { senderId: connectionId }],
    });

    if (ismsgNotify[0]) {
      await MsgNotification.findByIdAndDelete({ _id: ismsgNotify[0]._id });
    } else {
      res.status(404).json({
        success: false,
        msg: "this message notfication is not found!",
      });
    }
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "this message notfication is not found!",
    });
  }
};

//export all notify-handlers
module.exports = {
  pingToNotify,
  deleteNotification,
  getMessageNotification,
  addMessageNotification,
  deleteMessageNotification,
};
