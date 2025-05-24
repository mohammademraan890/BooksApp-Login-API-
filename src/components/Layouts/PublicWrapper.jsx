import { Navigate, Outlet } from "react-router-dom";

const PublicWrapper = () => {
  const storage = localStorage?.getItem("LoginData");
  if (storage) {
    return <Navigate to={"/home"} />;
  }
// console.log(<Outlet />)
  return (
      <Outlet/>
  );
};

export default PublicWrapper;
