import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  TextField,
} from "@mui/material";
import "../../App.css";
import { useContext, useEffect, useState } from "react";
import { AccountCircle, Visibility, VisibilityOff } from "@mui/icons-material";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../../context/AppContext";
import { LoginUser } from "../../services/APIService";
import { loginSchema } from "../../schema/YUP";
import showToast from "../Includes/showToast";


const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [loader,setLoader]= useState(false)
  const { dispatch } = useContext(AppContext);
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema:loginSchema,
    onSubmit: (values) => {
      (async () => {
        try {
          setLoader(true)
          const response = await LoginUser(values)
          const { user_name, user_email, user_id, data } = response.data || {}
          const { token } = data
          const profileData = { user_name, user_email, user_id, token };
          console.log(token)
          dispatch({ type: "LoginUser", profileData })
          showToast("You LoggedIn Successfully", "var(--primary-color)")
          navigate("/home");
        }
        catch (err) {
          if (err?.status === 401) {
            loginFormik?.setErrors({email: "Email is invalid",password:"Password is invalid."});
            showToast("Wrong Credentials!","var(--error-color)")
          }
          else {
            showToast("Something went wrong! try again later" ,"var(--error-color)")
          }
        }
        finally{
          setLoader(false)
        }
      })()
    },
  });

  const emailError =
    loginFormik?.touched?.email && loginFormik?.errors?.email;
  const passwordError =
    loginFormik?.touched?.password && loginFormik?.errors?.password;

  useEffect(() => {
    document.title = "Login || BookSaw"
  }, [])
  return (
    <div className="loginPage">
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={loginFormik?.handleSubmit}>
          <TextField
            id="input-with-icon-textfield"
            label="email"
            fullWidth
            margin="dense"
            {...loginFormik?.getFieldProps("email")}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    sx={emailError && { color: "#F44336" }}
                    position="end"
                  >
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            helperText={emailError && loginFormik?.errors?.email}
            error={emailError}
          />
          <FormControl
            fullWidth
            variant="outlined"
            error={passwordError}
            margin="dense"
          >
            <InputLabel htmlFor="outlined-adornment-password">
              Password
            </InputLabel>
            <OutlinedInput
              id="outlined-adornment-password"
              type={showPassword ? "text" : "password"}
              {...loginFormik?.getFieldProps("password")}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    sx={passwordError && { color: "#F44336" }}
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
              {passwordError && loginFormik?.errors?.password}
            </FormHelperText>
          </FormControl>

          <div className="field position-relative">
            {loader &&<div className="spinner-border login-loader position-absolute text-light"></div>}<input type="submit" value="Login" />
          </div>

        </form>
      </div>
    </div>
  );
};

export default Login;