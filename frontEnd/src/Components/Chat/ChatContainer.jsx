import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiArrowLeftSLine } from "react-icons/ri";
import ChatBody from "./ChatBody";
import { useDispatch, useSelector } from "react-redux";
import { chatAct } from "../../Redux/Slices/ChatSlice";
import ChatInput from "./ChatInput";
import { RemoveSedingMessage } from "../../Redux/Slices/MessageSlice";

function ChatContainer() {
  const { status, connectionUserName, isConnectionOnline } = useSelector(
    (state) => state.ChatInfo
  );
  const { sendingMessage } = useSelector((state) => state.MessageInfo);
  const dispatch = useDispatch();

  if (status === false) {
    return (
      <div className={` hidden lg:block w-full pl-[468px] h-full`}>
        <div className=" flex justify-center items-center w-full h-full bg-slate-white ">
          <span className="text-lg font-medium text-slate-400 ">No chat</span>
        </div>
      </div>
    );
  }
  return (
    <div
      className={` ${status ? "block" : "hidden"} w-full lg:pl-[468px] h-full`}
    >
      <div className={` w-full h-full flex flex-col bg-white`}>
        {/* Top Bar */}
        <div className="flex gap-1 items-center h-[5.1rem] w-full px-2  border-b-2 border-s-slate-200 ">
          <RiArrowLeftSLine
            className=" lg:hidden  size-8 cursor-pointer"
            onClick={() => {
              dispatch(chatAct(false));
            }}
          />
          {/* profile-pic */}
          <RiAccountCircleLine className=" cursor-pointer size-8"></RiAccountCircleLine>

          <div className="relative">
            {/* user-name */}
            <span className="   text-xl font-bold cursor-pointer p-0">
              {connectionUserName}
            </span>

            {/* online-offline status */}
            <span
              className={`absolute left-0 top-6 text-[10px]  font-semibold  p-0 ${
                isConnectionOnline ? "text-green-600" : "text-slate-300"
              }`}
            >
              {isConnectionOnline ? "online" : "off"}
            </span>
          </div>
        </div>

        {/* Chat Body -> Mid */}
        <ChatBody
          sendingMessage={sendingMessage}
          handelSendingMessage={() => {
            dispatch(RemoveSedingMessage());
          }}
        ></ChatBody>

        {/* message write and send-> Bottom */}
        <ChatInput></ChatInput>
      </div>
    </div>
  );
}

export default ChatContainer;
