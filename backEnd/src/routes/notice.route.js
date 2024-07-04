//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");
const {
  getNotification,
  saveNewNotifiaction,
  deleteNotification,
} = require("../controllers/meassageNotification.controller");

//Initialise Router
const notice = express.Router();

// IMP HANDLER

// const getNotification = require("../controllers/meassageNotification.controller");
// /*--------------------- CREATE ROUTERS ----------------------- */

// /*.....................NOTIFICTION TO JOIN.....................*/
// /*
//     description :  get all pings in notification formate
//     api : /notify/
//     req :
//     res : notificationList-[code, connectionName] [200]/[404]/[500]
// */
// notice.route("/").get(getNotification);

// /*
//     description :  to delete iteam from ping array
//     api : /notify/delete/:id
//     req : params : notificationId
//     res :  [200]/[500]
// */
// notice.route("/delete/:id").delete(protected, deleteNotification);

// /*.....................NOTIFICTION TO MESSAGE.....................*/
// /*
//     description :  getting message notification
//     api : /notify/messageNotification/
//     req :
//     res :  messageNotificationList-[] [200]/[500]
// */
// notice.route("/messageNotification/").get(protected, getMessageNotification);

// /*
//     description :  create message notification
//     api : /notify/messageNotification/create
//     req : connectionId
//     res :  connection_id  [201]/[200]/[500]
// */
// notice
//   .route("/messageNotification/create")
//   .post(protected, addMessageNotification);

// /*
//     description :  delete message notification
//     api : /notify/messageNotification/delete/:id
//     req : params : connectionId
//     res :  [200]/[404]/[500]
// */
// notice
//   .route("/messageNotification/delete/:connectionId")
//   .delete(protected, deleteMessageNotification);
notice.route("/").get(protected, getNotification);
notice.route("/").post(protected, saveNewNotifiaction);
notice.route("/delete").post(protected, deleteNotification);

//export Router
module.exports = notice;
