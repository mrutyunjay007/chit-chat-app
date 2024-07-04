import React from "react";

function ButtonField({ btnName, loading }) {
  return (
    <button
      type="submit"
      className="w-full text-center text-black hover:text-white font-semibold text-[20px] py-4 mt-3 border-2 border-solid bg-slate-300 border-slate-300 hover:bg-slate-400 hover:border-slate-400 rounded-md cursor-pointer transition delay-75 ease-linear "
    >
      {!loading ? btnName : "Loading..."}
    </button>
  );
}

export default ButtonField;
