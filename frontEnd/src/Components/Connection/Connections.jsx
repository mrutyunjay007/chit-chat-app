import React, { useEffect } from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { useDispatch } from "react-redux";
import { activatedChat, chatAct } from "../../Redux/Slices/ChatSlice";
import socket from "../../Config/socket";

function Connections({ connection, selected }) {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!selected && connection._id) {
      socket.emit("leave_chat", { chatId: connection._id });
    }
  }, [selected, connection]);

  return (
    <div
      className={`flex items-center w-full px-2 py-2 rounded-md gap-1 ${
        selected ? "bg-black" : "bg-slate-300"
      } cursor-pointer`}
      onClick={() => {
        dispatch(chatAct(true));
        dispatch(activatedChat(connection));
        socket.emit("join_chat", { chatId: connection._id });
      }}
    >
      <span className="flex items-center">
        <RiAccountCircleLine
          className={`size-8 ${selected ? "text-white" : "text-black"}`}
        ></RiAccountCircleLine>
      </span>
      <span className={`size-8 ${selected ? "text-white" : "text-black"}`}>
        {connection.connection.userName}
      </span>
      <span></span>
    </div>
  );
}

export default Connections;
