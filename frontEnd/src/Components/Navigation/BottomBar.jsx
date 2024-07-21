import React from "react";
import Nav from "./Nav";

function ButtomBar() {
  return (
    <div className=" h-[5.1rem] w-full fixed  bottom-0 border-t-2 border-slate-200  bg-white flex justify-center items-center lg:hidden">
      <Nav></Nav>
    </div>
  );
}

export default ButtomBar;
