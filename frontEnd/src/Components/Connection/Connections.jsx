import React, { useEffect } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { activatedChat, chatAct } from "../../Redux/Slices/ChatSlice";
import socket from "../../Config/socket";
import ProfilePic from "../SmallComponents/PofilePic";

function Connections({ connection, selected }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selected && connection._id) {
      socket.emit("leave_chat", { chatId: connection._id });
    }
  }, [selected, connection]);

  return (
    <div
      className={`flex items-center gap-2 w-full p-4 rounded-lg border-2 ${
        selected ? "bg-black border-black" : "bg-white border-slate-300"
      } cursor-pointer`}
      onClick={() => {
        dispatch(chatAct(true));
        dispatch(activatedChat(connection));
        socket.emit("join_chat", { chatId: connection._id });
      }}
    >
      <span className={`size-7 ${selected ? "text-white" : "text-black"}`}>
        <ProfilePic
          w={"full"}
          h={"full"}
          url={connection.connection.profilePic}
        ></ProfilePic>
      </span>
      <span
        className={`font-bold size-7 ${selected ? "text-white" : "text-black"}`}
      >
        {connection.connection.userName}
      </span>
      <span></span>
    </div>
  );
}

export default Connections;
