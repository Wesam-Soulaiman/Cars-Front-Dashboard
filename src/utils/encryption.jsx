import CryptoJS from "crypto-js";

const APP_KEY =
  import.meta.env.REACT_APP_ENCRYPTION_KEY || "super-secure-32-byte-key";

export const Encrypt = (text) => {
  try {
    return CryptoJS.AES.encrypt(text, APP_KEY).toString();
  } catch (error) {
    return null;
  }
};

export const Decrypt = (hashedValue) => {
  try {
    const bytes = CryptoJS.AES.decrypt(hashedValue, APP_KEY);
    return bytes.toString(CryptoJS.enc.Utf8);
  } catch (error) {
    return null;
  }
};
