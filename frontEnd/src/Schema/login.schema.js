import * as Yup from "yup";

const LoginSchema = Yup.object().shape({
  userName: Yup.string()
    .min(2, "*too Short!")
    .max(8, "*too Long!")
    .required("*required"),

  password: Yup.string()
    .min(8, "*password must be at least 8 characters")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
      "*password must contain at least one letter, one number, and one special character"
    )
    .required("*password is required"),
});

export default LoginSchema;
