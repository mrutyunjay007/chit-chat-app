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
  editUserProfilePicture,
  updateUserFullName,
} = require("../controllers/user.controller");
const upload = require("../middlewares/multer/multer.middleware");

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  add a new connection
    api : /user/addconnection
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400]/[500]   
*/
// user.route("/addconnection").post(protected, addConnectionController);
user.route("/").get(protected, getUserDataController);
user.route("/update-full-name").post(protected, updateUserFullName);
user
  .route("/edit-profile-picture")
  .post(protected, upload.single("profilePic"), editUserProfilePicture);
user.route("/online").get(protected, getUserOnlineStatusController);

//EXPORT USER-ROUTER
module.exports = user;
