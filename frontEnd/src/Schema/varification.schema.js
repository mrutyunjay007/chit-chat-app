import * as Yup from "yup";
const VarificationSchema = Yup.object().shape({
  varification: Yup.number()
    .min(100000, "*minimum six numbers are required")
    .required("*required"),
});

export default VarificationSchema;
