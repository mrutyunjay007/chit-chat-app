import React from "react";
import InputField from "../InputField";
import ButtonField from "../ButtonField";

function Validation() {
  return (
    <div className="w-screen  h-screen flex flex-col justify-center items-center">
      <div className=" w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>

        <form className="w-full flex flex-col gap-4">
          <InputField
            label={"Validation"}
            type={"number"}
            name={"validation"}
          ></InputField>

          <ButtonField btnName={"Next"}></ButtonField>
        </form>
      </div>
    </div>
  );
}

export default Validation;
