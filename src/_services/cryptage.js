import CryptoJS from 'crypto-js';

const encrypt = (plaintext, key, fixedIV) => {
    const parsedKey = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse(fixedIV);
    return CryptoJS.AES.encrypt(plaintext, parsedKey, { iv: iv }).toString();
};

const decrypt = (ciphertext, key, fixedIV) => {
    const parsedKey = CryptoJS.enc.Utf8.parse(key);
    const iv = CryptoJS.enc.Utf8.parse(fixedIV);
    return CryptoJS.AES.decrypt(ciphertext, parsedKey, { iv: iv }).toString(CryptoJS.enc.Utf8);
};

export default {
    encrypt,
    decrypt,
};
