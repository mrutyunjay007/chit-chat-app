const app = require("./app");

const { Server } = require("socket.io");

// CREATE HTTP SERVER FOR SOCKET
const server = require("http").createServer(app);

//USE IO FOR SOCKET
const io = new Server(server, {
  //pingTimeout: 1000,
  cors: {
    origin: "http://localhost:3000",
  },
});

//CONNECTING SOCKET WITH FRONTEND
io.on("connection", (socket) => {
  console.log("connected to socket".cyan.bold);
  console.log(socket.id);
  let userId, currentChatId;

  socket.on("join_user", (room) => {
    socket.join(room);
    userId = room;
    console.log("user id:", room);
  });

  socket.on("join_chat", (room) => {
    socket.join(room);
    currentChatId = room;
    console.log("chat id:", room);
  });

  socket.on("typing", (chatId) => {
    console.log("typin....");
    socket.to(chatId).emit("connection_typing");
  });
  socket.on("stop_typing", (chatId) => {
    console.log("stop typin...");
    socket.to(chatId).emit("connection_stopTyping");
  });

  socket.on("send_msg", (newMessage) => {
    console.log(currentChatId);
    console.log("user:", userId);
    console.log("recevier:", newMessage.receiverId);
    console.log(newMessage);

    socket
      .to(newMessage.receiverId)
      .emit("receive_msg", { senderId: newMessage.senderId });
    socket.to(newMessage.chatId).emit("receive_msg", { ...newMessage });
  });

  socket.on("disconnect", () => {
    socket.leave(userId);
    socket.leave(currentChatId);
    console.log("chatId Disconnected", currentChatId);
  });
});

//export
module.exports = server;
