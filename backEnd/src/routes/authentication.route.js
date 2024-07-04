const express = require("express");

// const {
//   getUserDataController,
// } = require("../controllers/authentication.controller");

const isloggedin = require("../middlewares/isLoggedIn.middleware");
const {
  authenticationCheck,
} = require("../controllers/authentication.controller");

//Initialise Router
const authentication = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  GET USER DATA
    api : /auth/
    method : GET [PROTECTED]
    req : 
    res : User-{id,name,email} [200]/[401]  
*/
// authentication.route("/").get(isloggedin, getUserDataController);
authentication.route("/refresh-token").get();
authentication.route("/").get(isloggedin, authenticationCheck);

//EXPORT
module.exports = authentication;
