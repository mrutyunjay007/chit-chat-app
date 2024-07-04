import React, { useState } from "react";
import Connections from "./Connections";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../Notification/Notificatios";

import Search from "../Search/Search";
import SearchInput from "../Search/SearchInput";
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
      } md:flex flex-col pt-5 gap-3 items-center  h-screen lg:w-[400px] md:w-[244px]   w-full fixed top-0 lg:left-[72px] left-0`}
    >
      {/* Input to search */}
      <SearchInput></SearchInput>

      {/* show the connnections except the time of searching for exisited or new chat */}
      <div className=" flex flex-col gap-2 w-full p-2">
        {seachedUser !== null ? (
          // Show search
          <Search
            search={seachedUser}
            searchDone={() => {
              dispatch(RemoveSearchedUser());
            }}
          />
        ) : (
          // Show connections
          connectionList.map((connection) => (
            <Connections
              key={connection._id}
              connection={connection}
              selected={connection._id == chatId ? true : false}
            ></Connections>
          ))
        )}
      </div>
    </div>
  );
}

export default ShowConnection;
