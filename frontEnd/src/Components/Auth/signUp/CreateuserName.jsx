import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import UserNameSchema from "../../../Schema/userName.schema";
import InputField from "../InputField";
import ButtonField from "../ButtonField";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function CreateuserName() {
  const signUpData = useSelector((state) => state.SignUpInfo);
  const [userNameAvailability, setUserNameAvailability] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const { values, errors, handleChange, handleBlur, handleSubmit } = useFormik({
    initialValues: {
      userName: "",
    },
    validationSchema: UserNameSchema,
    validateOnChange: true,
    onSubmit: (values) => {
      (async () => {
        try {
          const config = {
            header: {
              "content-type": "applictation/json",
            },
          };

          const res = await axios.post(
            "/api/v1/signup",
            { ...signUpData, userName: values.userName },
            config
          );
          console.log(res.data.msg);
          navigate("/login");
        } catch (error) {
          console.log(error);
        }
      })();
    },
  });

  useEffect(() => {
    let timer;
    if (values.userName.length > 0 && !errors.hasOwnProperty("userName")) {
      timer = setTimeout(() => {
        // call server

        (async () => {
          try {
            setLoading(true);
            const { data } = await axios.get(
              `/api/v1/signup/username?userName=${values.userName}`
            );
            console.log(data);
            setUserNameAvailability(data);
            setLoading(false);
          } catch (error) {
            console.log(error.message);
          }
        })();
      }, [1000]);
    }
    return () => clearTimeout(timer);
  }, [values.userName, errors]);

  return (
    <div className="w-screen  h-screen flex justify-center items-center">
      <div className=" w-96 px-4 py-6 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>
        <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
          <InputField
            label={"User Name"}
            type={"text"}
            name={"userName"}
            vlaue={values.userName}
            error={errors.userName}
            handleChange={handleChange}
            handleBlur={handleBlur}
          ></InputField>
          <span className={`${!userNameAvailability ? "hidden" : "block"} `}>
            {userNameAvailability != null ? (
              <div
                className={`${
                  !userNameAvailability.success
                    ? "text-red-500"
                    : "text-teal-500"
                } text-[15px] font-mono font-semibold`}
              >
                {"*" + userNameAvailability.msg}
              </div>
            ) : null}
          </span>
          <ButtonField btnName={"Sign-Up"} loading={loading}></ButtonField>
        </form>
      </div>
    </div>
  );
}

export default CreateuserName;
