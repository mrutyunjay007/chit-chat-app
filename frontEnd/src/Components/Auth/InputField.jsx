import React, { useRef } from "react";

function InputField({
  label,
  type,
  name,
  value,
  error,
  handleChange,
  handleBlur,
}) {
  const inputRef = useRef();
  const lableRef = useRef();

  const handelLabeStyle = () => {
    lableRef.current.style.top = "-10px";
    lableRef.current.style.left = "4";
    lableRef.current.style.fontSize = "15px";
  };

  return (
    <div className="relative">
      <label
        ref={lableRef}
        htmlFor={name}
        className=" text-[20px] font-normal bg-white font-mono  absolute top-[10px] left-4 px-2 cursor-text"
      >
        {label}
      </label>
      <input
        ref={inputRef}
        className="border-2 border-slate-300 border-solid rounded-md w-full p-3 focus:outline-slate-500"
        type={type}
        name={name}
        onChange={handleChange}
        onBlur={handleBlur}
        value={value}
        autoComplete="off"
        onFocus={handelLabeStyle}
        id={name}
      />
      {error ? (
        <div className=" text-red-500 text-[15px] font-mono font-semibold">
          {error}
        </div>
      ) : null}
    </div>
  );
}

export default InputField;
