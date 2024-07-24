import React from "react";
import { RiLoader4Line } from "react-icons/ri";

function Spiner({ size }) {
  return (
    <RiLoader4Line className={`size-${size} animate-spin text-slate-300 `} />
  );
}

export default Spiner;
