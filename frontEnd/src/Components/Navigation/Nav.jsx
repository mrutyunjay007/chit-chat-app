import React from "react";

import { useSelector, useDispatch } from "react-redux";
import { RiAlarmWarningLine } from "react-icons/ri";
import { RiAccountCircleLine } from "react-icons/ri";
import { RiAccountCircleFill } from "react-icons/ri";
import { RiChat4Line } from "react-icons/ri";
import { RiChat4Fill } from "react-icons/ri";
import { RiChatNewLine } from "react-icons/ri";
import { RiChatNewFill } from "react-icons/ri";
import { CreatingChat, InChat, InProfile } from "../../Redux/Slices/NavSlice";

function Nav() {
  const { isInChat, isCreatingChat, isInProfile } = useSelector(
    (state) => state.Navigation
  );

  const dispatch = useDispatch();

  return (
    <ul className=" flex lg:flex-col dark:bg-background lg:gap-5 justify-evenly items-center w-full bg-white">
      <li className=" cursor-pointer">
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
      </li>
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
        <span>
          {/* notification */}
          <RiAlarmWarningLine className="size-7" />
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
