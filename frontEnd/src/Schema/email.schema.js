import * as Yup from "yup";
const EmailSchema = Yup.object().shape({
  email: Yup.string().email("*invalid email").required("*required"),
});

export default EmailSchema;
