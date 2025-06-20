import { createContext, useReducer } from "react";
import nacl from "tweetnacl";
import {
  decodeBase64,
  decodeUTF8,
  encodeBase64,
  encodeUTF8,
} from "tweetnacl-util";
import showToast from "../components/Includes/showToast";
const key = "my_super_secret_key_0987654321!!";
const secretKey = decodeUTF8(key);
function encryptData(plainText) {
  const stringified = JSON.stringify(plainText);
  const messageUint8 = decodeUTF8(stringified);
  const nonce = nacl.randomBytes(24); // 24-byte nonce required
  const box = nacl.secretbox(messageUint8, nonce, secretKey);
  return JSON.stringify({
    nonce: encodeBase64(nonce),
    ciphertext: encodeBase64(box),
  });
}
function decryptData(encryptedData) {
  if (!encryptedData) return null;

  try {
    const { nonce, ciphertext } = JSON.parse(encryptedData);
    const nonceBytes = decodeBase64(nonce);
    const boxBytes = decodeBase64(ciphertext);
    const decrypted = nacl.secretbox.open(boxBytes, nonceBytes, secretKey);
    if (!decrypted) return null;

    return JSON.parse(encodeUTF8(decrypted));
  } catch (err) {
    console.error("Decryption error:", err);
    return null;
  }
}

export const AppContext = createContext(null);
const AppContextProvider = ({ children }) => {


  let initialLogin = decryptData(localStorage?.getItem("LoginData")) || null;
  const token=initialLogin?.token || null

  console.log(initialLogin)
  const InitialVal = {
    LoginUserData: initialLogin,
    token,
    };

  const [State, dispatch] = useReducer(handleStore, InitialVal);
  function handleStore(State, action) {
    if (action?.type === "LoginUser") {
      const profileData = action?.profileData
      const encryptedProfileData = encryptData(profileData);
      localStorage?.setItem("LoginData", encryptedProfileData);

      return {
        ...State,
        LoginUserData: profileData,
      };

    } else if (action.type === "Logout") {
      localStorage.removeItem("LoginData");
      showToast("You Logged Out.","var(--error-color)")
      return {
        ...State,
        LoginUserData: null,
      };
    }
  }

  const contextValues = {
    State,
    dispatch,
  };

  return (
    <div>
      <AppContext.Provider value={contextValues}>
        {children}
      </AppContext.Provider>
    </div>
  );
};

export default AppContextProvider;