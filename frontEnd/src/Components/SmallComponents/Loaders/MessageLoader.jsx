import React from "react";

function MessageLoader(isByUser) {
  return (
    <div
      className={` flex ${
        isByUser ? " justify-end" : "justify-start"
      }  items-center  w-full `}
    >
      <span
        className={`drop-shadow-xl   p-3   rounde-xl bg-slate-200
          `}
      ></span>
    </div>
  );
}

export default MessageLoader;
