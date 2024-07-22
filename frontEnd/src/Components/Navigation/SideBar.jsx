import React from "react";
import Nav from "./Nav";

function SideBar() {
  return (
    <div className="w-[468px] h-[5.1rem] z-10 hidden lg:flex fixed bottom-0  border-t-2  border-r-2 border-slate-200">
      <Nav></Nav>
    </div>
  );
}

export default SideBar;
