const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");

//Initialise Router
const message = express.Router();

// IMP HANDLER
const { sendMessageController } = require("../controllers/message.controller");
const { getMessageController } = require("../controllers/message.controller");

/*--------------------- CREATE ROUTERS ----------------------- */
/*  
    description :  send new message
    api : /message/send
    req : content,chat-id
    res : content [201]/[500]  
*/
message.route("/send").post(protected, sendMessageController);

/*  
    description :  send new message
    api : /message/send
    req : content,chat-id
    res : content [200]/[500]  
*/
message.route("/").get(protected, getMessageController);

//export Router
module.exports = message;
