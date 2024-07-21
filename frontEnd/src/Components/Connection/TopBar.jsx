import React, { useState } from "react";
import SearchInput from "../Search/SearchInput";
import { RiChatSmileLine } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { ActOfSearching } from "../../Redux/Slices/SearchSlice";

function TopBar() {
  const dispatch = useDispatch();

  return (
    <div className="flex w-full h-[5.1rem] justify-between items-center  px-5 md:px-3">
      <span
        onClick={() => {
          dispatch(ActOfSearching(false));
        }}
        className="cursor-pointer"
      >
        <span className="font-bold text-xl hidden md:block">{"ChitChat"}</span>
        <span className=" block md:hidden">
          <RiChatSmileLine className="size-10 text-slate-800" />
        </span>
      </span>
      <SearchInput></SearchInput>
    </div>
  );
}

export default TopBar;
