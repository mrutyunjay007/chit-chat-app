const express = require("express");

//Initialise Router
const register = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */

/*  
    description :  signin to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/
register.route("/signup").post(async (req, res) => {
  try {
  } catch (error) {}
});

//EXPORT
module.exports = register;
