import React from "react";
import { RiAccountCircleLine } from "react-icons/ri";

function Connections() {
  return (
    <div className="flex items-center w-full px-2 py-2 rounded-md gap-1 bg-slate-200 cursor-pointer">
      <sapn className="">
        <RiAccountCircleLine className=" size-8"></RiAccountCircleLine>
      </sapn>
      <sapn>userName</sapn>
      <sapn></sapn>
    </div>
  );
}

export default Connections;
