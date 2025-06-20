import { Navigate, Outlet, useLocation } from "react-router-dom";
import MenuNav from "../Header/MenuNav";
import TopNav from "../Header/TopNav";
import Footer from "../FooterSec/Footer";
import FooterBtm from "../FooterSec/FooterBtm";
import Quotes from "../Quotes";
import ClientSec from "../ClientSec";
import ArticlesSec from "../pages/ArticlesSec";
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";
// import { useEffect, useLayoutEffect } from "react";

const Layout = () => {
  const location = useLocation()
  const {State}= useContext(AppContext)
  const LoginData = State?.LoginUserData
  if (!LoginData) {
    return <Navigate to={"/"} />
  }
  else {
    return (
      <div>
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
  }
};

export default Layout;
