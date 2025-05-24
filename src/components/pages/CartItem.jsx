import DeleteIcon from "@mui/icons-material/Delete";
import remove_icon_red from "../../assets/remove_icon_red.png";
import add_icon_green from "../../assets/add_icon_green.png";
import Button from "@mui/material/Button";
import React, { useContext, useEffect, useState } from "react";
import { StoreContext } from "../../context/StoreContext";
import { toast } from "react-toastify";
import Heading1 from "../Includes/Heading1";
// import Toaster from "../Includes/Toast";
// import { useContext } from "react";

const CartItem = () => {
  const { State, dispatch } = useContext(StoreContext);
  const [cartFliteredProducts, setCartFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  useEffect(() => {
    document.title = "Your Cart || BookSaw";
  }, []);

  useEffect(() => {
    if (search) {
      const searchTimer = setTimeout(() => {
        const filteredArr = State?.cartData?.filter(
          (item) =>
            item?.title?.toLowerCase()?.includes(search?.toLowerCase()) ||
            item?.price?.toString()?.includes(search) ||
            item?.totalPrice?.toString()?.includes(search)
        );

        setCartFilteredProducts(filteredArr);
      }, 500);
      console.log("Search happen")

      return () => {
        clearTimeout(searchTimer);
      };
    } else {
      setCartFilteredProducts(State?.cartData);
    }
  }, [search, State]);
  return (
    <>
      {!State?.cartData?.length ? (
        <div
          style={{ height: "300px", backgroundColor: "var(--Secondary-color)" }}
          className="d-flex align-items-center justify-content-center mt-4"
        >
          <h1>Your Cart is Empty.</h1>
        </div>
      ) : (
        <div className="cart-item obj-width1">
          <Heading1 desc="Your cart Books are here." title={"Your Cart"} />
          <input
            className="form-control w-25 mb-3"
            placeholder="Search the Product here"
            onChange={(e) => setSearch(e.target.value)}
            type="text"
          />
          <table className="table table-hover">
            <thead>
              <tr>
                <th scope="col">Sr#</th>
                <th scope="col">Image</th>
                <th scope="col">Title</th>
                <th scope="col">Price</th>
                <th scope="col">Quantity</th>
                <th scope="col">Total Price</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              {cartFliteredProducts?.map((item, index) => {
                return (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td className="cartImg">
                      <img src={item?.img} alt="" />
                    </td>
                    <td>{item?.title}</td>
                    <td>{item?.price} $</td>
                    <td>
                      <div className="food-item-counter">
                        <img
                          className="food-item-counter-img"
                          loading="lazy"
                          onClick={() =>
                            dispatch({
                              type: "decreaseQuantity",
                              productTitle: item?.title,
                            })
                          }
                          src={remove_icon_red}
                          alt=""
                        />
                        <span className="Quantity">{item?.quantity}</span>
                        <img
                          className="food-item-counter-img"
                          onClick={() =>
                            dispatch({
                              type: "addToCart",
                              cartData: item,
                            })
                          }
                          src={add_icon_green}
                          alt=""
                        />
                      </div>
                    </td>
                    <td>{item?.totalPrice} $</td>
                    <td>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          dispatch({
                            type: "removeFromCart",
                            productTitle: item?.title,
                          });
                          toast("Item Deleted from Cart", {
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
                          color: "var(--primary-color)",
                          borderColor: "var(--primary-color)",
                        }}
                      >
                        <DeleteIcon />
                      </Button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className="d-flex align-items-center justify-content-between mt-4">
            <h3>
              Total Price:{" "}
              <span className="totalPrice">{State.totalPrice} $</span>
            </h3>
            <div className="d-flex gap-2">
              <button
                onClick={() => {
                  dispatch({ type: "resetCart" });
                }}
                className="btn btn-outline-danger"
              >
                Reset Cart
              </button>
              <button className="btn btn-success">Buy Now</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default React.memo(CartItem);
