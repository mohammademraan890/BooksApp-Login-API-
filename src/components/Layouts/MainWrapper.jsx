import { Outlet, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
// import Loader from "../loader/Loader";
// import { useEffect } from "react";

const MainWrapper = () => {
  const navigate = useNavigate();
    function handleStorage(e) {
 
      if (e.key === "LoginData") {
        if (!e.newValue) {
          navigate("/");
          document.title="Login || BookSaw"
        } else {
          document.title="Home || BookSaw"
          navigate("/home");
        }
      }
    }
    window.addEventListener("storage", handleStorage);
  
  
  
  return (
    <>
    <ToastContainer/>
      <Outlet />
    </>
  );
};

export default MainWrapper;
