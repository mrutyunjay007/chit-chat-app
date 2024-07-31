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
      expiresIn: "1d",
    }
  );

  return token;
};

module.exports = generateAccessToken;
