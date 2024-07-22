import React from "react";
import { Outlet } from "react-router-dom";

function SignUpLayout() {
  return (
    <div className=" h-full w-full">
      <Outlet></Outlet>
    </div>
  );
}

export default SignUpLayout;
