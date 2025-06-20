import Logo from "../Includes/Logo";
import cartImg from "../../assets/basket.png";
import { Link, useLocation } from "react-router-dom";
import React from "react";

const MenuNav = () => {
  const location = useLocation();


  return (
    <div>
      <section className="bttom-navbar">
        <div className="bootom-navbar-inner d-flex justify-content-between align-items-center  px-md-5 px-sm-3 px-3">
          <Logo />
          <ul className="bottom-nav-links d-lg-flex d-md-none d-sm-none m-0 d-none">
            <li className={location.pathname === "/home" ? "active" : ""}>
              <Link to="/home">Home</Link>
            </li>
            <li className="dropdown-center">
              <Link
                className=" dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                pages
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" to="/reactSelect">React Select</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/BooksAPI">API Books Loader</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/BooksAPIPagination">API Books Pagination</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/apipractice">API Practice</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/BooksAPIPagination2">Books API Pagination with filter.</Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/useActionState">use Action State Hook</Link>
                </li>
              </ul>
            </li>

            <li className={location.pathname === "/Feature" ? "active" : ""}>
              <Link to="/Feature">Featured</Link>
            </li>
            <li className={location.pathname === "/Gallery" ? "active" : ""}>
              <Link to="/Gallery">Popular</Link>
            </li>
            <li className={location.pathname === "/Offers" ? "active" : ""}>
              <Link to="/Offers">Offer</Link>
            </li>
            <li className={location.pathname === "/Articles" ? "active" : ""}>
              <Link to="/Articles">Articles</Link>
            </li>
            <li className={location.pathname === "/DownloadApp" ? "active" : ""}>
              <Link to="/DownloadApp">Download App</Link>
            </li>
          </ul>
          <div className=" align-items-center d-lg-none d-md-flex d-sm-flex  d-flex">
            <div className="bottom-search d-flex align-items-center justify-content-between me-sm-3 me-2">
              <li id="cart" className="me-4">
              
                  <img src={cartImg} alt="" />
                <span className="cartItemsNumber">4</span>
              </li>

              <li id="btm-search">
                <Link to="#">
                  <i className="bx bx-search bx-flip-horizontal"></i>
                </Link>
              </li>
            </div>
            <li className="d-block" id="menu-btn">
              <i className="bx bx-menu"></i>
            </li>
          </div>
        </div>
      </section>
    </div>
  );
};

export default React.memo(MenuNav);