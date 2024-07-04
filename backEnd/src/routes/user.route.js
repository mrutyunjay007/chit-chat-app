//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");

//Initialise Router
const user = express.Router();

//IMP CONTROLLERS
const {
  addConnectionController,
  getUserDataController,
  getUserOnlineStatusController,
} = require("../controllers/user.controller");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  add a new connection
    api : /user/addconnection
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
// user.route("/addconnection").post(protected, addConnectionController);
user.route("/").get(protected, getUserDataController);
user.route("/online").get(protected, getUserOnlineStatusController);

//EXPORT USER-ROUTER
module.exports = user;
