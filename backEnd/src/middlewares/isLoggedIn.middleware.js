const jwt = require("jsonwebtoken");
require("dotenv").config();

const isloggedin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      res.status(401).json({
        success: false,
        msg: "Unauthorized request",
      });

    const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET);

    const { _id, name, email } = decode;

    req.userId = _id;
    req.userName = name;
    req.userEmail = email;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: "Authentication faield! ",
    });
  }
};

module.exports = isloggedin;
