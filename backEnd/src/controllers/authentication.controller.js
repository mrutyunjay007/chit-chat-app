const User = require("../models/user.model");
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

//export
module.exports = { getUserDataController };
