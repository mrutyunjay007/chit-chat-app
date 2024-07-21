import React, { useEffect, useState } from "react";
import SideBar from "../Navigation/SideBar";
import ShowConnection from "../Connection/ShowConnection";
import ChatContainer from "../Chat/ChatContainer";
import BottomBar from "../Navigation/BottomBar";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { userData } from "../../Redux/Slices/UserSlice";
import socket, { userOnlineStatusSocket } from "../../Config/socket";
import {
  AddAllNotification,
  AddNotification,
  NotificationCount,
} from "../../Redux/Slices/NotificationSlice";
import { activatedChat, chatAct } from "../../Redux/Slices/ChatSlice";
import { RemoveSearchedElement } from "../../Redux/Slices/SearchSlice";

function Home() {
  const dispatch = useDispatch();
  const [connectionList, setConnectionList] = useState([]);
  const { chatId } = useSelector((state) => state.ChatInfo);
  const { userId } = useSelector((state) => state.UserInfo);

  const { notificationCount, notificationElement } = useSelector(
    (state) => state.NotificationInfo
  );
  const { searchElement } = useSelector((state) => state.SearchInfo);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("/api/v1/user");

      if (data.success) {
        setConnectionList([
          ...data.user.connections_as_admin,
          ...data.user.connections_as_member,
        ]);
        dispatch(
          userData({
            userId: data.user._id,
            userFullName: data.user.fullName,
            userName: data.user.userName,
          })
        );

        socket.emit("join_user", { userId: data.user._id });
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get("api/v1/notification");

        if (data.success) {
          const { notifications } = data;
          dispatch(NotificationCount(data.notifications.length));
          dispatch(AddAllNotification([...notifications]));
        }
      } catch (error) {
        // TODO: handel 404 error
        console.log(error);
      }
    })();
  }, []);

  /// for real-time notification
  useEffect(() => {
    userOnlineStatusSocket.emit("user_online", { userId });

    socket.on("receive_notification", (recivedMessage) => {
      if (chatId != recivedMessage.chatId) {
        dispatch(NotificationCount(notificationCount + 1));
        dispatch(
          AddNotification({
            chatId: recivedMessage.chatId,
            receiverId: recivedMessage.receiverId,
            senderId: recivedMessage.senderId,
            senderUserName: recivedMessage.senderUserName,
          })
        );

        (async () => {
          const res = await axios.post(
            "api/v1/notification/",
            {
              chatId: recivedMessage.chatId,
              receiverId: recivedMessage.receiverId,
              senderId: recivedMessage.senderId,
              senderUserName: recivedMessage.senderUserName,
            },
            {
              header: {
                "Content-Type": "application/json",
              },
            }
          );
        })();

        console.log("you have new notice!");
      }
    });

    return () => {
      socket.off("receive_notification");
    };
  });

  // open chat from notificatin
  useEffect(() => {
    if (notificationElement !== null) {
      const { chatId, senderId, senderFullName, senderUserName } =
        notificationElement;

      const newConnection = {
        _id: chatId,
        connection: {
          _id: senderId,
          userName: senderUserName,
          fullName: senderFullName,
        },
      };

      const isInList =
        connectionList.length > 0 &&
        connectionList.findIndex((connection) => connection._id == chatId);

      if (connectionList.length == 0 || isInList == -1) {
        setConnectionList([...connectionList, newConnection]);
      }
      socket.emit("join_chat", { chatId });
      dispatch(chatAct(true));
      dispatch(activatedChat(newConnection));
    }
  }, [notificationElement]);

  useEffect(() => {
    if (searchElement !== null) {
      console.log(searchElement);
      const isInList =
        connectionList.length > 0 &&
        connectionList.findIndex(
          (connection) => connection._id == searchElement._id
        );

      if (connectionList.length == 0 || isInList == -1) {
        setConnectionList([...connectionList, searchElement]);
      }
      dispatch(chatAct(true));
      dispatch(activatedChat(searchElement));
      dispatch(RemoveSearchedElement());
    }
  }, [searchElement]);

  return (
    <>
      <div className="  w-full h-full">
        <span>
          <SideBar></SideBar>

          <ShowConnection connectionList={connectionList}></ShowConnection>
        </span>

        {/* <ShowConnection></ShowConnection> */}
        <ChatContainer></ChatContainer>
      </div>
      <BottomBar></BottomBar>
    </>
  );
}

export default Home;
