import { Outlet, useNavigate } from "react-router-dom";
// import Loader from "../loader/Loader";
import { useEffect } from "react";

const MainWrapper = () => {
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

  
  
  return (
    <>
      <Outlet />
    </>
  );
};

export default MainWrapper;
