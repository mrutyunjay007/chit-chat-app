import React, { useState } from "react";
import Connections from "./Connections";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../Notification/Notificatios";
import { RiSearchLine } from "react-icons/ri";

import Search from "../Search/Search";
// import SearchInput from "../Search/SearchInput";
import { RemoveSearchedUser } from "../../Redux/Slices/SearchSlice";

function ShowConnection({ connectionList }) {
  const dispatch = useDispatch();
  const { status, chatId } = useSelector((state) => state.ChatInfo);
  const { isInNotification } = useSelector((state) => state.Navigation);
  const { seachedUser } = useSelector((state) => state.SearchInfo);

  // Show all Notifications
  if (isInNotification) {
    return <Notifications></Notifications>;
  }

  // Show all connections or search element
  return (
    <div
      className={` ${
        !status ? "flex" : "hidden"
      } lg:flex flex-col pt-5 gap-3 items-center  h-screen lg:w-[468px] md:px-10 lg:px-0  border-r-2 border-slate-200 w-full fixed top-0  left-0`}
    >
      {/* Input to search */}
      {/* <SearchInput></SearchInput> */}
      {/* TopBar */}
      <div className="flex w-full justify-between items-center p-2 px-3">
        <span className="font-bold text-lg">{"ChitChat"}</span>
        <span className="flex justify-center items-center ">
          <span>
            <RiSearchLine className="size-7 cursor-pointer" />
          </span>
        </span>
      </div>

      {/* show the connnections except the time of searching for existed or new chat */}
      <div className=" flex flex-col gap-2 w-full p-2">
        {seachedUser !== null ? (
          // Show search
          <Search
            search={seachedUser}
            searchDone={() => {
              dispatch(RemoveSearchedUser());
            }}
          />
        ) : // Show connections

        connectionList.length > 0 ? (
          connectionList.map((connection) => (
            <Connections
              key={connection._id}
              connection={connection}
              selected={connection._id == chatId ? true : false}
            ></Connections>
          ))
        ) : (
          <span> No chat</span>
        )}
      </div>

      {/* <SideBar></SideBar> */}
    </div>
  );
}

export default ShowConnection;
