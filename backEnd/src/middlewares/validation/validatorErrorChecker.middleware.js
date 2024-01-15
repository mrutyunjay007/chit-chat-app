const { validationResult } = require("express-validator");

//CHECK IF ANY ERROR HAPPENED OR NOT
const ValidatorErrorChecker = (req, res, next) => {
  //PUT ALL ERRORS AS INDIVIDUAL OBJ-ELEMENTS IN RESULT ARRAY
  const result = validationResult(req).array();

  // No Error
  if (!result.length) {
    return next();
  }

  // Error
  const error = result[0].msg;

  res.status(401).json({
    success: false,
    msg: error,
  });
};

//export
module.exports = {
  ValidatorErrorChecker,
};
