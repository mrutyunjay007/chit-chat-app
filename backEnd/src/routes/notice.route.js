//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");

//Initialise Router
const notice = express.Router();

// IMP HANDLER
const { pingToNotify } = require("../controllers/notice.controller");
const { deleteNotification } = require("../controllers/notice.controller");
const { getMessageNotification } = require("../controllers/notice.controller");
const { addMessageNotification } = require("../controllers/notice.controller");
const {
  deleteMessageNotification,
} = require("../controllers/notice.controller");

/*--------------------- CREATE ROUTERS ----------------------- */

/*.....................NOTIFICTION TO JOIN.....................*/
/*  
    description :  get all pings in notification formate
    api : /notify/
    req : 
    res : notificationList-[code, connectionName] [200]/[404]/[500]
*/
notice.route("/").get(protected, pingToNotify);

/*  
    description :  to delete iteam from ping array
    api : /notify/delete/:id
    req : params : notificationId 
    res :  [200]/[500]
*/
notice.route("/delete/:id").delete(protected, deleteNotification);

/*.....................NOTIFICTION TO MESSAGE.....................*/
/*  
    description :  getting message notification
    api : /notify/messageNotification/
    req :  
    res :  messageNotificationList-[] [200]/[500]
*/
notice.route("/messageNotification/").get(protected, getMessageNotification);

/*  
    description :  create message notification
    api : /notify/messageNotification/create
    req : connectionId 
    res :  connection_id  [201]/[200]/[500]
*/
notice
  .route("/messageNotification/create")
  .post(protected, addMessageNotification);

/*  
    description :  delete message notification
    api : /notify/messageNotification/delete/:id
    req : params : connectionId 
    res :  [200]/[404]/[500]
*/
notice
  .route("/messageNotification/delete/:connectionId")
  .delete(protected, deleteMessageNotification);

//export Router
module.exports = notice;
