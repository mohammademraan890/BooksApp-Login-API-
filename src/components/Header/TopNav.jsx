import SocialLinks from "../Includes/SocialLinks";
import cartImg from "../../assets/basket.png";
import { Link } from "react-router-dom";
import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { IconButton, styled } from "@mui/material";
import Badge, { badgeClasses } from "@mui/material/Badge";
import { FavoriteBorderOutlined } from "@mui/icons-material";

const CartBadge = styled(Badge)`
  & .${badgeClasses.badge} {
    top: -12px;
    right: -6px;
  }
`;
const TopNav = () => {
  const { State } = useContext(StoreContext);

  return (
    <section className="topNavbar">
      <div className="topNav-inner w-100 d-flex justify-content-between align-items-center flex-wrap px-md-5 px-sm-3 px-3">
        <SocialLinks />
        <ul className="login-links d-flex align-items-center m-0">
          <li>
            <a href="#">
              <i className="bx bx-user"></i>Account
            </a>
          </li>
          <li>
            <a href="#">
              <i className="bx bx-clipboard"></i>Cart:(<b>{State?.totalPrice} $</b>)
            </a>
          </li>
          <div className="top-search d-lg-flex align-items-center justify-content-between d-md-none d-none">
            <li id="wishList">
              <Link to="/wishList">
                <IconButton>
                  <FavoriteBorderOutlined
                    sx={{ color: "var(--secondary-color)" }}
                  />
                  <CartBadge
                    badgeContent={State?.wishListData?.length || 0}
                    showZero
                    overlap="circular"
                    sx={{
                      "& .MuiBadge-badge": {
                        borderRadius: "4px",
                        fontSize: "10px",
                        minWidth: "16px",
                        height: "16px",
                        backgroundColor: "var(--primary-color)",
                        color: "white",
                      },
                    }}
                  />
                </IconButton>
              </Link>
            </li>
            <li id="cart">
              <Link to="/Cart">
                <img src={cartImg} alt="" />
              </Link>
              <span className="cartItemsNumber">{State?.cartData?.length}</span>
            </li>
            <li id="search" className="ms-4">
              <a href="#">
                <i className="bx bx-search bx-flip-horizontal"></i>
              </a>
            </li>

            {/* <input id="topNav-inp" type="text" placeholder="Search here..."/> */}
          </div>
        </ul>
      </div>
    </section>
  );
};

export default React.memo(TopNav);
