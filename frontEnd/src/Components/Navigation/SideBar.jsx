import React from "react";
import Nav from "./Nav";

function SideBar() {
  return (
    <div className="lg:flex flex-col gap-6 items-start pt-5 hidden   h-screen w-[72px]  border-r-2 dark:border-r-[1px]  border-s-slate-100 bg-white  dark:bg-background">
      <span className=" font-bold w-full flex justify-center items-center text-center ">
        {"ChitChat"}
      </span>
      <Nav></Nav>
    </div>
  );
}

export default SideBar;
