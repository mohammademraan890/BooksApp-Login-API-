import React, { useContext, useEffect } from "react";
import { StoreContext } from "../../context/StoreContext";
import Heading1 from "../Includes/Heading1";
import { toast } from "react-toastify";
import { DeleteOutline, ShoppingCartOutlined } from "@mui/icons-material";
import { Button, Tooltip } from "@mui/material";

const WishList = () => {
  const { State, dispatch } = useContext(StoreContext);
  useEffect(()=>{
    document.title="Your WishList || BookSaw"
  },[])
  return (
    <>
      {State?.wishListData?.length > 0 ? (
        <div className="wishListData obj-width1">
          <Heading1
            desc="Your Favourite Books are here."
            title="Your Wishlist"
          />
          <table className="table table-hover container">
            <thead>
              <tr>
                <th scope="col">Sr#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {State?.wishListData?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="wishListImg">
                      <img src={item?.img} alt="" />
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.price} $</td>

                    <td>
                      <div className="d-flex gap-2 align-item-center justify-content-center">
                        <Tooltip
                          arrow
                          title="Add to Cart"
                          placement="bottom-start"
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              dispatch({
                                type: "addToCart",
                                cartData: {
                                  id: item?.id,
                                  title: item?.title,
                                  price: item?.price,
                                  totalPrice: item?.price,
                                  img: item?.img,
                                  quantity: 1,
                                },
                              });
                              State?.cartData?.some(
                                (product) => product?.id === item?.id
                              )
                                ? toast(
                                    "Book already added to Cart Quantity Increased",
                                    {
                                      hideProgressBar: true,
                                      autoClose: 1500,
                                      closeOnClick: true,
                                      draggable: true,
                                      style: {
                                        backgroundColor: "var(--primary-color)",
                                        color: "white",
                                        fontWeight: "bold",
                                      },
                                    }
                                  )
                                : toast("Book added to Cart", {
                                    hideProgressBar: true,
                                    autoClose: 1500,
                                    closeOnClick: true,
                                    draggable: true,
                                    style: {
                                      backgroundColor: "var(--primary-color)",
                                      color: "white",
                                      fontWeight: "bold",
                                    },
                                  });
                            }}
                            sx={{
                              color: "var(--primary-color)",
                              borderColor: "var(--primary-color)",
                            }}
                          >
                            <ShoppingCartOutlined />
                          </Button>
                        </Tooltip>
                        <Tooltip
                          arrow
                          title="Remove fron WishList."
                          placement="bottom-start"
                        >
                          <Button
                            variant="outlined"
                            onClick={() => {
                              dispatch({
                                type: "manageWishList",
                                wishListData: {
                                  isChecked:false,
                                  id: item.id,
                                }
                              });
                              toast("Item Removed from wishlist", {
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
                            sx={{
                              color: "red",
                              borderColor: "red",
                            }}
                          >
                            <DeleteOutline />
                          </Button>
                        </Tooltip>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        <div
          style={{ height: "300px", backgroundColor: "var(--Secondary-color)" }}
          className="d-flex align-items-center justify-content-center mt-4"
        >
          <h1>Your WishList is Empty.</h1>
        </div>
      )}
    </>
  );
};

export default React.memo(WishList);
