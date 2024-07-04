const { body } = require("express-validator");

//LOG-IN VALIDATOR
const loginValidator = [
  //Email validation
  body("userName").isString().withMessage("Must be a valid UserName!"),
];

//export
module.exports = { loginValidator };
