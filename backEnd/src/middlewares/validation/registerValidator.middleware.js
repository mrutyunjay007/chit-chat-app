const { body } = require("express-validator");

//SIGN-UP VALIDATOR
const signUpValidator = [
  // Name validation
  body("name")
    .isString()
    .withMessage("Must be a valid name!")
    .isLength({ min: 3, max: 20 })
    .withMessage("Name must be within 3 to 20 character!")
    .trim(),

  //Email Validation
  body("email")
    .isEmail()
    .withMessage("Must be a valid Email!")
    .normalizeEmail(),

  //Password validation
  body("password")
    .isStrongPassword()
    .withMessage(
      "password should have atlist 8 charecters and contain at least 1 lowercase, 1 uppercase, 1 number & 1 symbol "
    ),
];

//export
module.exports = {
  signUpValidator,
};
