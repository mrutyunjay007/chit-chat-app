import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  ConnectionElememtFromNotification,
  NotificationCount,
  RemoveNotification,
} from "../../Redux/Slices/NotificationSlice";
import { InChat } from "../../Redux/Slices/NavSlice";
import axios from "axios";

function Notification({ notification, index }) {
  const { notificationCount } = useSelector((state) => state.NotificationInfo);

  const dispatch = useDispatch();
  return (
    <div
      className="flex items-center  font-bold text-white  w-full pl-3 py-2 rounded-md  bg-green-500 cursor-pointer"
      onClick={() => {
        (async () => {
          try {
            const { data } = await axios.post(
              `${import.meta.env.BASE_URL}/api/v1/notification/delete`,
              {
                ...notification,
              },
              {
                header: {
                  "Content-Type": "application/json",
                },
              }
            );
          } catch (error) {
            console.log(error);
          }
        })();

        dispatch(InChat());
        dispatch(ConnectionElememtFromNotification(notification));
        dispatch(NotificationCount(notificationCount - 1));
        dispatch(RemoveNotification(index));
      }}
    >
      {`you have a new message from ${notification.senderUserName} !`}
    </div>
  );
}

export default Notification;
