import { io } from "socket.io-client";

const socket = io("https://chit-chat-app-x3yx.onrender.com");

export const userOnlineStatusSocket = io(
  "https://chit-chat-app-x3yx.onrender.com/userstatus"
);

export default socket;
