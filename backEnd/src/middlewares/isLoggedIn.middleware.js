const jwt = require("jsonwebtoken");
require("dotenv").config();

const isloggedin = async (req, res, next) => {
  try {
    const token =
      req.cookies?.accessToken ||
      req.header("Authorization")?.replace("Bearer ", "");
    console.log("req is :", req);

    if (!token) {
      res.status(401).json({
        success: false,
        msg: "Unauthorized request",
      });

      return;
    }

    const decode = jwt.verify(token.accessToken, process.env.ACCESS_JWT_SECRET);

    const { _id, fullName, userName } = decode;

    req.userId = _id;
    req.userName = userName;
    req.userFullName = fullName;
    next();
  } catch (err) {
    res.status(401).json({
      success: false,
      msg: "Authentication faield! ",
    });
  }
};

module.exports = isloggedin;
