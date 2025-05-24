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
import { Link, useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { AuthContext } from "../../context/Auth";
import * as Yup from "yup";

const validationSchema = Yup.object({
  username: Yup.string().required("Enter username."),
  password: Yup.string().matches(/^.{9}$/, "Password must be exactly 9 characters").required("Password is required.")
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch, State } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const loginFormik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { username, password } = values;
      // const signupData = secureLocalStorage?.getItem("registerationData");
      const signupData = State?.RegisterationData;

      const LoginData = signupData?.find(
        (obj) => obj?.username?.toLowerCase() === username?.toLowerCase()
      );
      if (LoginData.password !== password) {
        loginFormik?.setFieldError("password", "Password is incorrect");
        return
      }
      if (LoginData) {
        const LoginDataIndex = signupData?.findIndex((item) => item?.username?.toLowerCase() === username?.toLowerCase())
        const LoginDataWithIndex = { ...LoginData, LoginDataIndex }

        dispatch({ type: "LoginUser", LoginData: LoginDataWithIndex })
        loginFormik.handleReset();
        navigate("/home", { state: { showWelcomeToast: true } });
      } else {
        loginFormik?.setFieldError("username", "Username is invalid");
        loginFormik?.setFieldError("password", "Password is invalid");
      }
    },
  });

  const usernameError =
    loginFormik?.touched?.username && loginFormik?.errors?.username;
  const passwordError =
    loginFormik?.touched?.password && loginFormik?.errors?.password;
  useEffect(() => {

    if (location?.state?.showToast) {
      toast.error("You LoggedOut Successfully.", {
        position: "top-right",
      });
    }
    window.history.replaceState({}, "");
  }, [location?.state])
  useEffect(() => {
    document.title = "Login || BookSaw"
  }, [])
  return (
    <div className="loginPage">
      <ToastContainer />
      <div className="wrapper">
        <div className="title">Login Form</div>
        <form onSubmit={loginFormik?.handleSubmit}>
          <TextField
            id="input-with-icon-textfield"
            label="Username"
            fullWidth
            margin="dense"
            {...loginFormik?.getFieldProps("username")}
            slotProps={{
              input: {
                endAdornment: (
                  <InputAdornment
                    sx={usernameError && { color: "#F44336" }}
                    position="end"
                  >
                    <AccountCircle />
                  </InputAdornment>
                ),
              },
            }}
            variant="outlined"
            helperText={usernameError && loginFormik?.errors?.username}
            error={usernameError}
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

          <div className="field">
            <input type="submit" value="Login" />
          </div>
          <div className="signup-link">
            Not a member? <Link to="/signup">Signup now</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
