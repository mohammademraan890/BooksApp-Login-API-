import { createContext, useEffect, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";
import { toast } from "react-toastify";
import { BooksArr } from "../Data";
import nacl from "tweetnacl";
import {
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8,
} from "tweetnacl-util";
const key = "my_super_secret_key_0987654321!!";
const secretKey = decodeUTF8(key);
function encryptData(plainText) {
  const StringifyPlainText = JSON.stringify(plainText);
  const nonce = nacl.randomBytes(24); // 24-byte random nonce
  const messageUint8 = decodeUTF8(StringifyPlainText);
  const encrypted = nacl.secretbox(messageUint8, nonce, secretKey);
  const encryptedData = {
    nonce: encodeBase64(nonce),
    ciphertext: encodeBase64(encrypted),
  };
  const StringifyEncryptedData = JSON.stringify(encryptedData);
  return StringifyEncryptedData;
}
function decryptData(encryptedData) {
  if (encryptedData) {
    const { nonce, ciphertext } = JSON.parse(encryptedData);
    const nonceBytes = decodeBase64(nonce);
    const encryptedBytes = decodeBase64(ciphertext);
    const decrypted = nacl.secretbox.open(
      encryptedBytes,
      nonceBytes,
      secretKey
    );

    const stringifyDecryptedData = encodeUTF8(decrypted);
    const decryptedData = JSON.parse(stringifyDecryptedData);
    return decryptedData;
  }
}
export const AppContext = createContext(null);
const AppContextProvider = ({ children }) => {

  let cartInitData = secureLocalStorage?.getItem("cartData") || []
  let wishlistInitData = secureLocalStorage?.getItem("wishListData") || []
  let booksInitData = secureLocalStorage?.getItem("BooksArr") || BooksArr
  let initialLogin = decryptData(localStorage?.getItem("LoginData")) || {};
  let initialRegisteredUsers =
    secureLocalStorage?.getItem("registerationData") || [];
  function findTotalPrice(cartData) {
    const priceArr = cartData?.map((item) => item?.totalPrice)
    const totalPrice = cartData?.length && priceArr.reduce((acc, curr) => acc + curr) || 0
    return totalPrice;
  }

  const InitialVal = {
    cartData: cartInitData,
    wishListData: wishlistInitData,
    totalPrice: findTotalPrice(secureLocalStorage?.getItem("cartData")) || 0,
    AllBooks: booksInitData,
    LoginUserData: initialLogin,
    RegisterationData: initialRegisteredUsers,
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
      const id = booksInitData.length + 1;
      booksInitData = [...booksInitData, { ...newProductData, id }]
      secureLocalStorage.setItem("BooksArr", booksInitData)
      return { ...State, AllBooks: booksInitData }
    }
    else if (action?.type === "LoginUser") {
      const encryptedLoginData = encryptData(action?.LoginData);
      localStorage?.setItem("LoginData", encryptedLoginData);

      return {
        ...State,
        LoginUserData: action.LoginData,
      };
    } else if (action.type === "userRegistered") {
      const registerdUsers = action.RegisterationData;
      const RegisteredUsersData = [...State.RegisterationData, registerdUsers];
      secureLocalStorage.setItem("registerationData", RegisteredUsersData);
      return { ...State, RegisterationData: RegisteredUsersData };
    } else if (action.type === "Logout") {
      localStorage.removeItem("LoginData");
      return {
        ...State,
        LoginUserData: {},
      };
    } else if (action.type === "UpdateOtherTabs") {
      return {
        ...State,
        LoginUserData: action?.updatedLoginData,
      };
    }
  }
  // useEffect(() => {
  //   console.log(secureLocalStorage.getItem("cartData"))

  //   console.log(State)
  // })
  useEffect(() => {
    const handleStorageChange = (event) => {
      if (event?.key === "LoginData" && event?.newValue) {
        const updatedLoginData = decryptData(event?.newValue);
        dispatch({ type: "UpdateOtherTabs", updatedLoginData });
      }
      // console.log(event);
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);
  const contextValues = {
    State,
    dispatch,
  };
  // useEffect(()=>{
  //   console.log(State.AllBooks)
  // },[State])
  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export default AppContextProvider;
