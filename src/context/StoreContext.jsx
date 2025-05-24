import { createContext, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { BooksArr } from "../Data";

export const StoreContext = createContext(null);
const StoreContextProvider = ({ children }) => {

  let cartInitData = secureLocalStorage?.getItem("cartData") || []
  let wishlistInitData = secureLocalStorage?.getItem("wishListData") || []
  let booksInitData = secureLocalStorage?.getItem("BooksArr") || BooksArr
  function findTotalPrice(cartData) {
    const priceArr =  cartData?.map((item) => item?.totalPrice) 
    // const totalPrice =
    //   (cartData?.length > 0 && cartData?.reduce((acc, curr) => {  return acc.totalPrice  + curr.totalPrice ,0}))
    const totalPrice = cartData?.length && priceArr.reduce((acc,curr)=> acc + curr) || 0
    return totalPrice;
  }

  const InitialVal = {
    cartData: cartInitData,
    wishListData: wishlistInitData,
    totalPrice: findTotalPrice(secureLocalStorage?.getItem("cartData")) || 0,
    AllBooks: booksInitData,
  };

  const [State, dispatch] = useReducer(handleStore, InitialVal);
  function handleStore(State, action) {
    if (action.type === "addToCart") {
      const cartAddedData = action?.cartData;
      const productIndex = cartInitData?.findIndex(
        (item) => item?.title === cartAddedData?.title
      );
      if (productIndex === -1) {
        cartInitData = [...cartInitData, cartAddedData]

        secureLocalStorage.setItem("cartData", cartInitData)
        // const updatedState={...State,cartData:[...cartInitData]}
        const totalPrice = findTotalPrice(cartInitData)
        return { ...State, cartData: cartInitData, totalPrice }
      } else {
        const existingItem = cartInitData[productIndex];
        cartInitData[productIndex] = {
          ...existingItem,
          quantity: existingItem.quantity + 1,
          totalPrice: existingItem.totalPrice + existingItem.price,
        };
        const totalPrice = findTotalPrice(cartInitData);
        secureLocalStorage.setItem("cartData", cartInitData);
        return { ...State, cartData: cartInitData, totalPrice };
      }
    }
    else if (action?.type === "removeFromCart") {
      const targetProductTitle = action?.productTitle;
      cartInitData = cartInitData.filter(
        (item) => item?.title !== targetProductTitle
      );
      const totalPrice = findTotalPrice(cartInitData);

      secureLocalStorage?.setItem("cartData", cartInitData);
      return { ...State, cartData: cartInitData, totalPrice };
    } else if (action?.type === "decreaseQuantity") {
      const existingItemIndex = cartInitData?.findIndex(
        (item) => item?.title === action?.productTitle
      );

      const existingItem = cartInitData[existingItemIndex];
      if (existingItem?.quantity === 1) {
        cartInitData = cartInitData?.filter(
          (item) => item.title !== action?.productTitle
        );
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
      } else {
        cartInitData[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem?.quantity - 1,
          totalPrice: existingItem?.totalPrice - existingItem?.price,
        };
      }
      const totalPrice = findTotalPrice(cartInitData);

      secureLocalStorage?.setItem("cartData", cartInitData);
      return { ...State, cartData: cartInitData, totalPrice };
    } else if (action?.type === "resetCart") {
      const totalPrice = findTotalPrice([])
      cartInitData = []
      secureLocalStorage.setItem("cartData", cartInitData);
      return { ...State, cartData: cartInitData, totalPrice };
    } else if (action?.type === "manageWishList") {
      const wishListProductData = action.wishListData;
      if (wishListProductData?.isChecked) {
        const wishListObj = {
          id: wishListProductData.id,
          title: wishListProductData.title,
          img: wishListProductData.img,
          price: wishListProductData.price,
        };
        // const wishListProducts = [...State.wishListData, wishListObj];
        wishlistInitData = [...wishlistInitData, wishListObj]
      } else {
        const ObjId = wishListProductData.id;
        wishlistInitData = wishlistInitData.filter(
          (item) => item.id !== ObjId
        );
      }
      secureLocalStorage?.setItem("wishListData", wishlistInitData);
      return { ...State, wishListData: wishlistInitData };
    }
    else if (action?.type === "addProducts") {
      const newProductData = action.newProduct
      const id= booksInitData.length + 1;
      booksInitData = [...booksInitData, {...newProductData,id}]
      secureLocalStorage.setItem("BooksArr", booksInitData)
      return { ...State, AllBooks: booksInitData }
    }
  }
  // useEffect(() => {
  //   console.log(secureLocalStorage.getItem("cartData"))

  //   console.log(State)
  // })
  const contextValues = {
    State,
    dispatch,
  };
  // useEffect(()=>{
  //   console.log(State.AllBooks)
  // },[State])
  return (
    <div>
      <StoreContext.Provider value={contextValues}>
        {children}
      </StoreContext.Provider>
    </div>
  );
};

export default StoreContextProvider;
