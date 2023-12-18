const crypto = require('crypto');


let encAlgorithm = 'aes-256-cbc';
let encPrivateKey = crypto.scryptSync(process.env.ENC_KEY, 'SpecialSalt', 32);
let encIV = crypto.scryptSync(process.env.ENC_IV, 'SpecialSalt', 16);
let cipher = crypto.createCipheriv(encAlgorithm, encPrivateKey, encIV);
let decipher = crypto.createDecipheriv(encAlgorithm, encPrivateKey, encIV);

// Convert a given string into an encrypted string.
function encryptString(data){
    return cipher.update(data, 'utf8', 'hex') + cipher.final('hex');
}

// Turn the encrypted data back into a plaintext string.
function decryptString(data){
    return decipher.update(data, 'hex', 'utf8') + decipher.final('utf8');
}

// Assumes an encrypted string is a JSON object.
// Decrypts that string and turns it into a regular JavaScript object.
function decryptObject(data){
    return JSON.parse(decryptString(data));
}

module.exports={
    encryptString,
   decryptString,
   decryptObject
}