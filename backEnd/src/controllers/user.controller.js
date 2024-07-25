//extranal import
// const isConnectionPresent = require("../Utility/isConnectionPresent");

//internal models imports
const { default: mongoose } = require("mongoose");
const User = require("../models/user.model");
const uploadOnCloudinary = require("../utils/couldinary");

/*------------------------- CREATE HANDLERS ------------------------ */
/*  
description :  add a new connection 
api : /user/addconnection
    method : POST [PROTECTED]
    req : connection-cheetCode
    res : connectionInfo-{name,id} [201]/[400 **present]/[500]  
*/
const addConnectionController = async (req, res) => {
  /*
    -> CHECK CONNECTION IS PRESENT OR NOT
            |-> YES -> CHECK CONNECTION CONNECTED OR NOT
                |-> NO  -> PUSH CONNECTION IN CONNECTED LIST OF CURRENT USER [201]
                |-> YES -> DON'T PUSH [400] 
            |-> NO -> RES -> CONNECTION IS NOT PRESENT [400]
  */

  try {
    //cheetCode of other user
    const { cheetCode } = req.body;

    //check connection is present or not
    const connection = await User.find({ cheetCode });

    if (connection && connection.length > 0) {
      //user already been connected or not

      //getting the data of current user
      const currentUser = await User.findById({
        _id: req.userId, //current user id
      });

      //get all connection list of current user
      const connectionList = await currentUser.connectedUser;

      //check connection connected with current user or not
      let isconnected = isConnectionPresent(connectionList, connection[0]._id);

      if (!isconnected) {
        //push connection in connection-list of current user
        await User.findByIdAndUpdate(
          {
            _id: req.userId,
          },
          {
            $push: {
              connectedUser: [
                { id: connection[0]._id, name: connection[0].name },
              ],
            },
          }
        );

        //connection got successfully connected
        res.status(201).json({
          success: true,
          connectionInfo: {
            name: connection[0].name,
            id: connection[0]._id,
          },
          msg: "new user successfully added!",
        });
      } else {
        // connection already connected
        res.status(400).json({
          success: false,
          msg: `user ${connection[0].name} is already connected!`,
        });
      }
    } else {
      // connection is not present in DB
      console.log("user not present!");
      res.status(404).json({
        success: true,
        msg: "not found!",
      });
    }
  } catch (err) {
    // server side error
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "not found",
    });
  }
};

const getUserDataController = async (req, res) => {
  try {
    const user = await User.aggregate([
      {
        $match: {
          _id: new mongoose.Types.ObjectId(req.userId),
        },
      },
      {
        $lookup: {
          from: "chats",
          localField: "_id",
          foreignField: "admin",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "member",
                foreignField: "_id",
                as: "member",
                pipeline: [
                  {
                    $project: {
                      userName: 1,
                      fullName: 1,
                      profilePic: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                connection: {
                  $arrayElemAt: ["$member", 0],
                },
              },
            },
            {
              $project: {
                connection: 1,
              },
            },
          ],
          as: "connections_as_member",
        },
      },
      {
        $lookup: {
          from: "chats",
          localField: "_id",
          foreignField: "member",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "admin",
                foreignField: "_id",
                as: "admin",
                pipeline: [
                  {
                    $project: {
                      userName: 1,
                      fullName: 1,
                      profilePic: 1,
                    },
                  },
                ],
              },
            },
            {
              $addFields: {
                connection: {
                  $arrayElemAt: ["$admin", 0],
                },
              },
            },
            {
              $project: {
                connection: 1,
              },
            },
          ],
          as: "connections_as_admin",
        },
      },
      {
        $project: {
          fullName: 1,
          userName: 1,
          email: 1,
          profilePic: 1,
          connections_as_member: 1,
          connections_as_admin: 1,
        },
      },
    ]);

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "user not present",
      });
    }
    res.status(200).json({
      success: true,
      user: user[0],
      msg: "user data fetched successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "Unauthorized request",
    });
  }
};

const getUserOnlineStatusController = async (req, res) => {
  try {
    const isUserOnline = await User.findById(req.query.connectionId).select(
      "online"
    );

    if (isUserOnline) {
      if (isUserOnline.online) {
        res.status(200).json({
          success: true,
          online: isUserOnline.online,
          msg: "user is online",
        });
      } else {
        res.status(200).json({
          success: true,
          online: isUserOnline.online,
          msg: "user is offline",
        });
      }
    } else {
      res.status(404).json({
        success: false,

        msg: "user not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,

      msg: "user is not available!",
    });
  }
};

const editUserProfilePicture = async (req, res) => {
  try {
    const { userId } = req.body;
    const contentLocalPath = req.file.path;

    //upload in cloudinary and get url
    const content = await uploadOnCloudinary(contentLocalPath);

    await User.findByIdAndUpdate({ _id: userId }, { profilePic: content.url });

    res.status(200).json({
      success: true,
      url: content.url,
      msg: "profile picture updated successfully!",
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      msg: "profile picture update fail!",
    });
  }
};

const updateUserFullName = async (req, res) => {
  try {
    const { userId, userFullName } = req.body;
    await User.findByIdAndUpdate({ _id: userId }, { fullName: userFullName });
    res.status(200).json({
      success: true,
      msg: "user full name update successfully!",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      msg: "user full name update failed!",
    });
  }
};

//EXPORT USER-HANDLERS
module.exports = {
  addConnectionController,
  getUserDataController,
  getUserOnlineStatusController,
  editUserProfilePicture,
  updateUserFullName,
};
