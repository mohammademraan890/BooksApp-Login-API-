import { Navigate, Outlet, useLocation } from "react-router-dom";
import MenuNav from "../Header/MenuNav";
import TopNav from "../Header/TopNav";
import Footer from "../FooterSec/Footer";
import FooterBtm from "../FooterSec/FooterBtm";
import Quotes from "../Quotes";
import ClientSec from "../ClientSec";
import { ToastContainer } from "react-toastify";
import ArticlesSec from "../pages/ArticlesSec";

const Layout = () => {
  const location = useLocation()
  const AppData = localStorage?.getItem("LoginData");
  // console.log(cardId.id)
  if (!AppData) {
    return <Navigate to="/" />;
  }

 if(location.pathname=== "/Login" || location.pathname === "/signup" ){
  return <Outlet/>
 }
  return (
    <div>
      
      <ToastContainer />
      <TopNav />
      <MenuNav />
      <Outlet />
      {location.pathname !== "/reactSelect" && <Quotes />}
      {location.pathname === "/reactSelect" && <ArticlesSec />}
      <ClientSec />
      <Footer />
      <FooterBtm />
    </div>
  );
};

export default Layout;
