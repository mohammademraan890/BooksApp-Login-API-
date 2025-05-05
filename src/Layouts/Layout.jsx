import { Outlet } from "react-router-dom";
import MenuNav from "../components/Header/MenuNav";
import TopNav from "../components/Header/TopNav";
import Footer from "../components/FooterSec/Footer";
import FooterBtm from "../components/FooterSec/FooterBtm";
import Quotes from "../components/Quotes";
import ClientSec from "../components/ClientSec";
import { ToastContainer } from "react-toastify";

const Layout = () => {
  return (
    <div>
      <ToastContainer />

      <TopNav />
      <MenuNav />
      <Outlet />
      <Quotes />
      <ClientSec />
      <Footer />
      <FooterBtm />
    </div>
  );
};

export default Layout;
