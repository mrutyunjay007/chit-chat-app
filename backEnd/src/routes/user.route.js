//extarnal imports
const express = require("express");
const protected = require("../middlewares/isLoggedIn.middleware");

//Initialise Router
const user = express.Router();

//IMP CONTROLLERS
const { addConnectionController } = require("../controllers/user.controller");
const { getConnectionController } = require("../controllers/user.controller");
const {
  getConnectionByIdController,
} = require("../controllers/user.controller");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  add a new connection
    api : /user/addconnection
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
user.route("/addconnection").post(protected, addConnectionController);

/*  
    description :  get all connected connections 
    api : /user/
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
user.route("/").get(protected, getConnectionController);

/*  
    description :  get all connected connections 
    api : /user/:connectionId
    req : 
    parameters : connection-id  
    res : ** Not Done Yet **   
*/
user.route("/:connectionId").get(protected, getConnectionByIdController);

//EXPORT USER-ROUTER
module.exports = user;
