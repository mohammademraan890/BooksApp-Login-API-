import React, { useContext } from "react";
import { StoreContext } from "../../context/StoreContext";
import { Checkbox, Tooltip } from "@mui/material";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { toast } from "react-toastify";
import ImageLoader from "./ImageLoader";
const ProductCard = ({
  id,
  title,
  author,
  price,
  img,
  link="",
  prevPrice = "",
  showDiscout = false,
}) => {
  const { dispatch, State } = useContext(StoreContext);
  const activeProduct = State?.cartData.find((item) => item?.title === title);
  const isAddedWishList=State?.wishListData?.some((product)=> product?.title === title);
  return (
    <div className="feature col-md-3 col-sm-6 col-6">
      <div className="feature-img feature-img-hover text-center">
        <div className="offer-img">

          <div className="imageborder">
          {/* <img className="img-fluid" loading="lazy"  src={img} alt="image" /> */}
          <ImageLoader src={img} link={link}/>
          </div>
          <Tooltip arrow title={isAddedWishList ? "Remove from WishList" : "Add to Wishlist"} placement="right-start">
            <Checkbox
              className="wishListIcon"
              icon={<FavoriteBorder />}
              checkedIcon={<Favorite />}
              checked={isAddedWishList}
              onChange={(e) =>
              {
                dispatch({
                  type: "manageWishList",
                  wishListData: {
                    isChecked: e.target.checked,
                    id,
                    title,
                    price,
                    img,
                  },
                })
                //  <Toast text="Item added to wishlist." bgColor="var(--primary-color)" />
                //   :
                //   <Toast text="Item removed from wishlist." bgColor="#cd0c0c" />
                e.target.checked? toast("Item added to wishlist.", {
                  hideProgressBar: true,
                  autoClose: 1500,
                  closeOnClick: true,
                  draggable: true,
                  style: {
                    backgroundColor: "var(--primary-color)",
                    color: "white",
                    fontWeight: "bold",
                  },
                })
                :
                toast("Item removed from wishlist.", {
                  hideProgressBar: true,
                  autoClose: 1500,
                  closeOnClick: true,
                  draggable: true,
                  style: {
                    backgroundColor: "#cd0c0c",
                    color: "white",
                    fontWeight: "bold",
                  },
                });
              }}
            />
          </Tooltip>

          <div className={`offer-hover ${activeProduct && "active"}`}>
            <button
              className={`m-0 w-100 h-100`}
              onClick={() =>{
                dispatch(
               {
                  type: "addToCart",
                  cartData: {
                    id,
                    title,
                    price,
                    totalPrice: price,
                    img,
                    quantity: 1,
                  },
                }
               
              )
          //  activeProduct.quantity < 2 &&   toast("Book is added to cart.", {
          //         hideProgressBar: true,
          //         autoClose: 1500,
          //         closeOnClick: true,
          //         draggable: true,
          //         style: {
          //           backgroundColor: "var(--primary-color)",
          //           color: "white",
          //           fontWeight: "bold",
          //         },
          //       });
              }}
            >
              {`${
                activeProduct
                  ? "Increase Quantity" + ` (${activeProduct.quantity})`
                  : "Add to cart"
              }`}
            </button>
          </div>
        </div>
        <div className="feature-cont mt-lg-4 mt-md-3 mt-sm-2 mt-1 mb-sm-4 mb-4">
          <a href="#" className="feature-head">
            {title}
          </a>
          <p>{author}</p>
          <span className="d-flex justify-content-center align-items-baseline">
            {showDiscout && <p className="offer-price">${prevPrice}.00 </p>}$
            {price}.00
          </span>
        </div>
      </div>
    </div>
  );
};

export default React.memo(ProductCard);
