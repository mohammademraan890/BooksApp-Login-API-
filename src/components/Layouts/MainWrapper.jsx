import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
// import Loader from "../loader/Loader";
import { useContext, useEffect } from "react";
import { AuthContext } from "../../context/Auth";

const MainWrapper = () => {
  const {State} = useContext(AuthContext)
  const location = useLocation();
  const navigate = useNavigate();
    
  useEffect(() => {
    function handleStorage(e) {
    

      if (e.key === "LoginData") {
        if (!e.newValue) {
          navigate("/");
          document.title="Login || BookSaw"
          console.log("re-render happen")
        } else if (e.newValue) {
          document.title="Home || BookSaw"
          navigate("/home");
        }
      }
    }
    window.addEventListener("storage", handleStorage);
   
  }, []);

  if (location.pathname === "/registered-users") {
    if (State?.LoginUserData?.username?.toLowerCase() !== "admin") {
      return <Navigate to={"/home"} />;
    }
  }
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainWrapper;
