const jwt = require("jsonwebtoken");

require("dotenv").config();

//generating refresh-jwt Token
const generateAccessToken = (_id, name, email) => {
  //generate Token
  const token = jwt.sign(
    {
      _id,
      name,
      email,
    },
    process.env.ACCESS_JWT_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY,
    }
  );

  return token;
};

module.exports = generateAccessToken;
