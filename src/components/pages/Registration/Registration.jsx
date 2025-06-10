import {
  FormControl,
  FormControlLabel,
  FormHelperText,
  FormLabel,
  IconButton,
  InputAdornment,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Radio,
  RadioGroup,
  Select,
  TextField,
} from "@mui/material";
import "../../../App.css";
import { useContext, useRef, useState } from "react";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import validationSchema from "./YupRegistration";
import { Link, useNavigate } from "react-router-dom";
// import { AuthContext } from "../../../context/Auth";
import { useEffect } from "react";
import IMask from "imask";
import { AppContext } from "../../../context/AppContext";

const Registration = () => {
  const { State, dispatch } = useContext(AppContext);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const registeredUsersData = State.RegisterationData;
  const CNICRef = useRef(null);
  const phoneRef = useRef(null);
  // console.log(registeredUsersData)

  useEffect(() => {
    if (CNICRef.current) {
      const mask = IMask(CNICRef.current, {
        mask: [
          {
            mask: '*****-*******-*',
            definitions: {
              '*': /[A-Za-z0-9@#$%-]/
            },
          },
        ],
        lazy: false,
      });

      mask.on('accept', () => {
        signupFormik.setFieldValue('CNIC', mask.value);
      });
    }

    if (phoneRef?.current) {
      const mask = IMask(phoneRef.current, { mask: "+{92} 000 00000000" });
      mask.on("accept", () => {
        signupFormik?.setFieldValue("phone", mask.value);
      });
    }
  }, []);

  // async function formData(data) {
  //   const frmData = new FormData();
  //   for (const key in data) {
  //     if (key === "img") {
  //       frmData.append("img", data.img);
  //     } else {
  //       frmData.append(key, data[key]);

  //     }
  //   }
  //   console.log(frmData)

  //   try {
  //     const response = await axios?.post("https://httpbin.org/post", frmData,
  //       //   {
  //       //   headers: {
  //       //     "Content-Type": "multipart/form-data",
  //       //   },
  //       // }
  //     );

  //     console.log(response.data);
  //   } catch (err) {
  //     console.error("Form submission error:", err);
  //   }
  // }

  // useEffect(()=>{
  //   formData()
  // })
  const signupFormik = useFormik({
    initialValues: {
      name: "",
      username: "",
      // img: "",
      userType: "",
      email: "",
      CNIC: "",
      password: "",
      confirmPassword: "",
      phone: "",
      DOB: "",
      address: "",
      gender: "",
    },

    validationSchema,
    onSubmit: (values) => {
      console.log(values);

      const isEmailExist = registeredUsersData?.find(
        (obj) => obj?.email === values?.email
      );
      const isUsernameExist = registeredUsersData?.find(
        (obj) => obj.username === values.username
      );

      if (isEmailExist || isUsernameExist) {
        if (isEmailExist) {
          signupFormik?.setFieldError(
            "email",
            "Email already exists. Please use another one."
          );
        }
        if (isUsernameExist) {
          signupFormik?.setFieldError(
            "username",
            "Username is already exists. Please use another one."
          );
        }

        return;
      }

      if (
        (values?.username?.toLowerCase() !== "admin" &&
          values?.userType === "admin") ||
        (values?.userType === "admin" &&
          values?.username?.toLowerCase() !== "admin") ||
        (values?.username?.toLowerCase() === "admin" &&
          values?.userType !== "admin")
      ) {
        signupFormik?.setErrors({
          userType: "Select valid user type",
          username: "Enter valid username",
        });
        return;
      }
      // formData(values)

      dispatch({ type: "userRegistered", RegisterationData: values });
      navigate("/");
      signupFormik?.handleReset();
    },
  });
  const nameErr = signupFormik?.touched?.name && signupFormik?.errors?.name;
  const usernameErr =
    signupFormik?.touched?.username && signupFormik?.errors?.username;
  const emailErr = signupFormik?.touched?.email && signupFormik?.errors?.email;
  const CNICErr = signupFormik?.touched?.CNIC && signupFormik?.errors?.CNIC;
  const userTypeErr =
    signupFormik?.touched?.userType && signupFormik?.errors?.userType;
  const phoneErr = signupFormik?.touched?.phone && signupFormik?.errors?.phone;
  const passwordErr =
    signupFormik?.touched?.password && signupFormik?.errors?.password;
  const confirmPasswordErr =
    signupFormik?.touched?.confirmPassword &&
    signupFormik?.errors?.confirmPassword;
  const addressErr =
    signupFormik?.touched?.address && signupFormik?.errors?.address;
  const DOBErr = signupFormik?.touched?.DOB && signupFormik?.errors?.DOB;


  return (
    <div className="registrationPage">
      <div className="wraper">
        <div className="title">Signup Form</div>
        <form onSubmit={signupFormik?.handleSubmit}>
          <div className="formRow row gap-2">
            <TextField
              className="col"
              label="Name"
              margin="dense"
              variant="outlined"
              {...signupFormik?.getFieldProps("name")}
              error={nameErr}
              helperText={nameErr && signupFormik?.errors?.name}
            />
            {/* <TextField
              className="col"
              margin="dense"
              variant="outlined"
              type="file"
              onChange={(event) => {
                signupFormik.setFieldValue("img", event.target.files[0]);
                console.log(event.target.files[0])
              }}
              error={signupFormik.touched.img && signupFormik.errors.img}
              helperText={signupFormik.touched.img && signupFormik.errors.img}
            /> */}

            <TextField
              className="col"
              label="Username"
              margin="dense"
              variant="outlined"
              {...signupFormik?.getFieldProps("username")}
              error={usernameErr}
              helperText={usernameErr && signupFormik?.errors?.username}
            />
            <FormControl
              className="col"
              margin="dense"
              error={userTypeErr}
              fullWidth
            >
              <InputLabel>User Type</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                helperText={userTypeErr && signupFormik?.errors?.userType}
                id="demo-simple-select"
                {...signupFormik?.getFieldProps("userType")}
                label="User Type"
              >
                <MenuItem value={"user"}>user</MenuItem>
                <MenuItem value={"admin"}>admin</MenuItem>
              </Select>
              <FormHelperText>
                {userTypeErr && signupFormik?.errors?.userType}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="row gap-2">
            <TextField
              className="col"
              label="Email"
              type="email"
              margin="dense"
              variant="outlined"
              {...signupFormik?.getFieldProps("email")}
              error={emailErr}
              helperText={emailErr && signupFormik?.errors?.email}
            />

            <TextField
              name="CNIC"
              inputRef={CNICRef}
              className="col"
              label="CNIC"
              margin="dense"
              variant="outlined"
              placeholder="XXXXX-XXXXXXX-X"
              error={CNICErr}
              helperText={CNICErr && signupFormik.errors.CNIC}
            />
          </div>
          <div className="row gap-2">
            <FormControl
              className="col"
              fullWidth
              variant="outlined"
              margin="dense"
              error={passwordErr}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Password
              </InputLabel>
              <OutlinedInput

                type={showPassword ? "text" : "password"}
                {...signupFormik?.getFieldProps("password")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={passwordErr && { color: "#F44336" }}
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => {
                        setShowPassword((show) => !show);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Password"
              />
              <FormHelperText>
                {passwordErr && signupFormik?.errors?.password}
              </FormHelperText>
            </FormControl>
            <FormControl
              className="col"
              fullWidth
              variant="outlined"
              margin="dense"
              error={confirmPasswordErr}
            >
              <InputLabel htmlFor="outlined-adornment-password">
                Confirm password
              </InputLabel>
              <OutlinedInput
                id="outlined-adornment-password"
                type={showPassword ? "text" : "password"}
                {...signupFormik?.getFieldProps("confirmPassword")}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      sx={confirmPasswordErr && { color: "#F44336" }}
                      aria-label={
                        showPassword
                          ? "hide the password"
                          : "display the password"
                      }
                      onClick={() => {
                        setShowPassword((show) => !show);
                      }}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="Confirm password"
              />
              <FormHelperText>
                {confirmPasswordErr && signupFormik?.errors?.confirmPassword}
              </FormHelperText>
            </FormControl>
          </div>
          <div className="formRow row gap-2">
            <TextField
              name="phone"
              inputRef={phoneRef}
              label="Phone Number"
              margin="dense"
              className="col"
              variant="outlined"
              placeholder="+92 XXX XXXXXXX"
              error={phoneErr}
              helperText={phoneErr && signupFormik.errors.phone}
            />
            <TextField
              className="col"
              label="Date of Birth"
              type="date"
              margin="dense"
              variant="outlined"
              InputLabelProps={{ shrink: true }}
              {...signupFormik?.getFieldProps("DOB")}
              error={DOBErr}
              helperText={DOBErr && signupFormik?.errors?.DOB}
            />
          </div>
          <TextField
            className="col"
            label="Enter Address"
            fullWidth
            type="text"
            margin="dense"
            variant="outlined"
            {...signupFormik?.getFieldProps("address")}
            error={addressErr}
            helperText={addressErr && signupFormik?.errors?.address}
          />
          <FormControl
            component="fieldset"
            margin="dense"
            error={
              signupFormik.touched.gender && Boolean(signupFormik.errors.gender)
            }
          >
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup
              row
              name="gender"
              value={signupFormik?.values?.gender}
              onChange={signupFormik?.handleChange}
            >
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel
                value="female"
                control={<Radio />}
                label="Female"
              />
              <FormControlLabel
                value="other"
                control={<Radio />}
                label="Other"
              />
            </RadioGroup>
            <FormHelperText>
              {signupFormik?.touched?.gender && signupFormik?.errors?.gender}
            </FormHelperText>
          </FormControl>

          <div className="field">
            <input type="submit" value="Signup" />
          </div>
          <div className="signup-link">
            Already have an account <Link to="/">Login now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Registration;
