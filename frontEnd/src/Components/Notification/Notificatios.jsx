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
      } md:flex flex-col pt-5 gap-3 items-center  h-screen lg:w-[400px] md:w-[244px] px-2  w-full fixed top-0 lg:left-[72px] left-0`}
    >
      {notificationCount > 0 ? (
        notifications.map((notification) => (
          <Notification
            key={Date.now().toString(36)}
            notification={notification}
          ></Notification>
        ))
      ) : (
        <div>no notification</div>
      )}
    </div>
  );
}

export default Notificatios;
