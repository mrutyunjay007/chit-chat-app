import React from "react";
import { useFormik } from "formik";
import SignupSchema from "../../../Schema/signUp.schema";
import InputField from "../InputField";
import ButtonField from "../ButtonField";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signUpData } from "../../../Redux/Slices/SignUpSlice";
import { Navigate, useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        email: "",
        password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: (values) => {
        dispatch(signUpData(values));
        navigate("/username");
      },
    });

  return (
    <div className="w-screen  h-screen flex justify-center items-center">
      <div className=" w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label={"Full Name"}
            type={"text"}
            name={"fullName"}
            vlaue={values.fullName}
            touch={touched.fullName}
            error={errors.fullName}
            handleChange={handleChange}
            handleBlur={handleBlur}
          ></InputField>

          <InputField
            label={"Email"}
            type={"email"}
            name={"email"}
            vlaue={values.email}
            touch={touched.email}
            error={errors.email}
            handleChange={handleChange}
            handleBlur={handleBlur}
          ></InputField>

          <InputField
            label={"Password"}
            type={"password"}
            name={"password"}
            vlaue={values.password}
            touch={touched.password}
            error={errors.password}
            handleChange={handleChange}
            handleBlur={handleBlur}
          ></InputField>

          <ButtonField btnName={"Next"}></ButtonField>
        </form>
        <span className="w-full text-center  font-mono text-[15px] text-slate-400 hover:text-slate-500 transition ease-linear cursor-pointer">
          {"*Already have an Account"}
        </span>
      </div>
    </div>
  );
}

export default SignUp;
