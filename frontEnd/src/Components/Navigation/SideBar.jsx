import React from "react";
import Nav from "./Nav";

function SideBar() {
  return (
    <div className="w-[468px] h-[72px] pb-2 fixed bottom-0  border-t-2  border-r-2 border-slate-200">
      {/* <span className=" font-bold w-full flex justify-center items-center text-center ">
        {"chat"}
      </span> */}
      <Nav></Nav>
    </div>
  );
}

export default SideBar;
