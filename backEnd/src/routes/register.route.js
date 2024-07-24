const express = require("express");

const {
  signUpControler,
  userNameUpdateControler,
  loginController,
  checkForUserNameControler,
  checkForEmailController,
  EmailSendForValidationController,
  EmailVarificationController,
} = require("../controllers/register.contoler");

// signUp Validater
const {
  signUpValidator,
} = require("../middlewares/validation/registerValidator.middleware");

// logIn Validater
const {
  loginValidator,
} = require("../middlewares/validation/loginValidator.middleware");

//Error checker for validator
const {
  ValidatorErrorChecker,
} = require("../middlewares/validation/validatorErrorChecker.middleware");

//Initialise Router
const register = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */

/*  
    description :  signUp to new user
    api : /signup
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/
register.route("/signup").post(signUpControler);

register.route("/signup/email/availabe").post(checkForEmailController);
register
  .route("/signup/email/send-varificationcode")
  .post(EmailSendForValidationController);
register.route("/signup/email/varify-email").post(EmailVarificationController);
register.route("/signup/username").post(userNameUpdateControler);
register.route("/signup/username").get(checkForUserNameControler);

/*  
    description :  user get log-in
    api : /login
    method : POST 
    req : email,password
    res : User-{name,email} [200]/[401]/[401]  
*/
register.route("/login").post(loginController);

/* TODO: 
    description :  Logged out user 
    api : /logout
    method : POST [PROTECTED]
    req : **not done yet
    res : **not done yet 
*/
register.route("/logout").post(async (req, res) => {
  try {
  } catch (error) {}
});

//EXPORT
module.exports = register;
