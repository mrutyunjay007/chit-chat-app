const User = require("../models/user.model");
const generateAccessToken = require("../utils/generateAccessToken");
const generateRefreshToken = require("../utils/generateRefreshToken");
/*  
    description :  GET USER DATA
    api : /auth/
    method : GET [PROTECTED]
    req : 
    res : User-{id,name,email} [200]/[401]  
*/
const getUserDataController = async (req, res) => {
  try {
    res.status(200).json({
      success: true,
      User: {
        id: req.userId,
        name: req.userName,
        email: req.userEmail,
      },
      msg: "getting user susseccfully!",
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      msg: "Authentication failed!",
    });
  }
};

const refreshTokenController = async (req, res) => {
  try {
    const token =
      req.cookies?.refreshToken ||
      req.header("Authorization")?.replace("Bearer ", "");

    if (!token)
      res.status(401).json({
        success: false,
        msg: "Unauthorized request",
      });

    const decode = jwt.verify(token, process.env.ACCESS_JWT_SECRET);
    const { _id } = decode;

    const user = await User.findById({ _id });

    if (!user) {
      res.status(401).json({
        success: false,
        msg: "Unauthorized request",
      });
    }

    if (token !== user.refreshToken) {
      res.status(401).json({
        success: false,
        msg: "Unauthorized request",
      });
    }

    const newRefreshToken = await generateRefreshToken(user._id);
    const newAccessToken = await generateAccessToken(
      user._id,
      user.fullName,
      user.email
    );

    user.refreshToken = newRefreshToken;
    await user.save();

    res
      .status(200)
      .cookie("accessToken", accessToken, {
        httpOnly: true,
        secure: true,
      })
      .cookie("refreshToken", refreshToken, {
        httpOnly: true,
        secure: true,
      })
      .json({
        success: true,
        User: {
          fullName,
          email,
        },
        msg: "login successfull!",
      });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unauthorized request",
    });
  }
};

const authenticationCheck = async (req, res) => {
  try {
    const userId = req.userId;
    if (userId) {
      res.status(200).json({
        success: true,
        msg: "authraised user!",
      });
    } else {
      res.status(401).json({
        success: false,
        msg: "Authentication faield! ",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Authentication faield! ",
    });
  }
};
//export
module.exports = { authenticationCheck };
