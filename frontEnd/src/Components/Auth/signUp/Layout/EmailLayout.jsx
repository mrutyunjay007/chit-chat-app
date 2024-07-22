import React from "react";
import { Outlet } from "react-router-dom";

function EmailLayout() {
  return (
    <div className=" h-full w-full">
      <Outlet></Outlet>
    </div>
  );
}

export default EmailLayout;
