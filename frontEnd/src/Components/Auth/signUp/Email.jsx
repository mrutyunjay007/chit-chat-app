import React, { useEffect, useState } from "react";
import EmailSchema from "../../../Schema/email.schema";
import InputField from "../InputField";
import ButtonField from "../ButtonField";
import { useFormik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { signUpDataEmail } from "../../../Redux/Slices/SignUpSlice";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Email() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        email: "",
      },
      validationSchema: EmailSchema,
      onSubmit: (values) => {
        dispatch(signUpDataEmail({ email: values.email }));
        navigate("/signup/email/validation");
      },
    });

  const [load, setLoad] = useState(false);
  const [emailAvailable, setEmailAvailable] = useState(false);

  useEffect(() => {
    setLoad(true);
    setEmailAvailable(false);
    let timer;
    if (values.email.length > 0 && !errors.hasOwnProperty("email")) {
      const config = {
        header: {
          "content-type": "application/json",
        },
      };
      timer = setTimeout(() => {
        (async () => {
          try {
            // setLoad(true);
            const { data } = await axios.post(
              "/api/v1/signup/email/availabe",
              { email: values.email },
              config
            );

            if (data.validate) {
              console.log(values.email);
              dispatch(signUpDataEmail({ email: values.email }));
              navigate("/signup/email/validation");
            } else {
              setEmailAvailable(false);
              setLoad(false);
            }
          } catch (error) {
            console.error(error);
            if (error.response.status == 404) {
              setEmailAvailable(true);
              setLoad(false);
            }
          }
        })();
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [values, errors]);

  return (
    <div className="w-screen  h-screen flex flex-col justify-center items-center">
      <div className=" w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>

        <form className="w-full flex flex-col gap-4" onSubmit={handleSubmit}>
          <span className="flex flex-col">
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

            {values.email.length > 0 && !errors.hasOwnProperty("email") && (
              <span className="">
                {load ? (
                  <span>Loading...</span>
                ) : emailAvailable ? (
                  <span className=" text-green-600 text-[15px] font-mono font-semibold">
                    available
                  </span>
                ) : (
                  <span className=" text-red-600 text-[15px] font-mono font-semibold">
                    not available
                  </span>
                )}
              </span>
            )}
          </span>
          <span
            onClick={async () => {
              try {
                const config = {
                  header: {
                    "content-type": "application/json",
                  },
                };
                if (emailAvailable) {
                  const { data } = await axios.post(
                    "/api/v1/signup/email/send-varificationcode",
                    { email: values.email },
                    config
                  );
                  if (data.success) {
                    navigate("/signup/email/validation");
                  }
                }
              } catch (error) {
                console.log(error);
              }
            }}
          >
            <ButtonField btnName={"Varify"}></ButtonField>
          </span>
        </form>
      </div>
    </div>
  );
}

export default Email;
