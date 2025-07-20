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
export const apiSchema = Yup.object({
  startDate: Yup.date()
    .required("Enter start Date.")
    .max(new Date(), "Start date cannot be in the future."),
  
  endDate: Yup.date()
    .required("Enter End Date.")
    .max(new Date(), "End date cannot be in the future.")
    .min(Yup.ref("startDate"), "End date can not be before start date."),
});


export const employeeSchema = Yup.object({
  name: Yup.string()
    .required("Name is required"),

  designation_id: Yup.string()
    .required("Designation is required"),

  gender: Yup.string()
    .required("Gender is required"),

  phone: Yup.string()
    .matches(/^[0-9]{10,15}$/, "Phone must be 10–15 digits")
    .required("Phone number is required"),

  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),

  id_card: Yup.string()
    .matches(/^[0-9]{5,20}$/, "ID Card must be 5–20 digits")
    .required("ID Card is required"),

  joining_date: Yup.date()
    .required("Joining date is required"),

  address: Yup.string()
    .min(3, "Address must be at least 3 characters")
    .required("Address is required"),

  salary: Yup.number()
    .typeError("Salary must be a number")
    .positive("Salary must be positive")
    .required("Salary is required"),
});
