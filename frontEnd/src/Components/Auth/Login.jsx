import React from "react";
import InputField from "./InputField";
import { useFormik } from "formik";
import LoginSchema from "../../Schema/login.schema";
import ButtonField from "./ButtonField";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        userName: "",
        password: "",
      },
      validationSchema: LoginSchema,
      onSubmit: (values) => {
        (async () => {
          try {
            const config = {
              header: {
                "content-type": "application/json",
              },
            };

            const { data } = await axios.post(
              `${import.meta.env.VITE_BASE_URL}/api/v1/login`,
              { userName: values.userName, password: values.password },
              config
            );
            if (data.success) {
              localStorage.setItem("token", data.token);
              navigate("/home");
            }
          } catch (error) {
            console.log(error.message);
          }
        })();
      },
    });

  return (
    <div className="w-screen px-5 md:px-0  h-screen flex flex-col gap-1 justify-center items-center">
      <div className=" w-full  md:w-96 px-4 py-6 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">Login</header>
        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <InputField
            label={"User Name"}
            type={"text"}
            name={"userName"}
            vlaue={values.userName}
            touch={touched.userName}
            error={errors.userName}
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

          <ButtonField btnName={"Login"}></ButtonField>
        </form>
      </div>

      <Link to="/signup">
        <span className="font-mono  text-slate-400 hover:text-slate-500 transition ease-linear cursor-pointer">
          {" "}
          create a new account
        </span>
      </Link>
    </div>
  );
}

export default Login;
