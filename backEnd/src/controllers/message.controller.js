//internal models imports
const Message = require("../models/message.model");
const Chat = require("../models/chat.model");

/*------------------------- CREATE HANDLERS ------------------------ */

/*  
    description :  get single message [NOTE** get all message of a chat done in chat Router]
    api : /message/
    method : GET [PROTECTED]
    req : msg-id
    res : content [200]/[404]/[500]  
*/
const getMessageController = async (req, res) => {
  const { msgId } = req.body;
  try {
    const { content } = await Message.findById({ _id: msgId });

    if (content) {
      //getting msg successfull
      res.status(200).json({
        success: true,
        content,
        msg: "getting single msg successfull!",
      });
    } else {
      //getting msg failed
      res.status(404).json({
        success: false,
        msg: "getting msg failed!",
      });
    }
  } catch (err) {
    //getting msg failed
    console.log(err.message);
    res.status(500).json({
      success: false,
      msg: "getting msg failed!",
    });
  }
};

//export all handler
module.exports = {
  getMessageController,
};
