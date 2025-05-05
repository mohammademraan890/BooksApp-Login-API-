import { createContext, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const InitialVal = {
    cartData: secureLocalStorage?.getItem("cartData") || [],
    wishListData: secureLocalStorage?.getItem("wishListData") || [],
    totalPrice: findTotalPrice(secureLocalStorage?.getItem("cartData"))
  };

  // console.log(InitialVal);
  const [State, dispatch] = useReducer(handleCart, InitialVal);
  function findTotalPrice(cartData) {
    const priceArr = cartData?.map((item) => item?.totalPrice);
    const totalPrice =
      (cartData?.length > 0 && priceArr?.reduce((acc, curr) => acc + curr)) ||
      0;
    return totalPrice;
  }
  function handleCart(State, action) {
    if (action.type === "addToCart") {
      const cartAddedData = action?.cartData;
      const existingItemIndex = State?.cartData?.findIndex(
        (item) => item?.id === cartAddedData?.id
      );
      if (existingItemIndex === -1) {
        const newCartData = [...State.cartData, cartAddedData];
        secureLocalStorage.setItem("cartData", newCartData);
        const totalPrice = findTotalPrice(newCartData);

        return { ...State, cartData: newCartData, totalPrice };
      } else {
        const updatedCartData = [...State.cartData];
        const existingItem = updatedCartData[existingItemIndex];
        updatedCartData[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem?.quantity + 1,
          totalPrice: existingItem?.totalPrice + existingItem?.price,
        };
        secureLocalStorage.setItem("cartData", updatedCartData);
        const totalPrice = findTotalPrice(updatedCartData);
        return { ...State, cartData: updatedCartData, totalPrice };
      }
    } else if (action?.type === "removeFromCart") {
      const targetProductId = action?.productId;
      const newState = State?.cartData?.filter(
        (item) => item?.id !== targetProductId
      );
      const totalPrice = findTotalPrice(newState);

      secureLocalStorage?.setItem("cartData", newState);
      return { ...State, cartData: newState, totalPrice };
    } else if (action?.type === "decreaseQuantity") {
      const updatedCartData = [...State.cartData];
      const existingItemIndex = updatedCartData?.findIndex(
        (item) => item?.id === action?.productId
      );

      const existingItem = updatedCartData[existingItemIndex];
      if (existingItem?.quantity <= 1) {
        const newCartData = updatedCartData?.filter(
          (item) => item.id !== action?.productId
        );
        const totalPrice = findTotalPrice(newCartData);

        secureLocalStorage?.setItem("cartData", newCartData);
        return { ...State, cartData: newCartData, totalPrice };
      } else {
        updatedCartData[existingItemIndex] = {
          ...existingItem,
          quantity: existingItem?.quantity - 1,
          totalPrice: existingItem?.totalPrice - existingItem?.price,
        };
        const totalPrice= findTotalPrice(updatedCartData)
        secureLocalStorage.setItem("cartData", updatedCartData);
        return { ...State, cartData: updatedCartData , totalPrice};
      }
    } else if (action?.type === "resetCart") {
      const totalPrice= findTotalPrice([])
      secureLocalStorage.setItem("cartData", []);
      return { ...State, cartData: [] , totalPrice};
    } else if (action?.type === "manageWishList") {
      const wishListProductData = action.wishListData;
      if (wishListProductData?.isChecked) {
        const wishListObj = {
          id: wishListProductData.id,
          title: wishListProductData.title,
          img: wishListProductData.img,
          price: wishListProductData.price,
        };
        const wishListProducts = [...State.wishListData, wishListObj];
        secureLocalStorage?.setItem("wishListData", wishListProducts);
        return { ...State, wishListData: wishListProducts };
      } else {
        const ObjId = wishListProductData.id;
        const newWishlistArr = State?.wishListData.filter(
          (item) => item.id !== ObjId
        );
        secureLocalStorage.setItem("wishListData", newWishlistArr);
        return { ...State, wishListData: newWishlistArr };
      }
    }
  }
  const contextValues = {
    State,
    dispatch,
  };
  return (
    <div>
      <StoreContext.Provider value={contextValues}>
        {children}
      </StoreContext.Provider>
    </div>
  );
};

export default StoreContextProvider;
