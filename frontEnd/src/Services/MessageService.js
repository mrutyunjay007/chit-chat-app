class MessageService {
  constructor() {}

  /*  
      description :  get all messages of a single chat
      api : /chat/data
      method : GET [PROTECTED]
      req : chat-id
      res : msgList-[{content,id,position},...] [200]/[404]/[500]
  */
  async receiveMessage(chatId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };

      // post the message
      const { data } = await axios.post(
        "/chat/data",
        {
          chatId,
        },
        config
      );

      if (data) {
        const { msgList } = data;
        return msgList;
      } else {
        console.log("no message for this chat");
        return [];
      }
    } catch (err) {
      console.log(err.message);
    }
  }

  /*  
      description :  send new message
      api : /message/send
      method : POST 
      req : content,chat-id
      res :  messageInfo-{content,msgId,position,senderId,receiverId,chatId} [201]/[500]   
 */
  async sendMessage(inputContent, currentChatId) {
    try {
      const config = {
        headers: {
          "content-type": "application/json",
        },
      };
      // send new message
      const { data } = await axios.post(
        "/message/send",
        {
          content: inputContent,
          chatId: currentChatId,
        },
        config
      );
      //store new message in message_List
      if (data) {
        //await socket.emit("send_msg", { ...data.messageInfo });
        return data.messageInfo;
      } else {
        return [];
      }
    } catch (err) {
      console.log(err.message);
    }
  }
}

export const messageService = new MessageService();
