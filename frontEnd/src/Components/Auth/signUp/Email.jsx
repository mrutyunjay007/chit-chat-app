import React from "react";
import EmailSchema from "../../../Schema/email.schema";
import InputField from "../InputField";
import ButtonField from "../ButtonField";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { signUpDataEmail } from "../../../Redux/Slices/SignUpSlice";

function Email() {
  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: EmailSchema,
      onSubmit: (values) => {
        dispatch(signUpDataEmail(values));
        navigate("/signup/email/validation");
      },
    });
  return (
    <div className="w-screen  h-screen flex flex-col justify-center items-center">
      <div className=" w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
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

          <ButtonField btnName={"Validation"}></ButtonField>
        </form>
      </div>
    </div>
  );
}

export default Email;
