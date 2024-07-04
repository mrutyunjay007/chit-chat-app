import * as Yup from "yup";

const UserNameSchema = Yup.object().shape({
  userName: Yup.string()
    .min(3, "*minimum three latters or numbers are required")
    .required("*required")
    .matches(/^[a-zA-Z0-9]/, "*user name should start with letters or numbers")
    .matches(
      /^[a-z0-9]([a-z0-9]*_{0,1}[a-z0-9]+_{0,1})$/,
      "*user name can only use letters, numbers and one uderscore"
    ),
});

export default UserNameSchema;
