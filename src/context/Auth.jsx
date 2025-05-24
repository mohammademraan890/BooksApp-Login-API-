import { createContext, useEffect, useReducer } from "react";
import secureLocalStorage from "react-secure-storage";
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
    // if (!decrypted) {
    //   throw new Error(
    //     "Decryption failed. Possibly wrong key or data corrupted."
    //   );
    // }
    const stringifyDecryptedData = encodeUTF8(decrypted);
    const decryptedData = JSON.parse(stringifyDecryptedData);
    return decryptedData;
  }
}

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
 
  let initialLogin =  decryptData(localStorage?.getItem("LoginData")) || {};
  const initialRegisteredUsers =
    secureLocalStorage?.getItem("registerationData") || [];
  const initialVal = {
    LoginUserData: initialLogin,
    RegisterationData: initialRegisteredUsers,
  };
  const handleAuth = (State, action) => {
    if (action?.type === "LoginUser") {
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
    }  else if (action.type === "UpdateOtherTabs") {
      return {
        ...State,
        LoginUserData: action?.updatedLoginData,
      };
    }
  };
  
  const [State, dispatch] = useReducer(handleAuth, initialVal);
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
  // useEffect(()=>{
  //   console.log(State)
  // },[State])
  const AuthValues = {
    State,
    dispatch,
  };
  return (
    <AuthContext.Provider value={AuthValues}>{children}</AuthContext.Provider>
  );
};
