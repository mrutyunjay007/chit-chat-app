const express = require("express");

const { signUpControler } = require("../controllers/register.contoler");

// signUp Validater
const {
  signUpValidator,
} = require("../middlewares/validation/registerValidator.middleware");

//Error checker for validator
const {
  ValidatorErrorChecker,
} = require("../middlewares/validation/validatorErrorChecker.middleware");

//Initialise Router
const register = express.Router();

/*------------------------- CREATE ROUTES ------------------------ */

/*  
    description :  signUp to new user
    api : /auth/signin
    method : POST
    req : name,email,password,cheetCode
    res : [201]/[500]
*/
register
  .route("/signup")
  .post(signUpValidator, ValidatorErrorChecker, signUpControler);

//EXPORT
module.exports = register;
