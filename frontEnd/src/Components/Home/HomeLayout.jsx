import React from "react";
import { Outlet } from "react-router-dom";

function HomeLayout() {
  return (
    <div className="w-full h-full">
      <Outlet></Outlet>
    </div>
  );
}

export default HomeLayout;
