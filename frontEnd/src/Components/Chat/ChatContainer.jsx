import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";
import ChatBody from "./ChatBody";

function ChatContainer() {
  return (
    <div className=" fixed  top-0 lg:left-[472px] lg:w-[calc(100%-472px)] md:left-[244px] md:w-[calc(100%-244px)] left-0 w-full h-full px-2">
      {/* Top Bar */}
      <div className="flex gap-1 items-center h-[72px] w-full px-2  border-b-2 border-s-slate-200  sticky top-0 ">
        <RiAccountCircleLine className=" size-8"></RiAccountCircleLine>
        <span> userName </span>
      </div>
      {/* Chat Body */}
      <ChatBody></ChatBody>
      {/* input */}
      {/* <div className="relative bottom-0 w-full"> */}
      <input
        type="text"
        className=" w-full p-5 sticky lg:bottom-0 bottom-[72px]  border-2 border-s-slate-200"
        placeholder="text"
      />
      {/* </div> */}
    </div>
  );
}

export default ChatContainer;
