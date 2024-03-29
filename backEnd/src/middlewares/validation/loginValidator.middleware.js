const { body } = require("express-validator");

//LOG-IN VALIDATOR
const loginValidator = [
  //Email validation
  body("email")
    .isEmail()
    .withMessage("Must be a valid Email!")
    .normalizeEmail(),
];

//export
module.exports = { loginValidator };
