const jwt = require("jsonwebtoken");

require("dotenv").config();

//generating refresh-jwt Token
const generateAccessToken = (_id, fullName, userName) => {
  //generate Token
  const token = jwt.sign(
    {
      _id,
      fullName,
      userName,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: JSON.stringify(process.env.ACCESS_TOKEN_EXPIRY),
    }
  );

  return token;
};

module.exports = generateAccessToken;
