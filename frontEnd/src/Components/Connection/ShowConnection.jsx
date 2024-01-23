import React from "react";
import Connections from "./Connections";

function ShowConnection() {
  return (
    <div className=" md:flex flex-col pt-5 gap-3 items-center  h-screen lg:w-[400px] md:w-[244px] hidden  w-full fixed top-0 lg:left-[72px] left-0">
      <input
        type="text"
        placeholder="search..."
        className="w-4/5 p-1 border-b-2  border-s-slate-100"
      />

      <div className=" flex flex-col gap-2 w-full p-2">
        <Connections></Connections>
        <Connections></Connections>
        <Connections></Connections>
        <Connections></Connections>
      </div>
    </div>
  );
}

export default ShowConnection;
