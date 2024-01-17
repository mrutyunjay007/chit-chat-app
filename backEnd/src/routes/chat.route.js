//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");

// Create Router
const chat = express.Router();

//IMP HANDLER
const { createChatController } = require("../controllers/chat.controller");
const { getChatDataController } = require("../controllers/chat.controller");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  create a new chat
    api : /chat/createchat
    req : user-{id,name}
    res : chatId [201]/[200 **present]/[403]  
*/
chat.route("/createchat").post(protected, createChatController);

/*  
    description :  get all messages of a chat
    api : /chat/data
    req : chat-id
    res : messages [200]/[500]
*/
chat.route("/chatdata").post(protected, getChatDataController);

//EXPORT CHAT-ROUTE
module.exports = chat;
