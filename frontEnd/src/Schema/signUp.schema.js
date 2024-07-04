import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  fullName: Yup.string()
    .min(2, "*too Short!")
    .max(50, "*too Long!")
    .required("*required"),

  email: Yup.string().email("*invalid email").required("*required"),

  password: Yup.string()
    .min(8, "*password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "*password must contain at least one letter, one number, and one special character"
    )
    .required("*password is required"),
});

export default SignupSchema;
