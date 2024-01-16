const express = require("express");
const { loginController } = require("../controllers/log.controller");
const {
  loginValidator,
} = require("../middlewares/validation/loginValidator.middleware");
const {
  ValidatorErrorChecker,
} = require("../middlewares/validation/validatorErrorChecker.middleware");

//Initialise Router
const log = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */
/*  
    description :  user get log-in
    api : /auth/login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
*/
log
  .route("/login")
  .post(loginValidator, ValidatorErrorChecker, loginController);

/* TODO: 
    description :  Logged out user 
    api : /auth/logout
    method : POST [PROTECTED]
    req : **not done yet
    res : **not done yet 
*/
log.route("/logout").post(async (req, res) => {
  try {
  } catch (error) {}
});

//EXPORT
module.exports = log;
