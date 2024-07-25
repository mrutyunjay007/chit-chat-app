import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Notification from "./Notification";

function Notificatios() {
  const { status } = useSelector((state) => state.ChatInfo);
  const { notifications, notificationCount } = useSelector(
    (state) => state.NotificationInfo
  );

  return (
    <div
      className={` ${
        !status ? "flex" : "hidden"
      } md:flex flex-col border-t-2 rounded-2xl  border-slate-200 pt-3  gap-3 items-center  h-screen px-2  w-full `}
    >
      {notificationCount > 0 ? (
        notifications.map((notification) => (
          <Notification
            key={Date.now().toString(36)}
            notification={notification}
          ></Notification>
        ))
      ) : (
        <div className=" flex w-full h-full justify-center items-center">
          <span className="text-lg font-medium text-slate-400">
            {"No Notification"}
          </span>
        </div>
      )}
    </div>
  );
}

export default Notificatios;
