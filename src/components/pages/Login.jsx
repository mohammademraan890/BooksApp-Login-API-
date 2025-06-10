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
// import { AuthContext } from "../../context/Auth";
import * as Yup from "yup";
import { AppContext } from "../../context/AppContext";
import axios from "axios";

const validationSchema = Yup.object({
  username: Yup.string().required("Enter username."),
  password: Yup.string().matches(/^.{9}$/, "Password must be exactly 9 characters").required("Password is required.")
})

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { dispatch, State } = useContext(AppContext);
  const location = useLocation();
  const navigate = useNavigate();
  const APIURL=import.meta.env.VITE_BOOKS_API_URL;
  async function token() {
    try {
      const token = "QpwL5tke4Pnpja7X4";

      const response = await axios.get(`${APIURL}/users?page=2`, {
        headers: {
          'x-api-key': 'reqres-free-v1',
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        }
      });
      console.log(response.data);
    }
    catch (err) {
      console.log(err);
    }


  }
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
      console.log(LoginData)


      if (LoginData) {
        if (LoginData?.password === password) {
          const LoginDataIndex = signupData?.findIndex((item) => item?.username?.toLowerCase() === username?.toLowerCase())
          const LoginDataWithIndex = { ...LoginData, LoginDataIndex }

          dispatch({ type: "LoginUser", LoginData: LoginDataWithIndex })
          token()
          loginFormik.handleReset();
          navigate("/home", { state: { showWelcomeToast: true } });
        }
        else {
          loginFormik?.setFieldError("password", "Password is incorrect");
          return
        }

      } else {
        loginFormik?.setFieldError("username", "Username is invalid");
        loginFormik?.setFieldError("password", "Password is invalid");
        console.log("runnings")
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
