import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export const userOnlineStatusSocket = io("http://localhost:5000/userstatus");

export default socket;
