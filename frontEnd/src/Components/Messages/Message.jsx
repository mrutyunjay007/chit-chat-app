import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ViewedMessage } from "../../Redux/Slices/MessageSlice";

function Message({
  isByUser,
  content,
  index,
  length,
  isMessageSending,
  receivedMessages,
  connectionTyping,
  isFile,
}) {
  const { messageView } = useSelector((state) => state.MessageInfo);
  const recentMessageRef = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    if (index === length - 1) {
      recentMessageRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      dispatch(ViewedMessage(length - 1 - index));
    }
  }, []);

  useEffect(() => {
    if (receivedMessages > 0 && index == receivedMessages) {
      recentMessageRef.current?.scrollIntoView({
        block: "center",
        behavior: "instant",
      });
      dispatch(ViewedMessage(length - 1 - index));
    }
  }, [index, receivedMessages]);

  useEffect(() => {
    if (isMessageSending && index === length - 1) {
      recentMessageRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      dispatch(ViewedMessage(0));
    }
  }, [index, isMessageSending]);

  useEffect(() => {
    if (connectionTyping && messageView < 5) {
      recentMessageRef.current?.scrollIntoView({
        block: "center",
        behavior: "smooth",
      });
      dispatch(ViewedMessage(0));
    }
  }, [connectionTyping, messageView]);

  return (
    <div
      ref={recentMessageRef}
      className={` flex ${
        isByUser ? " justify-end" : "justify-start"
      }  items-center  w-full `}
    >
      <span
        className={`drop-shadow-xl text-xl  p-2 font-semibold break-words overflow-hidden max-w-sm ${
          isByUser
            ? `${
                isFile ? "bg-none" : "bg-black"
              } rounded-l-lg rounded-tr-lg text-white`
            : `${
                isFile ? "bg-none border-none" : "bg-white border-black"
              } rounded-r-lg border-[2px] rounded-tl-lg text-black`
        }`}
      >
        {isFile ? (
          <img src={content} alt={content} loading="lazy"></img>
        ) : (
          content
        )}
      </span>
    </div>
  );
}

export default Message;
