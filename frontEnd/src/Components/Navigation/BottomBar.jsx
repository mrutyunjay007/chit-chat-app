import React from "react";
import Nav from "./Nav";

function ButtomBar() {
  return (
    <div className=" h-[72px] w-full fixed  bottom-0  bg-white flex justify-center items-center lg:hidden">
      <Nav></Nav>
    </div>
  );
}

export default ButtomBar;
