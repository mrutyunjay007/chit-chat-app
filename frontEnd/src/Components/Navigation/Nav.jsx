import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RiAlarmWarningLine } from "react-icons/ri";
import { RiAlarmWarningFill } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiChat4Line } from "react-icons/ri";
import { RiChat4Fill } from "react-icons/ri";
import { RiChatNewLine } from "react-icons/ri";
import { RiChatNewFill } from "react-icons/ri";
import {
  CreatingChat,
  InChat,
  InProfile,
  ShowNewNotification,
} from "../../Redux/Slices/NavSlice";
import { chatAct } from "../../Redux/Slices/ChatSlice";

function Nav() {
  const { isInChat, isCreatingChat, isInNotification, isInProfile } =
    useSelector((state) => state.Navigation);
  const { notificationCount } = useSelector((state) => state.NotificationInfo);
  const { status, chatId } = useSelector((state) => state.ChatInfo);
  const dispatch = useDispatch();

  return (
    <ul className=" flex h-full dark:bg-background lg:gap-5 justify-evenly items-center w-full bg-white">
      {/* <li className=" cursor-pointer">
        <span
          onClick={() => {
            dispatch(CreatingChat());
          }}
        >
          {!isCreatingChat ? (
            // Add new chat icon with userName
            <RiChatNewLine className="w-7 h-7" />
          ) : (
            // activated
            <RiChatNewFill className="w-7 h-7" />
          )}
        </span>
      </li> */}
      <li className=" cursor-pointer">
        <span
          onClick={() => {
            dispatch(InChat());
          }}
        >
          {!isInChat ? (
            /* chat icon */
            <RiChat4Line className="w-7 h-7" />
          ) : (
            /* activated */
            <RiChat4Fill className="w-7 h-7" />
          )}
        </span>
      </li>
      <li className=" cursor-pointer">
        <span
          onClick={() => {
            dispatch(ShowNewNotification());
            dispatch(chatAct(false));
          }}
        >
          {/* notification */}
          {!isInNotification ? (
            <div className="size-7 relative">
              {notificationCount > 0 && (
                <div className=" absolute size-3 bg-red-600 right-0 top-1 rounded-full shadow flex justify-center items-center text-white font-bold text-[10px]">
                  {notificationCount}
                </div>
              )}
              <RiAlarmWarningLine className=" size-full" />
            </div>
          ) : (
            <RiAlarmWarningFill className="size-7" />
          )}
        </span>
      </li>
      <li className=" cursor-pointer">
        <span
          onClick={() => {
            dispatch(InProfile());
          }}
        >
          {!isInProfile ? (
            /* userProfile */
            <RiAccountCircleLine className="w-7 h-7" />
          ) : (
            /* activated */
            <RiAccountCircleFill className="w-7 h-7" />
          )}
        </span>
      </li>
    </ul>
  );
}

export default Nav;
