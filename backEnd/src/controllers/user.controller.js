//extranal import
const isConnectionPresent = require("../Utility/isConnectionPresent");

//internal models imports
const User = require("../models/userModel");

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
/*  
    description : get all connected connections 
    api : /user/
    method : GET [PROTECTED]
    req : 
    res : allConnection-[] [200]/[500]  
*/
const getConnectionController = async (req, res) => {
  try {
    const isconnected = await User.findById({
      _id: req.userId,
    });

    res.status(200).json({
      success: true,
      allConnection: isconnected.connectedUser,
      msg: "getting all connected user",
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      msg: "no connection found",
    });
  }
};

/*  
    description : get connections by it's Id 
    api : /user/:connectionId
    req : 
    parameters : connection-id  
    res : ** Not Done Yet **   
*/
const getConnectionByIdController = async (req, res) => {};

//EXPORT USER-HANDLERS
module.exports = {
  addConnectionController,
  getConnectionController,
  getConnectionByIdController,
};
