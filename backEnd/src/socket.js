const app = require("./app");

const { Server } = require("socket.io");
const User = require("./models/user.model");

// CREATE HTTP SERVER FOR SOCKET
const server = require("http").createServer(app);

//USE IO FOR SOCKET
const io = new Server(server, {
  pingTimeout: 20000,
  cors: {
    origin: "https://chit-chat-app-frontend.onrender.com",
    methods: ["GET", "POST"],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type"],
  },
});

//CREATE NAME-SPACE
const userStatus = io.of("/userstatus");

userStatus.on("connection", (socket) => {
  console.log("connected to userStatus socket");

  //user connects
  socket.on("user_online", ({ userId }) => {
    (async () => {
      try {
        if (userId !== "") {
          currentUserId = userId;
          const user = await User.exists({ _id: userId });
          if (user) {
            await User.updateOne(
              { _id: userId },
              {
                realTimeId: socket.id,
                online: true,
              }
            );
          }
        }
        console.log(userId);
      } catch (error) {
        console.log(error);
      }
    })();
  });

  //user disconnects
  socket.on("disconnect", () => {
    (async () => {
      try {
        await User.updateOne(
          { realTimeId: socket.id },
          {
            realTimeId: "",
            online: false,
          }
        );
      } catch (error) {
        console.log(error);
      }
    })();
    socket.leave("user_online");
  });
});

//CONNECTING SOCKET WITH FRONTEND
io.on("connection", (socket) => {
  console.log("connected to socket");
  console.log(socket.id);
  let userId, currentChatId;

  // join user room to get notifications
  socket.on("join_user", (room) => {
    socket.join(room.userId);
    userId = room.userId;
    console.log("user id:", room.userId);
  });

  // join chat room to get messages in real-time
  socket.on("join_chat", (room) => {
    socket.join(room.chatId);
    currentChatId = room.chatId;
    console.log("chat id:", room);
    socket.to(room.chatId).emit("user_joined_chat", true);
  });

  socket.on("typing", ({ chatId }) => {
    console.log("typin....", chatId);
    socket.to(chatId).emit("connection_typing");
  });
  socket.on("stop_typing", ({ chatId }) => {
    // socket.off("typing");
    console.log("stop typing...");
    socket.to(chatId).emit("connection_stop_typing");
  });

  // listner for sending messages
  socket.on("send_message", (newMessage) => {
    console.log(newMessage);
    console.log(currentChatId);
    console.log(currentChatId !== newMessage.chatId);

    // send notifiction if user in other chat
    socket
      .to(newMessage.receiverId)
      .emit("receive_notification", { ...newMessage });

    // send real-time messages
    socket.to(newMessage.chatId).emit("recive_message", { ...newMessage });
    // socket.off("stop_typing");
  });

  // listner for sending messages
  socket.on("send_image", (newMessage) => {
    // send real-time messages
    socket.to(newMessage.chatId).emit("recive_image", { ...newMessage });
  });

  // listner to change current to next chat
  socket.on("leave_chat", (room) => {
    // leave chat to go next chat
    socket.leave(room.chatId);
    currentChatId = "";
    console.log("leaving chat:", room.chatId);
  });

  socket.on("disconnect", () => {
    socket.leave(userId);
    socket.leave(currentChatId);
    console.log("chatId Disconnected", currentChatId);
  });
});

//export
module.exports = server;
