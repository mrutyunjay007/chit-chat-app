import { io } from "socket.io-client";

const socket = io("chit-chat-app-mmj3.vercel.app");
// const socket = io("http://localhost:5000");

export const userOnlineStatusSocket = io(
  "chit-chat-app-mmj3.vercel.app/userstatus"
  // "http://localhost:5000/userstatus"
);

export default socket;
