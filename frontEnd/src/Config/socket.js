import { io } from "socket.io-client";

const socket = io("https://chit-chat-app-x3yx.onrender.com");
// const socket = io("http://localhost:5000");

export const userOnlineStatusSocket = io(
  "chit-chat-app-mmj3.vercel.app"
  // "http://localhost:5000/userstatus"
);

export default socket;
