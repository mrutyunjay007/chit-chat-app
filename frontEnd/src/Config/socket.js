import { io } from "socket.io-client";

// const socket = io("https://chit-chat-app-x3yx.onrender.com");
const socket = io("https://localhost:5000");

export const userOnlineStatusSocket = io(
  // "https://chit-chat-app-x3yx.onrender.com/userstatus"
  "https://localhost:5000"
);

export default socket;
