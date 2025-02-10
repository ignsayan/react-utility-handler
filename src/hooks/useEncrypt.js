import CryptoJS from "crypto-js";

const useEncrypt = (data) => {

    const key = import.meta.env.VITE_ENCRYPTION_KEY;
    const string = typeof data !== 'object' ? data : JSON.stringify(data);

    return CryptoJS.AES
        .encrypt(string, key)
        .toString();
}

export default useEncrypt