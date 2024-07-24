import React, { useEffect, useState } from "react";
import InputField from "../InputField";

import { useSelector } from "react-redux";
import VarificationSchema from "../../../Schema/varification.schema";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";

function Validation() {
  const email = useSelector((state) => state.SignUpInfo.email);
  console.log(email);

  const [varified, setVarified] = useState(false);
  const [load, setLoad] = useState(false);

  const navigate = useNavigate();

  const { values, touched, errors, handleChange, handleBlur, handleSubmit } =
    useFormik({
      initialValues: {
        varification: 0,
      },
      validationSchema: VarificationSchema,
      onSubmit: (values) => {},
    });

  useEffect(() => {
    setVarified(false);
    let timer;
    if (
      values.varification >= 100000 &&
      !errors.hasOwnProperty("varification")
    ) {
      setLoad(true);
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
              "/api/v1/signup/email/varify-email",
              { email, otp: values.varification },
              config
            );

            if (data.success) {
              setVarified(true);
              setLoad(false);
            }
          } catch (error) {
            console.error(error);
            if (error.response.status == 404) {
              setVarified(false);
              setLoad(false);
            }
          }
        })();
      }, 1500);
    }

    return () => clearTimeout(timer);
  }, [values, errors]);

  console.log(errors);

  return (
    <div className="w-screen  h-screen flex flex-col justify-center items-center">
      <div className=" w-96 px-4 py-5 border-2 border-slate-200 flex flex-col gap-6">
        <header className=" text-3xl">SignUp</header>

        <form className="w-full flex flex-col gap-4">
          <span>
            <InputField
              label={"Varification"}
              type={"number"}
              name={"varification"}
              vlaue={values.varification}
              touch={touched.varification}
              error={errors.varification}
              handleChange={handleChange}
              handleBlur={handleBlur}
            ></InputField>

            {values.varification >= 100000 &&
              !errors.hasOwnProperty("varification") && (
                <span className="">
                  {load ? (
                    <span>Loading...</span>
                  ) : varified ? (
                    <span className=" text-green-600 text-[15px] font-mono font-semibold">
                      varified
                    </span>
                  ) : (
                    <span className=" text-red-600 text-[15px] font-mono font-semibold">
                      wrong varification code
                    </span>
                  )}
                </span>
              )}
          </span>
          <span
            className="w-full text-center text-black hover:text-white font-semibold text-[20px] py-4 mt-3 border-2  border-slate-200  hover:bg-black hover:border-black rounded-lg cursor-pointer transition delay-75 ease-linear "
            onClick={() => {
              if (varified) {
                navigate("/signup/username");
              }
            }}
          >
            {/* {!loading ? btnName : "Loading..."} */}
            Next
          </span>
        </form>
      </div>
    </div>
  );
}

export default Validation;
