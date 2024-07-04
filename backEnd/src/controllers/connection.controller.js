const Connection = require("../models/connection.model");
const User = require("../models/user.model");

/*------------------------- CREATE HANDLERS ------------------------ */
/*  
    description :  get all connections
    api : /connection/
    method : GET [PROTECTED]
    req : 
    res : {connections} [200]/[500]  
*/
const getAllConnections = async (req, res) => {
  try {
    const currentUser = req.userId;

    const connections = await Connection.findById({ userId: currentUser });

    res.status(200).json({
      success: true,
      connections: connections.connections,
    });
  } catch (error) {
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "retriving connection data failed!",
    });
  }
};

const searchConnection = async (req, res) => {
  try {
    const user = await User.findOne({ userName: req.query.userName }).select(
      "_id fullName userName"
    );

    if (!user) {
      res.status(404).json({
        success: false,
        msg: "no such user present!",
      });
    } else {
      res.status(200).json({
        success: true,
        user,
        msg: "user present!",
      });
    }

   
  } catch (error) {
    console.log(error);
    res.status(500).json({
      success: false,
      msg: "user no found",
    });
  }
};

//export all handler
module.exports = {
  getAllConnections,
  searchConnection,
};
