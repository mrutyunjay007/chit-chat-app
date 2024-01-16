const jwt = require("jsonwebtoken");

require("dotenv").config();

//generating refresh-jwt Token
const generateRefreshToken = (_id) => {
  //generate Token
  const token = jwt.sign(
    {
      _id,
    },
    process.env.REFRESH_JWT_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY,
    }
  );

  return token;
};

module.exports = generateRefreshToken;
