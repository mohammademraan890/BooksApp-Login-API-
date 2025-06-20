import * as Yup from "yup";
export const API_YUP = Yup.object({
  name: Yup.string().required("Enter Name first"),
  phone: Yup.string().required("Phone number is required"),
  address: Yup.string().required("Enter Adress here."),
  balance: Yup.number().required("Enter balance here"),
});
export const loginSchema = Yup.object({
  email: Yup.string().required("Enter Email."),
  password: Yup.string()
    .matches(/^.{8}$/, "Password must be exactly 8 characters")
    .required("Password is required."),
});
