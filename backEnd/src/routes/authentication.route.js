const express = require("express");

const {
  getUserDataController,
} = require("../controllers/authentication.controller");

const isloggedin = require("../middlewares/isLoggedIn.middleware");

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
authentication.route("/").get(isloggedin, getUserDataController);

//EXPORT
module.exports = authentication;
