import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AppContext } from "../../context/AppContext";

const PublicWrapper = () => {
  const {State}= useContext(AppContext)
  const LoginData = State?.LoginUserData
  if (LoginData) {
    return <Navigate to={"/home"} />
  }
  else {
    return (
      <Outlet />
    );
  }
};

export default PublicWrapper;
