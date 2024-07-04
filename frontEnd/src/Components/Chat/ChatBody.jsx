import React, { useEffect, useRef, useState } from "react";
import Message from "../Messages/Message";
import axios from "axios";
import socket from "../../Config/socket";

import { useDispatch, useSelector } from "react-redux";
import { RemoveImageMessage } from "../../Redux/Slices/MessageSlice";
import { connectionOnlineStatus } from "../../Redux/Slices/ChatSlice";

function ChatBody({ sendingMessage, handelSendingMessage }) {
  const { chatId, connecetionId, isConnectionOnline } = useSelector(
    (state) => state.ChatInfo
  );
  const { userId, userName, userFullName } = useSelector(
    (state) => state.UserInfo
  );
  const { imageMessage } = useSelector((state) => state.MessageInfo);
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const [messages, setMessages] = useState([]);
  const [page, setPage] = useState(1);
  const [messageCount, setMessageCount] = useState(0);
  const [isMessageSending, setIsMessageSending] = useState(false);
  const [receivedMessages, setReceivedMessages] = useState(0);
  const [connetionTyping, setConnectionTyping] = useState(false);
  const intersectionObserverRef = useRef(null);

  const fetchData = async () => {
    const config = {
      header: {
        "Content-Type": "application/json",
      },
    };

    try {
      const { data } = await axios.post(
        `/api/v1/chat/chatdata?page=${page}`,
        {
          chatId,
        },
        config
      );

      if (data.success) {
        console.log(page);
        setPage(page + 1);
        setReceivedMessages(data.msgList.length);
        setIsMessageSending(false);
        setMessages((pre) => [...data.msgList, ...pre]);
      }
    } catch (error) {
      if (error.response.status == 404) {
        setMessageCount(0);
      } else {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    socket.on("recive_message", (recivedMessage) => {
      const { content } = recivedMessage;

      if (content) {
        setMessages([
          ...messages,
          {
            msgId: Date.now().toString(36),
            content: content,

            position: false,
            isFile: false,
          },
        ]);
      }
    });

    socket.on("recive_image", (recivedImage) => {
      setMessages((pre) => [
        ...pre,
        {
          msgId: Date.now().toString(36),
          content: recivedImage.content,

          position: false,
          isFile: true,
        },
      ]);
    });

    socket.on("connection_typing", () => {
      setConnectionTyping(true);

      console.log("typing...");
    });

    socket.on("connection_stop_typing", () => {
      setConnectionTyping(false);
      console.log("stop typing...");
    });

    socket.on("user_joined_chat", (isOnline) => {
      if (isOnline) {
        dispatch(connectionOnlineStatus(isOnline));
      }
    });
    socket.on("user_leave_chat", (isOnline) => {
      if (!isOnline) {
        dispatch(connectionOnlineStatus(isOnline));
      }
    });

    return () => {
      socket.off("recive_image");
      socket.off("recive-message");
      socket.off("connection_typing");
      socket.off("connection_stop_typing");
      socket.off("user_joined_chat");
    };
  });

  useEffect(() => {
    chatId &&
      (async () => {
        setError(false);
        setLoading(true);
        setMessages([]);

        const config = {
          header: {
            "Content-Type": "application/json",
          },
        };

        try {
          const res = await axios.get(
            `api/v1/user/online?connectionId=${connecetionId}`
          );

          if (res.data.success) {
            dispatch(connectionOnlineStatus(res.data.online));
          }

          const { data } = await axios.post(
            `/api/v1/chat/chatdata?page=${1}`,

            {
              chatId,
            },
            config
          );

          if (data.success) {
            setMessages([...data.msgList]);
            setMessageCount(data.msgList.length);
            setPage(2);
          }
        } catch (error) {
          if (error.response.status == 404) {
            setError(true);
          }

          console.log(error);
        } finally {
          setLoading(false);
        }
      })();
  }, [chatId]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && messageCount > 24) {
        fetchData();
      }
    });

    const timer =
      intersectionObserverRef.current &&
      setTimeout(() => {
        observer.observe(intersectionObserverRef.current);
      }, 500);

    return () => {
      if (intersectionObserverRef.current) {
        observer.unobserve(intersectionObserverRef.current);
        clearTimeout(timer);
      }
    };
  }, [messageCount, page]);

  useEffect(() => {
    if (sendingMessage) {
      setError(false);
      setMessages((pre) => [
        ...pre,
        {
          msgId: Date.now().toString(36),
          content: sendingMessage,

          position: true,
          isFile: false,
        },
      ]);
      handelSendingMessage();
      setIsMessageSending(true);

      //realTime sendMessage [Socket]

      socket.emit("send_message", {
        chatId,
        receiverId: connecetionId,
        senderId: userId,
        senderFullName: userFullName,
        senderUserName: userName,
        content: sendingMessage,
      });

      (async () => {
        try {
          const config = {
            header: {
              "Content-Type": "application/json",
            },
          };

          const { data } = await axios.post(
            "api/v1/chat/sendmessage",
            {
              content: sendingMessage,
              chatId,
              receiverId: connecetionId,
            },
            config
          );
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [sendingMessage]);

  useEffect(() => {
    if (imageMessage !== "") {
      setMessages((pre) => [
        ...pre,
        {
          msgId: Date.now().toString(36),
          content: imageMessage,

          position: true,
          isFile: true,
        },
      ]);
      const temp = socket.emit("send_image", { chatId, content: imageMessage });

      setIsMessageSending(true);
      dispatch(RemoveImageMessage());
    }
  }, [imageMessage]);

  if (loading)
    return (
      <div className=" w-full h-[calc(100%-144px)] lg:min-h-[calc(100%-150px)]">
        {"Loading..."}
      </div>
    );
  if (error)
    return (
      <div className=" w-full h-[calc(100%-144px)] lg:min-h-[calc(100%-150px)]">
        {"No Messasge"}
      </div>
    );

  return (
    <div className=" flex flex-col gap-4 w-full overflow-y-auto  h-[calc(100%-144px)] md:h-[calc(100%-215px)] lg:min-h-[calc(100%-150px)]  px-3 py-3">
      {messageCount > 24 && (
        <div ref={intersectionObserverRef}>{"Loading..."}</div>
      )}
      {messages.map((message, index) => (
        <Message
          key={message.msgId}
          isByUser={message.position}
          content={message.content}
          index={index}
          isFile={message.isFile}
          length={messages.length}
          isMessageSending={isMessageSending}
          receivedMessages={receivedMessages}
        ></Message>
      ))}
      {connetionTyping && (
        <Message
          isByUser={false}
          content={"..."}
          connectionTyping={connetionTyping}
        ></Message>
      )}
    </div>
  );
}

export default ChatBody;
