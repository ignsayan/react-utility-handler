import CryptoJS from "crypto-js";

const useEncrypt = (data) => {

    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    const string = typeof data !== 'object' ? data : JSON.stringify(data);

    return CryptoJS.AES
        .encrypt(string, key)
        .toString();
}

const useDecrypt = (data) => {

    const key = import.meta.env.VITE_ENCRYPTION_KEY;

    return CryptoJS.AES
        .decrypt(data, key)
        .toString(CryptoJS.enc.Utf8);
}

export default useEncrypt
export { useDecrypt }