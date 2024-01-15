const express = require("express");

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
authentication.route("/").get(async (req, res) => {
  try {
  } catch (error) {}
});

//EXPORT
module.exports = authentication;
