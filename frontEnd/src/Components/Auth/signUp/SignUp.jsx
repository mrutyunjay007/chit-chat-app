import React from "react";
import { useFormik } from "formik";
import SignupSchema from "../../../Schema/signUp.schema";
import InputField from "../InputField";
import ButtonField from "../ButtonField";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { signUpData } from "../../../Redux/Slices/SignUpSlice";
import { Link, useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        fullName: "",
        password: "",
      },
      validationSchema: SignupSchema,
      onSubmit: (values) => {
        console.log(values);
        dispatch(signUpData({ ...values }));
        navigate("/signup/email");
      },
    });

  return (
    <div className="w-screen px-5 md:px-0 h-screen flex flex-col justify-center items-center">
      <div className="w-full  md:w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
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
      </div>
      <Link to="/login">
        <span className=" text-center  font-mono  text-slate-400 hover:text-slate-500 transition ease-linear cursor-pointer">
          {"already have an account"}
        </span>
      </Link>
    </div>
  );
}

export default SignUp;
