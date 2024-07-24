import React, { useState } from "react";
import Connections from "./Connections";
import { useDispatch, useSelector } from "react-redux";
import Notifications from "../Notification/Notificatios";
import TopBar from "./TopBar";
import Search from "../Search/Search";
// import SearchInput from "../Search/SearchInput";
import {
  ActOfSearching,
  RemoveSearchedUser,
} from "../../Redux/Slices/SearchSlice";
import SearchInput from "../Search/SearchInput";

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
      } lg:flex flex-col pt-5  items-center  h-screen lg:w-[468px] md:px-10 lg:px-0  border-r-2 border-slate-200 w-full fixed top-0  left-0`}
    >
      {/* Input to search */}
      {/* <SearchInput></SearchInput> */}
      {/* TopBar */}
      <TopBar></TopBar>

      {/* show the connnections except the time of searching for existed or new chat */}
      <div className=" flex flex-col gap-2 border-t-2 rounded-2xl  border-slate-200 pt-3 h-full w-full p-2">
        {seachedUser !== null ? (
          <>
            <div className="w-full flex justify-end items-center px-3 pb-2 ">
              <span
                className="rounded-full border-2 flex justify-center items-center border-red-500 size-8 cursor-pointer"
                onClick={() => {
                  dispatch(RemoveSearchedUser());
                  dispatch(ActOfSearching(false));
                }}
              >
                <span className="text-lg font-bold text-center text-red-500">
                  X
                </span>
              </span>
            </div>
            {/* // Show search */}
            <Search
              search={seachedUser}
              searchDone={() => {
                dispatch(RemoveSearchedUser());
              }}
            />
          </>
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
          <span className="w-full h-full flex text-lg font-medium text-slate-400  justify-center items-center">
            <span> No chat</span>
          </span>
        )}
      </div>

      {/* <SideBar></SideBar> */}
    </div>
  );
}

export default ShowConnection;
